
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { StaffState, StaffType } from '../../../store/staff/types';
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Typography,
  Pagination,
  Modal,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ToggleStaff } from '../../../store/staff/actions';
import AxiosConfig from '../../../config/axiosConfig';
import { Staff } from '../../../utils/contanst';
import EditStaff from './EditStaff';
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from 'react-router';


const { Title, Text } = Typography;
const pageSize = 8;

const StaffList = () => {
  const history = useHistory();
  const [visible, setVisible] = useState<boolean>(false);
  const [staff, setStaff] = useState<any>(null);
  const dispatch = useDispatch();
  const { list } = useSelector<RootState, StaffState>((state) => state.staff);
  const [form] = useForm();
  const [renderList, setRenderList] = useState<StaffType[]>(() => {
    const renderList: StaffType[] = [];
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
    dispatch(ToggleStaff(id));
    const token = window.localStorage.getItem("token");
    await AxiosConfig.patch(Staff.toggle_staff(id), undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newList = renderList.map((staff) =>
      staff._id === id ? { ...staff, isActive: !staff.isActive } : staff
    );
    setRenderList(newList);
  };
  const cancelModal = () => {
    setVisible(false);
  };
  const handleChooseStaff = (staff: StaffType) => {
    setStaff(staff);
    setVisible(true);
    history.push(`/staff/list?id=${staff._id}`);
  };
  const makeRenderList = (newlist: StaffType[]) => {
    setRenderList(newlist);
  };
  return (
    <>
      <Row style={{ width: "85%", margin: "0 auto" }}>
        {renderList.map((staff, index) => (
          <Col
            key={index}
            span={12}
            // offset={}
            style={{
              padding: "0 15px",
              marginBottom: 15,
            }}

            onClick={() => handleChooseStaff(staff)}>

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
                    <Text
                      style={{
                        marginLeft: 5,
                      }}
                    >{`${staff.lastname} ${staff.firstname}`}</Text>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Gender:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}
                    >{`${staff.gender}`}</Text>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Email:
                    </Title>
                    <Text style={{ marginLeft: 5 }}>{staff.contactEmail}</Text>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Company:
                    </Title>
                    <Text style={{ marginLeft: 5 }}>{staff.company}</Text>
                  </div>
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    onClick={() => handleToggle(staff._id)}
                    danger={!staff.isActive}
                  >
                    {staff.isActive ? "Active" : "InActive"}
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
          const newList: StaffType[] = [];
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
      <Modal visible={visible} width={800} footer={null} onCancel={cancelModal}>
        <EditStaff
          form={form}
          renderList={renderList}
          cancelModal={cancelModal}
          staff={staff}
          makeRenderList={makeRenderList}
        />
      </Modal>
    </>
  );
};

export default StaffList;
