import { UserOutlined } from '@ant-design/icons';
import { FormInstance, Typography } from 'antd';
import { Form, Row, Col, Button, Input, Avatar, Radio } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AxiosConfig from '../../../config/axiosConfig';
import { RoleState } from '../../../store/role/types';
import { RootState } from '../../../store/RootReducer';
import {
  UpdateUser,
  UpdateUserFail,
  UpdateUserSuccess,
} from '../../../store/user/actions';
import { UserType } from '../../../store/user/types';
import { User } from '../../../utils/contanst';
import Label from '../../common/Label';

interface Props {
  form: FormInstance;
  user: UserType;
  cancelModal: () => void;
  renderList: UserType[];
  makeRenderList: (params: any) => void;
}
const EditUser: FC<Props> = ({
  form,
  user,
  cancelModal,
  renderList,
  makeRenderList,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { list } = useSelector<RootState, RoleState>((state) => state.role);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      dispatch(UpdateUser());
      const token = window.localStorage.getItem('token') || null;
      const {
        data: {
          data: { updatedUser },
        },
      } = await AxiosConfig.patch(User.update(user._id), values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newList = renderList.map((item) =>
        item._id === user._id ? { ...item, ...updatedUser } : item
      );

      makeRenderList(newList);
      setLoading(false);
      cancelModal();
      dispatch(UpdateUserSuccess(updatedUser, user._id));
      form.resetFields([
        'fullname',
        'email',
        'password',
        'role',
        'address',
        'company',
        'phone',
        'birthday',
      ]);
    } catch (error) {
      setLoading(false);
      dispatch(UpdateUserFail(error.response));
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      fullname: user.fullname,
      email: user.email,
    });
  });
  return (
    <>
      <Typography.Title level={4} style={{ textAlign: 'center' }}>
        EDIT USER
      </Typography.Title>
      <Form
        labelAlign='left'
        labelCol={{ span: 24 }}
        form={form}
        onFinish={onFinish}>
        <Row style={{ width: '80%', margin: '0 auto' }}>
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Avatar icon={<UserOutlined />} size={50} />
          </Col>
          <Col span={11}>
            <Form.Item
              name='fullname'
              label={<Label>Fullname</Label>}
              rules={[{ required: true, message: 'Fullname is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item
              name='email'
              label={<Label>Email</Label>}
              rules={[
                { required: true, message: 'Email is required' },
                {
                  type: 'email',
                  message: 'Invalid email',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name='password'
              label={<Label>Password</Label>}
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Password must have at least 8 characters' },
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item name='phone' label={<Label>Phone</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name='birtday' label={<Label>Birthday</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item name='company' label={<Label>Company</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='address' label={<Label>Address</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='role'
              label={<Label>Role</Label>}
              rules={[{ required: true, message: 'Role is required' }]}>
              <Radio.Group>
                <Row>
                  {list.map((role) =>
                    role.isActive ? (
                      <Col key={role._id} style={{ marginBottom: 10 }}>
                        <Radio value={role._id}>{role.name}</Radio>
                      </Col>
                    ) : null
                  )}
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading}>
                EDIT
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditUser;
