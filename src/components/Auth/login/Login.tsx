import React from 'react';
import { Card, Row, Col, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { AuthState } from '../../../store/Auth/types';
import { login } from '../../../store/Auth/actions';
// const labelStyle = {
//   textAlign: 'center',
//   margin: '10px 0',
//   fontSize: 15,
//   fontWeight: 600,
//   color: 'white',
// };

const colResponsive = {
  xs: {
    span: 24,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 10,
  },
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginForm] = useForm();
  const AuthState = useSelector<RootState, AuthState>((state) => state.Auth);
  const handleFinish = (value: { email: string; password: string }) => {
    dispatch(login(value, history));
  };

  return (
    <>
      <div style={{ background: '#297dd6', height: '100vh' }}>
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
          <Col {...colResponsive}>
            <Card
              style={{
                width: '100%',
                background: '#428ad5',
                boxShadow:
                  '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
                borderRadius: 15,
              }}
              bordered={false}>
              <div style={{ textAlign: 'center' }}>
                <Typography.Title
                  style={{
                    color: 'white',
                    textShadow:
                      '0px 1px 2px -2px rgb(0 0 0 / 16%),0 3px 6px 0 rgb(0 0 0 / 12%),0 5px 12px 4px rgb(0 0 0 / 9%)',
                  }}>
                  ADMIN PANEL
                </Typography.Title>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <img
                  src='/logo.png'
                  alt='ADMIN PANEL LOGO'
                  style={{ maxWidth: '5%', height: 'auto' }}
                />
              </div>
              <Form
                form={loginForm}
                labelCol={{ span: 24 }}
                onFinish={handleFinish}>
                <Row>
                  <Col span={24} style={{ marginTop: 15 }}>
                    <Row>
                      <Col span={24}>
                        <div
                          style={{
                            textAlign: 'center',
                            margin: '10px 0',
                            fontSize: 15,
                            fontWeight: 600,
                            color: 'white',
                            textShadow: '5px 0 3px rgb(0 0 0 / 20%)',
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
                                {
                                  type: 'email',
                                  message: 'invalid Email',
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
                  <Col span={24} style={{ marginBottom: 15 }}>
                    <Row>
                      <Col span={24}>
                        <div
                          style={{
                            textAlign: 'center',
                            margin: '10px 0',
                            fontSize: 15,
                            fontWeight: 600,
                            color: 'white',
                            textShadow: '5px 0 3px rgb(0 0 0 / 20%)',
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
                                {
                                  min: 8,
                                  message:
                                    'password must contain at least 8 characters',
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
                  {/* <Col span={24} style={{ margin: '10px 0' }}>
                    <Row justify='center'>
                      <Col span={18}>
                        <Link
                          to='/register'
                          style={{
                            color: 'white',
                            textTransform: 'uppercase',
                            fontSize: 15,
                            fontWeight: 500,
                            textShadow: '5px 0 3px rgb(0 0 0 / 20%)',
                          }}>
                          SIGN UP
                        </Link>
                      </Col>
                    </Row>
                  </Col> */}
                  <Col span={24} style={{ margin: '15px 0' }}>
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
                          }}
                          loading={AuthState.sending_login}>
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
