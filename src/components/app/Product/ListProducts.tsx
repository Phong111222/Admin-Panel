import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Table,
  Tag,
  Typography,
  Modal,
  Row,
  Col,
  Button,
  Form,
  Input,
  Upload,
  Checkbox,
} from 'antd';

import { ColumnsType } from 'antd/lib/table';
import { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../../config/axiosConfig';
import { useForm } from 'antd/lib/form/Form';
import { CategoryState, CategoryType } from '../../../store/category/types';
import { ProductState, ProductType } from '../../../store/product/types';
import { RootState } from '../../../store/RootReducer';
import Label from '../../common/Label';
import getBase64 from '../../../utils/getBase64';
import { UpdateProduct } from '../../../store/product/actions';
import { UserState } from '../../../store/user/types';

// import WrappedAuth from '../WrappedAuth';
// import WrappedLayout from '../WrappedLayout';
const { Text } = Typography;
const ListProduct: FC = () => {
  const { list, loading } = useSelector<RootState, ProductState>(
    (state) => state.product
  );
  const { list: categoryList } = useSelector<RootState, CategoryState>(
    (state) => state.category
  );
  const { edit_permission } = useSelector<RootState, UserState>(
    (state) => state.user
  );
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [image, setImage] = useState<{
    url: string;
    img: any;
  }>({ url: '', img: null });

  const [form] = useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>();
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      name: product?.name,
      price: product?.price,
      instock: product?.instock,
      categories: product?.categories,
      featuredImg: product?.featuredImg,
    });
    setImage({
      url: `${baseURL}/file/${product?.featuredImg}` as string,
      img: null,
    });
    // eslint-disable-next-line
  }, [
    product?.price,
    product?.categories,
    product?.instock,
    product?.name,
    form,
  ]);

  const handleFinish = (values: any) => {
    values.featuredImg = image.img;
    let formData = new FormData();
    Object.keys(values).map(
      (key) => key === 'categories' || formData.append(key, values[key])
    );

    values.categories.map((category: string, index: number) =>
      formData.append(`categories[${index}]`, category)
    );
    dispatch(
      UpdateProduct(formData, product?._id as string, () => setVisible(false))
    );
  };
  const UploadButton = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#FAFAFA',
          border: 'dotted 0.5px #686565',
          cursor: 'pointer',
        }}>
        <div>{loadingImage ? <LoadingOutlined /> : <PlusOutlined />}</div>
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };
  const Columns: ColumnsType<ProductType> = [
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Name</p>,
      dataIndex: 'name',
      width: '25%',
      render: (name) => (
        <p style={{ textAlign: 'center', margin: 0 }}>{name}</p>
      ),
      key: 'name',
    },
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Categories</p>,
      dataIndex: 'categories',
      render: (categories: CategoryType[]) => {
        return (
          <>
            {categories.map((category) => (
              <Tag color='geekblue' key={category._id}>
                {category.name}
              </Tag>
            ))}
          </>
        );
      },
      width: '45%',
      key: 'categories',
    },
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Instock</p>,
      dataIndex: 'instock',
      width: '15%',
      render: (instock: string) => (
        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            display: 'inline-block',
          }}>
          {instock}
        </Text>
      ),
      key: 'instock',
    },
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Price (VND)</p>,
      dataIndex: 'price',
      width: '15%',
      render: (price: string) => (
        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            display: 'inline-block',
          }}>
          {Intl.NumberFormat('vi-VN', {
            currency: 'VND',
          })
            .format(Number(price))
            .toString()
            .replace(/\./g, ',')}
        </Text>
      ),
      key: 'price',
    },
    {
      title: <p style={{ textAlign: 'center', margin: 0 }}>Action</p>,
      dataIndex: '',
      width: '5%',
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setProduct(record);
            setVisible(true);
          }}
          style={{ display: 'block', margin: '0 auto' }}
          type='primary'
          htmlType='button'
          disabled={!edit_permission}></Button>
      ),
      key: 'price',
    },
  ];
  const [newList, setNewList] = useState<ProductType[]>(() => {
    return list.map((product, index) => ({ ...product, key: index }));
  });

  useEffect(() => {
    setNewList(() =>
      list.map((product, index) => ({ ...product, key: index }))
    );
    // eslint-disable-next-line
  }, [loading]);
  return (
    <>
      <Table<ProductType>
        columns={Columns}
        dataSource={newList}
        bordered
        onRow={(record) => {
          return {
            // onClick: () => {
            //   setProduct(record);
            //   setVisible(true);
            // },
            style: {
              cursor: 'pointer',
            },
          };
        }}
        pagination={{ pageSize: 8 }}
      />
      <Modal
        width={800}
        onCancel={() => setVisible(false)}
        visible={visible}
        // title={product?.name}
        className='ant-footer-modal_custom'
        title={
          <p style={{ textAlign: 'center', marginBottom: 0 }}>
            {product?.name}
          </p>
        }
        footer={<></>}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
        {product && (
          <>
            <img
              style={{
                width: '20%',
                height: '20%',
                display: 'block',
                margin: '0 auto',

                marginBottom: 15,
              }}
              src={
                image.url.length
                  ? image.url
                  : `${baseURL}/file/${product.featuredImg}`
              }
              alt={product.featuredImg}
            />

            <Form
              onFinish={handleFinish}
              form={form}
              labelAlign='left'
              labelCol={{ span: 24 }}>
              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <Row>
                    <Col span={11}>
                      <Form.Item
                        name='name'
                        label={<Label>name</Label>}
                        rules={[
                          {
                            required: true,
                            message: 'Name is required',
                          },
                          { type: 'string' },
                        ]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col offset={2} span={11}>
                      <Form.Item
                        name='price'
                        label={<Label>price</Label>}
                        rules={[
                          {
                            required: true,
                            message: 'price is required',
                          },
                        ]}>
                        <Input type='number' />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name='instock'
                        label={<Label>Instock</Label>}
                        initialValue='0'>
                        <Input type='number' />
                      </Form.Item>
                    </Col>
                    <Col offset={2} span={11} className='uploadContainer'>
                      <Form.Item
                        label={<Label>Featured Image</Label>}
                        className='formUpload'
                        name='featuredImg'
                        rules={[
                          {
                            required: true,
                            message: 'Featured Image is required',
                          },
                        ]}>
                        <Upload
                          accept={`.jpg,.png,.PNG,.JPG`}
                          className='featuredImg_uploader'
                          showUploadList={false}
                          onChange={(info) => {
                            const reader = new FileReader();
                            reader.readAsBinaryString(info.file.originFileObj);

                            getBase64(
                              info.file.originFileObj,
                              (imageUrl: string) => {
                                setLoadingImage(false);
                                setImage({
                                  url: imageUrl,
                                  img: info.file.originFileObj,
                                });
                              }
                            );
                          }}>
                          {image.url.length ? (
                            <img
                              src={image.url}
                              alt={image.url}
                              style={{ width: '100%', overflow: 'hidden' }}
                            />
                          ) : (
                            <UploadButton />
                          )}
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='categories'
                        rules={[
                          { required: true, message: 'Category is required' },
                        ]}
                        label={<Label>Categories</Label>}>
                        <Checkbox.Group>
                          <Row>
                            {categoryList.map((item, index) => {
                              return (
                                item.isActive && (
                                  <Col
                                    key={index}
                                    span={6}
                                    style={{ lineHeight: 3 }}>
                                    <Checkbox key={index} value={item._id}>
                                      {item.name}
                                    </Checkbox>
                                  </Col>
                                )
                              );
                            })}
                          </Row>
                        </Checkbox.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='description'
                    label={<Label>Description</Label>}
                    initialValue=''>
                    <Input.TextArea style={{ height: 200 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button htmlType='submit' type='primary' loading={loading}>
                  Create
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default ListProduct;
