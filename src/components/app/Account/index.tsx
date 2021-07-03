import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Tag, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/RootReducer";
import { UserState, UserType } from "../../../store/user/types";
import { methods, permissions } from "../../../utils/contanst";
const { Title, Text } = Typography;
const AccountInfo = () => {
  const {
    role,
    user: { info },
    permissions: { routes, methods: userMethods },
  } = useSelector<RootState, UserState>((state) => state.user);

  const userInfo: UserType & {
    phone?: string;
    address?: string;
    company?: string;
  } = { ...info };
  return (
    <div style={{ width: "45%", margin: "0 auto" }}>
      <Card
        bordered
        style={{
          boxShadow:
            "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          borderRadius: 15,
        }}
      >
        <Row>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar icon={<UserOutlined />} size={100} />
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Title level={4}>{role.name}</Title>
          </Col>
          <Col span={24} style={{ margin: "0 auto" }}>
            <Row
              style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {routes[0] === "all"
                ? permissions.map((permission) => (
                    <Col key={permission}>
                      <Tag style={{ borderRadius: 10 }} color="blue">
                        {permission}
                      </Tag>
                    </Col>
                  ))
                : routes.map((route) => (
                    <Col key={route}>
                      <Tag style={{ borderRadius: 10 }} color="blue">
                        {route}
                      </Tag>
                    </Col>
                  ))}
            </Row>
          </Col>
          <Col span={24} style={{ margin: "15px auto" }}>
            <Row
              style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userMethods[0] === "ALL"
                ? methods.map((method) => (
                    <Col key={method}>
                      <Tag style={{ borderRadius: 10 }} color="blue">
                        {method}
                      </Tag>
                    </Col>
                  ))
                : userMethods.map((method) => (
                    <Col key={method}>
                      <Tag style={{ borderRadius: 10 }} color="blue">
                        {method}
                      </Tag>
                    </Col>
                  ))}
            </Row>
          </Col>
          <Col span={24} style={{ margin: "0 auto", lineHeight: 2 }}>
            <Row
              style={{
                width: "60%",
                margin: "0 auto",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              <>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      marginBottom: 0,
                      fontSize: 15,
                    }}
                  >
                    Name:
                  </Title>
                </Col>
                <Col offset={1} span={15}>
                  <Text style={{ fontSize: 16 }}>{userInfo.fullname}</Text>
                </Col>
              </>
              <>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      marginBottom: 0,
                      fontSize: 15,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Email:
                  </Title>
                </Col>
                <Col offset={1} span={15}>
                  <Text style={{ fontSize: 16 }}>{userInfo.email}</Text>
                </Col>
              </>
              <>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      marginBottom: 0,
                      fontSize: 15,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Phone:
                  </Title>
                </Col>
                <Col offset={1} span={15}>
                  <Text style={{ fontSize: 16 }}>
                    {userInfo.phone || "NOT UPDATE YET"}
                  </Text>
                </Col>
              </>
              <>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      marginBottom: 0,
                      fontSize: 15,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Address:
                  </Title>
                </Col>
                <Col offset={1} span={15}>
                  <Text style={{ fontSize: 16 }}>
                    {userInfo.address || "NOT UPDATE YET"}
                  </Text>
                </Col>
              </>
              <>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      marginBottom: 0,
                      fontSize: 15,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Company:
                  </Title>
                </Col>
                <Col offset={1} span={15}>
                  <Text style={{ fontSize: 16 }}>
                    {userInfo.company || "NOT UPDATE YET"}
                  </Text>
                </Col>
              </>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AccountInfo;
