import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetListCategories } from "../../../store/category/actions";
import { GetListProducts } from "../../../store/product/actions";
import { GetRoleList } from "../../../store/role/actions";
import { GetStaffList } from "../../../store/staff/actions";
import { GetUserList } from "../../../store/user/actions";

const Home: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetListCategories());
    dispatch(GetListProducts());
    dispatch(GetRoleList());
    dispatch(GetUserList());
    dispatch(GetStaffList());
  }, [dispatch]);

  return <div>Home</div>;
};

export default Home;
