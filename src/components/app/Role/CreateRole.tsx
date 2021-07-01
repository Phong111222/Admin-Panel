import { FC } from 'react';
import { Row, Col, Form, Input, Checkbox, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Label from '../../common/Label';
import { RoleState, RoleType } from '../../../store/role/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateRole as createRole,
  CreateRoleSuccess,
  CreateRoleFail,
} from '../../../store/role/actions';
import { postHttp } from '../../../utils/api';
import { methods, permissions, Role } from '../../../utils/contanst';

import ShowError from '../../../utils/showError';
import { RootState } from '../../../store/RootReducer';
import ShowSuccess from '../../../utils/showSuccess';

const formfields = ['name', 'permissions', 'methods'];
const CreateRole: FC = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, RoleState>((state) => state.role);
  const onFinish = async (values: RoleType) => {
    try {
      dispatch(createRole());
      const token =
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('token')) ||
        null;
      const {
        data: {
          data: { newRole },
        },
      } = await postHttp(Role.LIST_AND_CREATE_ROLE, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(CreateRoleSuccess(newRole));
      ShowSuccess('CREATE ROLE SUCCESS');
      form.resetFields(formfields);
    } catch (error) {
      const { message } = error.response.data;
      const index = formfields.findIndex(
        (ele) => ele === Object.keys(message)[0]
      );
      ShowError(error, formfields, form, () =>
        dispatch(CreateRoleFail(message[formfields[index]] || 'ERROR'))
      );
    }
  };
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        labelAlign='left'
        onFinish={onFinish}>
        <Row style={{ width: '100%' }}>
          <Col span={7}>
            <Form.Item
              name='name'
              label={<Label>Name</Label>}
              rules={[{ required: true, message: 'Name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={7}>
            <Form.Item
              name='permissions'
              rules={[{ required: true, message: 'Permissions is required' }]}
              label={<Label>Permissions</Label>}>
              <Checkbox.Group>
                <Row>
                  {/*Categories*/}
                  {permissions.map((item, index) => (
                    <Col key={index} span={12} style={{ lineHeight: 3 }}>
                      <Checkbox key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col offset={1} span={7}>
            <Form.Item
              name='methods'
              rules={[{ required: true, message: 'Methods is required' }]}
              label={<Label>Methods</Label>}>
              <Checkbox.Group>
                <Row>
                  {/*Categories*/}
                  {methods.map((item, index) => (
                    <Col key={index} span={12} style={{ lineHeight: 3 }}>
                      <Checkbox key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col>
            <Button type='primary' htmlType='submit' loading={loading}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateRole;
