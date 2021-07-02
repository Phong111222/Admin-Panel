import { Button, Col, Form, Input, Radio, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { encode } from "js-base64";
import { useDispatch, useSelector } from "react-redux";
import { RoleState } from "../../../store/role/types";
import { RootState } from "../../../store/RootReducer";
import {
  CreateUser,
  CreateUserFail,
  CreateUserSuccess,
} from "../../../store/user/actions";
import { UserState } from "../../../store/user/types";
import { postHttp } from "../../../utils/api";
import { BasicAuth, User } from "../../../utils/contanst";
import ShowError from "../../../utils/showError";
import ShowSuccess from "../../../utils/showSuccess";
import Label from "../../common/Label";

const formFields = ["fullname", "email", "password", "role"];

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
      dispatch(CreateUser());
      // const token =
      //   (typeof window !== 'undefined' &&
      //     window.localStorage.getItem('token')) ||
      //   null;
      const {
        data: {
          data: { newUser },
        },
      } = await postHttp(User.create_user, values, {
        headers: {
          Authorization: `Basic ${encode(
            `${BasicAuth.basicauth_user}:${BasicAuth.basicauth_password}`
          )}`,
        },
      });
      dispatch(CreateUserSuccess(newUser));
      ShowSuccess("CREATE USER SUCCESS");
      form.resetFields(formFields);
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
        labelAlign="left"
        onFinish={onFinish}
      >
        <Row>
          <Col span={12}>
            <Row>
              <Col span={11}>
                <Form.Item
                  label={<Label>Name</Label>}
                  name="fullname"
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col offset={2} span={11}>
                <Form.Item
                  label={<Label>Email</Label>}
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    {
                      type: "email",
                      message: "Invalid Email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label={<Label>Password</Label>}
                  name="password"
                  rules={[
                    { required: true, message: "Password is required" },
                    {
                      min: 8,
                      message: "Password must contain at least 8 characters",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col offset={2} span={11}>
                <Form.Item
                  label={<Label>Role</Label>}
                  name="role"
                  rules={[{ required: true, message: "Role is required" }]}
                >
                  <Radio.Group>
                    <Row>
                      {list.map((role) =>
                        role.isActive ? (
                          <Col
                            key={role._id}
                            span={12}
                            style={{ marginBottom: 10 }}
                          >
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserCreate;
