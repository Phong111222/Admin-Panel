import { Button, Table } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosConfig from "../../../config/axiosConfig";
import { ToggleCategory } from "../../../store/category/actions";
import { CategoryState, CategoryType } from "../../../store/category/types";
import { RootState } from "../../../store/RootReducer";
import { Category } from "../../../utils/contanst";

const ListCategories: FC = () => {
  const dispatch = useDispatch();
  const handleToggle = async (_id: string) => {
    dispatch(ToggleCategory(_id as string));
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    await AxiosConfig.patch(Category.GET_AND_TOGGLE_BY_ID(_id), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const columns = [
    {
      title: <p style={{ textAlign: "center", margin: 0 }}>Name</p>,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <p
          style={{
            fontSize: 15,
            fontWeight: "bold",
            margin: 0,
            textAlign: "center",
          }}
        >
          {text}
        </p>
      ),
      width: "50%",
    },
    {
      title: <p style={{ textAlign: "center", margin: 0 }}>Active</p>,
      dataindex: "isActive",
      key: "isActive",
      render: ({ isActive, _id }: CategoryType) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleToggle(_id as string)}
              type="primary"
              danger={!isActive}
            >
              {isActive ? "Active" : "inActive"}
            </Button>
          </div>
        );
      },
      width: "50%",
    },
  ];
  const { list } = useSelector<RootState, CategoryState>(
    (state) => state.category
  );
  const newList = list.map((item, index) => {
    return { ...item, key: index };
  });
  return (
    <>
      <Table
        style={{ width: "100%" }}
        dataSource={newList}
        columns={columns}
        pagination={{ pageSize: 7 }}
        bordered
      />
    </>
  );
};

export default ListCategories;
