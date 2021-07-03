import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/RootReducer";
import {
  CreateStaff,
  CreateStaffFail,
  CreateStaffSucces,
} from "../../../store/staff/actions";
import { StaffState } from "../../../store/staff/types";
import { postHttp } from "../../../utils/api";
import { Staff } from "../../../utils/contanst";
import getBase64 from "../../../utils/getBase64";
import ShowError from "../../../utils/showError";
import ShowSuccess from "../../../utils/showSuccess";
import Label from "../../common/Label";
const formFields = [
  "firstname",
  "lastname",
  "gender",
  "phone",
  "avatar",
  "address",
  "company",
  "contactEmail",
];
const StaffCreate = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, StaffState>(
    (state) => state.staff
  );
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [image, setImage] = useState<{
    url: string;
    img: any;
  }>({ url: "", img: null });
  const [form] = useForm();
  const UploadButton = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#FAFAFA",
          border: "dotted 0.5px #686565",
          cursor: "pointer",
        }}
      >
        <div>{loadingImage ? <LoadingOutlined /> : <PlusOutlined />}</div>
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };
  const onFinish = async (values: {
    firstname: string;
    lastname: string;
    contactEmail: string;
    avatar: any;
    company: string;
    gender: "male" | "female";
    phone: string;
    address: string;
  }) => {
    try {
      dispatch(CreateStaff());
      const token = window.localStorage.getItem("token") || null;
      const {
        data: {
          data: { newStaff },
        },
      } = await postHttp(Staff.create_staff_and_staff_list, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ShowSuccess("CREATE STAFF SUCCESS");
      form.resetFields(formFields);
      setImage({ url: "", img: null });
      dispatch(CreateStaffSucces(newStaff));
    } catch (error) {
      const { message } = error.response.data;
      const index = formFields.findIndex(
        (ele) => ele === Object.keys(message)[0]
      );
      ShowError(error, formFields, form, () => {
        dispatch(CreateStaffFail(message[formFields[index]]));
      });
    }
  };
  return (
    <>
      <Form
        form={form}
        labelAlign="left"
        labelCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Row>
          <Col span={7}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="firstname"
                  rules={[{ required: true, message: "Firstname is required" }]}
                  label={<Label>Firstname</Label>}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} className="uploadContainer">
                <Form.Item
                  label={<Label>Avatar</Label>}
                  className="formUpload"
                  name="avatar"
                >
                  <Upload
                    accept={`.jpg,.png,.PNG,.JPG`}
                    className="featuredImg_uploader"
                    showUploadList={false}
                    onChange={(info) => {
                      console.log(info.file);
                      const reader = new FileReader();
                      reader.readAsBinaryString(info.file.originFileObj);
                      console.log(info.file.originFileObj);
                      getBase64(info.file.originFileObj, (imageUrl: string) => {
                        setLoadingImage(false);
                        setImage({
                          url: imageUrl,
                          img: info.file.originFileObj,
                        });
                      });
                    }}
                  >
                    {image.url.length ? (
                      <img
                        src={image.url}
                        alt={image.url}
                        style={{ width: "100%", overflow: "hidden" }}
                      />
                    ) : (
                      <UploadButton />
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col offset={1} span={7}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: "Firstname is required" }]}
                  label={<Label>Lastname</Label>}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="contactEmail"
                  rules={[{ required: true, message: "Email is required" }]}
                  label={<Label>Email</Label>}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="gender"
                  label={<Label>Gender</Label>}
                  rules={[{ required: true, message: "Gender is requied" }]}
                >
                  <Radio.Group>
                    <Row style={{ width: "100%" }}>
                      <Col>
                        <Radio value="male">Male</Radio>
                      </Col>
                      <Col>
                        <Radio value="female">Female</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col offset={1} span={7}>
            <Row>
              <Col span={24}>
                <Form.Item name="address" label={<Label>Address</Label>}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="phone" label={<Label>Phone</Label>}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="company" label={<Label>Company</Label>}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button htmlType="submit" type="primary" loading={loading}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default StaffCreate;
