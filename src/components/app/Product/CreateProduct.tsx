import { FC, ReactNode } from 'react';
import {
  Form,
  Col,
  Row,
  Upload,
  Input,
  Typography,
  Button,
  ColProps,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';

interface ProductType {
  name: string;
  price: number;
  instock: number;
  description: string;
  images: string[];
  categories: string[];
  isActive: string;
  featuredImg: string;
}

const { Title, Text } = Typography;

const Label: FC<{ children: ReactNode }> = ({ children }) => (
  <Title level={5}>
    <Text>{children}</Text>
  </Title>
);

// const ColResponsive: ColProps = {
//   xs: {
//     span:
//   }
// }

const CreateProduct: FC = () => {
  const [form] = useForm();

  const handleFinish = (value: any) => {
    console.log(value);
  };

  return (
    <>
      <Form
        onFinish={handleFinish}
        form={form}
        initialValues={{
          name: '',
        }}
        labelAlign='left'
        labelCol={{ span: 24 }}>
        <Row style={{ width: '100%' }}>
          <Col>
            <Form.Item
              name='name'
              label={<Label>name</Label>}
              rules={[
                {
                  required: true,
                  message: 'Name is required',
                },
                { type: 'string' },
                {
                  min: 8,
                  message: 'At least 8 character',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name='price'
              label={<Label>price</Label>}
              rules={[
                {
                  required: true,
                  message: 'price is required',
                },
                {
                  type: 'number',
                },
              ]}>
              <Input type='number' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProduct;
