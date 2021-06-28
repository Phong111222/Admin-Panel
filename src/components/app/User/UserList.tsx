import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { UserState, UserType } from '../../../store/user/types';
import { Row, Col, Card, Button, Avatar, Pagination, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ToggleUser } from '../../../store/user/actions';
const { Title, Text } = Typography;
const pageSize = 10;
const UserList = () => {
  console.log('Phong');
  const dispatch = useDispatch();
  const { list } = useSelector<RootState, UserState>((state) => state.user);

  const [renderList, setRenderList] = useState<UserType[]>(() => {
    const renderList: UserType[] = [];
    for (let i = 0; i < pageSize; i++) {
      renderList.push(list[i]);
    }
    return renderList;
  });
  const handleToggle = (id: string) => {
    dispatch(ToggleUser(id));
    const newList = renderList.map((user) =>
      user._id === id ? { ...user, isActive: !user.isActive } : user
    );
    setRenderList(newList);
  };
  return (
    <>
      <Row style={{ width: '85%', margin: '0 auto' }}>
        {renderList.map((user, index) => (
          <Col
            key={index}
            span={12}
            // offset={}
            style={{
              padding: '0 15px',
              marginBottom: 15,
            }}>
            <Card hoverable style={{ borderRadius: 10 }}>
              <Row align='middle'>
                <Col span={3}>
                  <Avatar
                    style={{ display: 'block', margin: '0 auto' }}
                    icon={<UserOutlined />}
                    size={50}
                  />
                </Col>
                <Col offset={1} span={16}>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Name:
                    </Title>
                    <Text style={{ marginLeft: 5 }}>{user.fullname}</Text>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Email:
                    </Title>
                    <Text style={{ marginLeft: 5 }}>{user.email}</Text>
                  </div>
                </Col>
                <Col span={4}>
                  <Button
                    type='primary'
                    danger={!user.isActive}
                    onClick={() => handleToggle(user._id)}>
                    {user.isActive ? 'Active' : 'InActive'}
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
    </>
  );
};

export default UserList;
