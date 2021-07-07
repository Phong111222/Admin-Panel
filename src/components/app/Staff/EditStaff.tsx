import { UserOutlined } from '@ant-design/icons';
import { FormInstance, Typography } from 'antd';
import { Form, Row, Col, Button, Input, Avatar, Radio } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import AxiosConfig from '../../../config/axiosConfig';

import {
  UpdateStaff,
  UpdateStaffFail,
  UpdateStaffSuccess,
} from '../../../store/staff/actions';
import { StaffType } from '../../../store/staff/types';

import { Staff } from '../../../utils/contanst';
import Label from '../../common/Label';

interface Props {
  form: FormInstance;
  staff: StaffType;
  cancelModal: () => void;
  renderList: StaffType[];
  makeRenderList: (params: any) => void;
}
const EditStaff: FC<Props> = ({
  form,
  staff,
  cancelModal,
  renderList,
  makeRenderList,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      dispatch(UpdateStaff());
      const token = window.localStorage.getItem('token') || null;
      const {
        data: {
          data: { updatedStaff },
        },
      } = await AxiosConfig.patch(Staff.update(staff._id), values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newList = renderList.map((item) =>
        item._id === staff._id ? { ...item, ...updatedStaff } : item
      );

      makeRenderList(newList);
      setLoading(false);
      cancelModal();
      dispatch(UpdateStaffSuccess(updatedStaff, staff._id));
    } catch (error) {
      setLoading(false);
      dispatch(UpdateStaffFail(error.response));
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      firstname: staff.firstname,
      lastname: staff.lastname,
      contactEmail: staff.contactEmail,
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
              name='firstname'
              label={<Label>First name</Label>}
              rules={[{ required: true, message: 'First name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item
              name='lastname'
              label={<Label>Last name</Label>}
              rules={[{ required: true, message: 'Last name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name='contactEmail'
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

          <Col offset={2} span={11}>
            <Form.Item name='phone' label={<Label>Phone</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name='gender'
              label={<Label>Gender</Label>}
              rules={[{ required: true, message: 'Gender is requied' }]}>
              <Radio.Group>
                <Row style={{ width: '100%' }}>
                  <Col>
                    <Radio value='male'>Male</Radio>
                  </Col>
                  <Col>
                    <Radio value='female'>Female</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item name='birtday' label={<Label>Birthday</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name='address' label={<Label>Address</Label>}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item name='company' label={<Label>Company</Label>}>
              <Input />
            </Form.Item>
          </Col>

          <Col
            offset={24}
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

export default EditStaff;
