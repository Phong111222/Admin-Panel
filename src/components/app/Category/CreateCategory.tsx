import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCategory as createCategory,
  CreateCategoryFail,
  CreateCategorySuccess,
} from "../../../store/category/actions";
import { CategoryState } from "../../../store/category/types";
import { RootState } from "../../../store/RootReducer";
import { postHttp } from "../../../utils/api";
import { Category } from "../../../utils/contanst";
import ShowSuccess from "../../../utils/showSuccess";
import Label from "../../common/Label";

const fields = ["name", "description"];
const CreateCategory = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, CategoryState>(
    (state) => state.category
  );
  const [form] = useForm();
  const onFinish = async (values: { name: string; description: string }) => {
    try {
      dispatch(createCategory());
      const token =
        (typeof window !== "undefined" &&
          window.localStorage.getItem("token")) ||
        null;
      const {
        data: {
          data: { newCategory },
        },
      } = await postHttp(Category.LIST_CATEGORIES_AND_CREATE, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(CreateCategorySuccess(newCategory));
      ShowSuccess("CREATE CATEGORY SUCCESS");
      form.resetFields(fields);
    } catch (error) {
      const { message } = error.response.data;
      const index = fields.findIndex((ele) => ele === Object.keys(message)[0]);
      form.scrollToField(fields[index]);
      form.setFields([
        {
          name: fields[index],
          errors: [message[fields[index]]],
        },
      ]);
      dispatch(CreateCategoryFail(message));
    }
  };

  return (
    <Form
      labelAlign="left"
      form={form}
      labelCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <Row style={{ width: "100%" }}>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Name is required" }]}
                label={<Label>Name</Label>}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                initialValue=""
                label={<Label>Description</Label>}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary" loading={loading}>
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateCategory;
