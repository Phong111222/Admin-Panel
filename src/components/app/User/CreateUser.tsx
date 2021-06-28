import { useForm } from 'antd/lib/form/Form';
import { Form, Row, Col, Button, Input, Radio } from 'antd';
import Label from '../../common/Label';
import ShowSuccess from '../../../utils/showSuccess';
import ShowError from '../../../utils/showError';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { UserState } from '../../../store/user/types';
import { RoleState } from '../../../store/role/types';
import { CreateUserFail } from '../../../store/user/actions';

const formFields = ['fullname', 'email', 'password', 'role'];

const UserCreate = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, UserState>((state) => state.user);
  const { list } = useSelector<RootState, RoleState>((state) => state.role);
  const onFinish = async (values: {
    fullname: string;
    email: string;
    role: string[];
    password: string;
  }) => {
    try {
    } catch (error) {
      const { message } = error.response.data;
      const index = formFields.findIndex(
        (ele) => ele === Object.keys(message)[0]
      );
      ShowError(error, formFields, form, () => {
        dispatch(CreateUserFail(message[formFields[index]]));
      });
    }
  };
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        labelAlign='left'
        onFinish={onFinish}>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={11}>
                <Form.Item
                  label={<Label>Name</Label>}
                  name='fullname'
                  rules={[{ required: true, message: 'Name is required' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col offset={2} span={11}>
                <Form.Item
                  label={<Label>Email</Label>}
                  name='email'
                  rules={[
                    { required: true, message: 'Email is required' },
                    {
                      type: 'email',
                      message: 'Invalid Email',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label={<Label>Password</Label>}
                  name='password'
                  rules={[
                    { required: true, message: 'Password is required' },
                    {
                      min: 8,
                      message: 'Password must contain at least 8 characters',
                    },
                  ]}>
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col offset={2} span={11}>
                <Form.Item
                  label={<Label>Role</Label>}
                  name='role'
                  rules={[{ required: true, message: 'Role is required' }]}>
                  <Radio.Group>
                    <Row>
                      {list.map((role) =>
                        role.isActive ? (
                          <Col
                            key={role._id}
                            span={12}
                            style={{ marginBottom: 10 }}>
                            <Radio value={role._id}>{role.name}</Radio>
                          </Col>
                        ) : null
                      )}
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button type='primary' htmlType='submit' loading={loading}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserCreate;
