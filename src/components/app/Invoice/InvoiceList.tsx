import { CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Typography,
  Modal,
  Table,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { ColumnsType } from 'antd/lib/table';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmInvoice } from '../../../store/invoice/actions';
import { InvoiceState, InvoiceType } from '../../../store/invoice/types';
import { RootState } from '../../../store/RootReducer';
const pageSize = 10;
const { Text, Title } = Typography;

const Columns: ColumnsType<{
  name: string;
  quanity: number;
  price: number;
}> = [
  {
    title: <p style={{ textAlign: 'center', margin: 0 }}>Name</p>,
    dataIndex: 'name',
    width: '33,333%',
    render: (name) => <p style={{ textAlign: 'center', margin: 0 }}>{name}</p>,
    key: 'name',
  },
  {
    title: <p style={{ textAlign: 'center', margin: 0 }}>Quantity</p>,
    dataIndex: 'quantity',
    width: '33,333%',
    render: (quantity) => (
      <p style={{ textAlign: 'center', margin: 0 }}>{quantity}</p>
    ),
    key: 'quantity',
  },
  {
    title: <p style={{ textAlign: 'center', margin: 0 }}>Total</p>,
    dataIndex: 'price',
    width: '33,333%',
    render: (price) => (
      <p style={{ textAlign: 'center', margin: 0 }}>
        {Intl.NumberFormat('vi-VN', {
          currency: 'VND',
        })
          .format(Number(price))
          .toString()
          .replace(/\./g, ',')}
      </p>
    ),
    key: 'price',
  },
];

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector<RootState, InvoiceState>(
    (state) => state.invoice
  );
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [renderList, setRenderList] = useState<InvoiceType[]>(() => {
    const renderList: InvoiceType[] = [];
    for (
      let i = 0;
      i < (pageSize > list.length ? list.length : pageSize);
      i++
    ) {
      renderList.push(list[i]);
    }
    return renderList;
  });
  const handleConfirm = async (id: string) => {
    await dispatch(confirmInvoice(id));
    setRenderList(() =>
      renderList.map((invoice) =>
        invoice._id === id ? { ...invoice, isConfirm: true } : invoice
      )
    );
    setVisible(false);
  };
  const handleChooseInvoice = (invoice: InvoiceType) => {
    setSelectedInvoice(invoice);
    setVisible(true);
  };

  return (
    <>
      <Row style={{ width: '85%', margin: '0 auto' }}>
        {renderList.map((invoice, index) => (
          <Col
            key={index}
            span={12}
            // offset={}
            style={{
              padding: '0 15px',
              marginBottom: 15,
            }}
            onClick={() => handleChooseInvoice(invoice)}>
            <Card hoverable style={{ borderRadius: 10 }}>
              <Row align='middle'>
                <Col span={3}>
                  <Avatar
                    style={{ display: 'block', margin: '0 auto' }}
                    icon={<ShoppingCartOutlined />}
                    size={50}
                  />
                </Col>
                <Col offset={1} span={16}>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Staff:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>{`${invoice.fromStaff.firstname} ${invoice.fromStaff.lastname}`}</Text>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Client:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>{`${invoice.clientInfo.fullname}`}</Text>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Total:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>
                      {Intl.NumberFormat('vi-VN', {
                        currency: 'VND',
                      })
                        .format(Number(invoice.total))
                        .toString()
                        .replace(/\./g, ',')}{' '}
                      VND
                    </Text>
                  </div>
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
          const newList: InvoiceType[] = [];
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
      <Modal
        onCancel={() => setVisible(false)}
        title={
          <p style={{ marginBottom: 0, textAlign: 'center' }}>
            INVOICE'S INFORMATION
          </p>
        }
        visible={visible}
        className='ant-footer-modal_custom'
        footer={<></>}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={'70%'}>
        <Row style={{ width: '100%' }}>
          {(() => {
            const newList = selectedInvoice?.productList.map(
              (product, index) => ({ ...product, key: index })
            );

            return (
              <>
                <Col span={24}>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Staff:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>{`${selectedInvoice?.fromStaff.firstname} ${selectedInvoice?.fromStaff.lastname}`}</Text>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Client:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>{`${selectedInvoice?.clientInfo.fullname}`}</Text>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
                      Total:
                    </Title>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>{`${Intl.NumberFormat('vi-VN', {
                      currency: 'VND',
                    })
                      .format(Number(selectedInvoice?.total))
                      .toString()
                      .replace(/\./g, ',')} VND`}</Text>
                  </div>
                </Col>
                <Col span={24} style={{ marginTop: 20 }}>
                  <Table<{
                    name: string;
                    quanity: number;
                    price: number;
                  }>
                    pagination={{ style: { display: 'none' } }}
                    columns={Columns}
                    dataSource={newList as any}
                    bordered
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    type='primary'
                    disabled={selectedInvoice?.isConfirm}
                    loading={loading}
                    shape='circle'
                    style={{
                      // width: 60,
                      // height: 60,
                      // borderRadius: '50%',
                      boxShadow:
                        '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                    }}
                    onClick={() =>
                      handleConfirm(selectedInvoice?._id as string)
                    }>
                    {!loading && <CheckOutlined style={{ fontSize: 20 }} />}
                  </Button>
                </Col>
              </>
            );
          })()}
        </Row>
      </Modal>
    </>
  );
};

export default InvoiceList;
