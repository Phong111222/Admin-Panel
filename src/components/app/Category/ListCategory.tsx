import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryState, CategoryType } from '../../../store/category/types';
import { RootState } from '../../../store/RootReducer';
import { Table, Button, Row, Col, Input, Form } from 'antd';
import {
  ToggleCategory,
  UpdateCategory,
} from '../../../store/category/actions';
import { Category } from '../../../utils/contanst';

import AxiosConfig from '../../../config/axiosConfig';
import { EditOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import Label from '../../common/Label';
import { useState } from 'react';
import { useEffect } from 'react';
const ListCategories: FC = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType>();
  const handleToggle = async (_id: string) => {
    dispatch(ToggleCategory(_id as string));
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('token')
        : null;
    await AxiosConfig.patch(Category.GET_AND_TOGGLE_BY_ID(_id), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const columns = [
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Name</p>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <p
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            margin: 0,
            textAlign: 'center',
          }}>
          {text}
        </p>
      ),
      width: '50%',
    },
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Active</p>,
      dataindex: 'isActive',
      key: 'isActive',
      render: (record: CategoryType) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              onClick={() => handleToggle(record._id as string)}
              type='primary'
              danger={!record.isActive}>
              {record.isActive ? 'Active' : 'inActive'}
            </Button>
            <Button
              style={{ marginLeft: 5 }}
              onClick={() => handleEdit(record)}
              type='primary'
              icon={<EditOutlined />}></Button>
          </div>
        );
      },
      width: '50%',
    },
  ];
  const { list, loading } = useSelector<RootState, CategoryState>(
    (state) => state.category
  );
  const newList = list.map((item, index) => {
    return { ...item, key: index };
  });
  const onFinish = (values: any) => {
    dispatch(
      UpdateCategory(category?._id as string, values, () => setVisible(false))
    );
  };
  const handleEdit = (category: CategoryType) => {
    setCategory(category);
    setVisible(true);
  };
  useEffect(() => {
    form.setFieldsValue({
      name: category?.name,
      description: category?.description,
    });
  }, [category?.name, category?.description, form]);
  return (
    <>
      <Table
        style={{ width: '100%' }}
        dataSource={newList}
        columns={columns}
        pagination={{ pageSize: 7 }}
        bordered
      />
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Form
          labelAlign='left'
          form={form}
          labelCol={{ span: 24 }}
          onFinish={onFinish}>
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              <Form.Item
                name='name'
                rules={[{ required: true, message: 'Name is required' }]}
                label={<Label>Name</Label>}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='description'
                initialValue=''
                label={<Label>Description</Label>}>
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button htmlType='submit' type='primary' loading={loading}>
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ListCategories;
