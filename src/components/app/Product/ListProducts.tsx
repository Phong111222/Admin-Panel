import { Table, Tag, Typography, Modal, Row, Col } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { baseURL } from '../../../config/axiosConfig';

import { CategoryType } from '../../../store/category/types';
import { ProductState, ProductType } from '../../../store/product/types';
import { RootState } from '../../../store/RootReducer';
// import WrappedAuth from '../WrappedAuth';
// import WrappedLayout from '../WrappedLayout';
const { Text, Title } = Typography;
const ListProduct: FC = () => {
  const { list } = useSelector<RootState, ProductState>(
    (state) => state.product
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>();
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
      title: <p style={{ textAlign: 'center', margin: 0 }}>Price</p>,
      dataIndex: 'price',
      width: '15%',
      render: (price: string) => (
        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            display: 'inline-block',
          }}>
          {price}
        </Text>
      ),
      key: 'price',
    },
  ];

  return (
    <>
      <Table<ProductType>
        columns={Columns}
        dataSource={list}
        bordered
        onRow={(record) => {
          return {
            onClick: () => {
              setProduct(record);
              setVisible(true);
            },
            style: {
              cursor: 'pointer',
            },
          };
        }}
        pagination={{ pageSize: 8 }}
      />
      <Modal
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
                width: '50%',
                display: 'block',
                margin: '0 auto',
                marginBottom: 15,
              }}
              src={`${baseURL}/file/${product.featuredImg}`}
              alt={product.featuredImg}
            />
            <Row style={{ width: '100%', padding: '0 50px' }}>
              {/* <Col
                span={24}
                style={{
                  display: 'flex',

                  alignItems: 'baseline',
                }}>
                <Title level={5} style={{ fontSize: 15, margin: 0 }}>
                  Name:{' '}
                </Title>
                <Text style={{ marginLeft: 10 }}>{product.name}</Text>
              </Col> */}
              <Col
                span={24}
                style={{
                  display: 'flex',

                  alignItems: 'baseline',
                }}>
                <Title level={5} style={{ fontSize: 15, margin: 0 }}>
                  Categories:{' '}
                </Title>
                <div style={{ marginLeft: 10 }}>
                  {product.categories.map((category) => (
                    <Tag color='geekblue' key={category._id}>
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </Col>
              <Col
                span={24}
                style={{
                  display: 'flex',

                  alignItems: 'baseline',
                }}>
                <Title level={5} style={{ fontSize: 15, margin: 0 }}>
                  Price:{' '}
                </Title>
                <Text style={{ marginLeft: 10 }}>{product.price}</Text>
              </Col>
              <Col
                span={24}
                style={{
                  display: 'flex',

                  alignItems: 'baseline',
                }}>
                <Title level={5} style={{ fontSize: 15, margin: 0 }}>
                  Instock:{' '}
                </Title>
                <Text style={{ marginLeft: 10 }}>{product.instock}</Text>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default ListProduct;
