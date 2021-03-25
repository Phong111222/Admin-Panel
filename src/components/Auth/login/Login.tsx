import React from 'react';
import { Card, Row, Col, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// const labelStyle = {
//   textAlign: 'center',
//   margin: '10px 0',
//   fontSize: 15,
//   fontWeight: 600,
//   color: 'white',
// };

const Login: React.FC = () => {
  return (
    <>
      <div style={{ background: '#428AD5', height: '100vh' }}>
        <Row justify='center' align='middle' style={{ height: '80vh' }}>
          <Col span={10}>
            <Card
              style={{
                width: '100%',
                background: '#428ad5',
                boxShadow:
                  '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
              }}
              bordered={false}>
              <div style={{ textAlign: 'center' }}>
                <Typography.Title style={{ color: 'white' }}>
                  ADMIN PANEL
                </Typography.Title>
              </div>
              <Form labelCol={{ span: 24 }}>
                <Row>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <div
                          style={{
                            textAlign: 'center',
                            margin: '10px 0',
                            fontSize: 15,
                            fontWeight: 600,
                            color: 'white',
                          }}>
                          E-MAIL
                        </div>
                      </Col>
                      <Col span={24}>
                        <Row justify='center'>
                          <Col span={18}>
                            <Form.Item
                              name='email'
                              rules={[
                                {
                                  required: true,
                                  message: 'please input your email',
                                },
                              ]}>
                              <Input
                                placeholder='EMAIL'
                                style={{
                                  padding: '10px 15px',
                                  borderRadius: '5px',
                                  boxShadow:
                                    '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                                }}
                                suffix={<MailOutlined />}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <div
                          style={{
                            textAlign: 'center',
                            margin: '10px 0',
                            fontSize: 15,
                            fontWeight: 600,
                            color: 'white',
                          }}>
                          PASSWORD
                        </div>
                      </Col>
                      <Col span={24}>
                        <Row justify='center'>
                          <Col span={18}>
                            <Form.Item
                              name='password'
                              rules={[
                                {
                                  required: true,
                                  message: 'please input your password',
                                },
                              ]}>
                              <Input.Password
                                placeholder='PASSWORD'
                                style={{
                                  padding: '10px 15px',
                                  borderRadius: '5px',
                                  boxShadow:
                                    '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ margin: '10px 0' }}>
                    <Row justify='center'>
                      <Col span={18}>
                        <Link
                          to='/register'
                          style={{
                            color: 'white',
                            textTransform: 'uppercase',
                            fontSize: 15,
                            fontWeight: 500,
                            textShadow:
                              '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                          }}>
                          Register
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row justify='center'>
                      <Col span={18}>
                        <Button
                          htmlType='submit'
                          style={{
                            display: 'inline-block',
                            margin: '0 auto',
                            width: '100%',
                            background: '#275890',
                            color: 'white',
                            fontSize: 18,
                            height: 50,
                            borderRadius: 8,
                            border: 'none',
                            boxShadow:
                              '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                          }}>
                          LOGIN
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
