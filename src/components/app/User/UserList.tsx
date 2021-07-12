
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { UserState, UserType } from '../../../store/user/types';
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Pagination,
  Typography,
  Modal,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ToggleUser } from '../../../store/user/actions';
import AxiosConfig from '../../../config/axiosConfig';
import { User } from '../../../utils/contanst';
import EditUser from './EditUser';
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from 'react-router';

const { Title, Text } = Typography;
const pageSize = 10;
const UserList = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { list, edit_permission } = useSelector<RootState, UserState>(
    (state) => state.user
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [renderList, setRenderList] = useState<UserType[]>(() => {
    const renderList: UserType[] = [];
    for (
      let i = 0;
      i < (pageSize > list.length ? list.length : pageSize);
      i++
    ) {
      renderList.push(list[i]);
    }
    return renderList;
  });
  const handleToggle = async (id: string) => {
    dispatch(ToggleUser(id));
    const newList = renderList.map((user) =>
      user._id === id ? { ...user, isActive: !user.isActive } : user
    );
    const token = window.localStorage.getItem("token") || null;

    await AxiosConfig.patch(User.toggle_user(id), undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRenderList(newList);
  };
  const [form] = useForm();
  const handleChooseUser = (user: UserType) => {
    if (edit_permission) {
      setUser(user);
      setVisible(true);
      history.replace(`/user/list?edit=${edit_permission}&userID=${user._id}`);
    } else {
      setVisible(false);
    }
  };
  const cancelModal = () => {
    setVisible(false);
  };
  const MakeNewRenderList = (renderList: UserType[]) => {
    setRenderList(renderList);
  };
  return (
    <>
      <Row style={{ width: "85%", margin: "0 auto" }}>
        {renderList.map((user, index) => (
          <Col
            key={index}
            span={12}
            // offset={}
            style={{
              padding: "0 15px",
              marginBottom: 15,
            }}

            onClick={() => handleChooseUser(user)}>

            <Card hoverable style={{ borderRadius: 10 }}>
              <Row align="middle">
                <Col span={3}>
                  <Avatar
                    style={{ display: "block", margin: "0 auto" }}
                    icon={<UserOutlined />}
                    size={50}
                  />
                </Col>
                <Col offset={1} span={16}>
                  <div style={{ display: "flex" }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Name:
                    </Title>
                    <Text style={{ marginLeft: 5 }}>{user.fullname}</Text>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Email:
                    </Title>
                    <Text style={{ marginLeft: 5 }}>{user.email}</Text>
                  </div>
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    danger={!user.isActive}
                    onClick={() => handleToggle(user._id)}
                  >
                    {user.isActive ? "Active" : "InActive"}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        total={list.length}
        pageSize={pageSize}
        onChange={(page, pageNumber) => {
          const newList: UserType[] = [];
          const limit = (pageNumber as number) * page;
          for (
            let i = (pageNumber as number) * (page - 1);
            i < (limit > list.length ? list.length : limit);
            i++
          ) {
            newList.push(list[i]);
          }
          setRenderList(newList);
        }}
      />
      <Modal onCancel={cancelModal} visible={visible} footer={null} width={800}>
        <EditUser
          form={form}
          user={user}
          cancelModal={cancelModal}
          renderList={renderList}
          makeRenderList={MakeNewRenderList}
        />
      </Modal>
    </>
  );
};

export default UserList;
