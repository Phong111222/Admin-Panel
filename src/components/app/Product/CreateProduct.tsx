import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryState } from "../../../store/category/types";
import { createProduct } from "../../../store/product/actions";
import { ProductState } from "../../../store/product/types";
import { RootState } from "../../../store/RootReducer";
import getBase64 from "../../../utils/getBase64";
import Label from "../../common/Label";

// interface ProductType {
//   name: string;
//   price: number;
//   instock: number;
//   description: string;
//   images: string[];
//   categories: string[];
//   isActive: string;
//   featuredImg: string;
// }

// const ColResponsive: ColProps = {
//   xs: {
//     span:
//   }
// }

const CreateProduct: FC = () => {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [image, setImage] = useState<{
    url: string;
    img: any;
  }>({ url: "", img: null });
  const [form] = useForm();
  const dispatch = useDispatch();
  const handleFinish = (values: any) => {
    values.featuredImg = image.img;
    let formData = new FormData();
    Object.keys(values).map(
      (key) => key === "categories" || formData.append(key, values[key])
    );
    values.categories.map((category: string, index: number) =>
      formData.append(`categories[${index}]`, category)
    );
    dispatch(
      createProduct(formData, form, () =>
        setImage((prevState) => ({ ...prevState, url: "" }))
      )
    );
  };
  const { list } = useSelector<RootState, CategoryState>(
    (state) => state.category
  );
  const { loading } = useSelector<RootState, ProductState>(
    (state) => state.product
  );
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

  return (
    <>
      <Form
        onFinish={handleFinish}
        form={form}
        initialValues={{
          name: "",
        }}
        labelAlign="left"
        labelCol={{ span: 24 }}
      >
        <Row style={{ width: "100%" }}>
          <Col span={11}>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="name"
                  label={<Label>name</Label>}
                  rules={[
                    {
                      required: true,
                      message: "Name is required",
                    },
                    { type: "string" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col offset={1} span={10}>
                <Form.Item
                  name="price"
                  label={<Label>price</Label>}
                  rules={[
                    {
                      required: true,
                      message: "price is required",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="instock"
                  label={<Label>Instock</Label>}
                  initialValue="0"
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col offset={1} span={10} className="uploadContainer">
                <Form.Item
                  label={<Label>Featured Image</Label>}
                  className="formUpload"
                  name="featuredImg"
                  rules={[
                    { required: true, message: "Featured Image is required" },
                  ]}
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
              <Col span={21}>
                <Form.Item
                  name="categories"
                  rules={[{ required: true, message: "Category is required" }]}
                  label={<Label>Categories</Label>}
                >
                  <Checkbox.Group>
                    <Row>
                      {/*Categories*/}
                      {list.map(
                        (item, index) =>
                          item.isActive && (
                            <Col
                              key={index}
                              span={12}
                              style={{ lineHeight: 3 }}
                            >
                              <Checkbox key={index} value={item._id}>
                                {item.name}
                              </Checkbox>
                            </Col>
                          )
                      )}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Form.Item
              name="description"
              label={<Label>Description</Label>}
              initialValue=""
            >
              <Input.TextArea style={{ height: 200 }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProduct;
