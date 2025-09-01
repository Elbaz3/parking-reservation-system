import { useEffect } from "react";
import type { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { actAuth } from "../../store/slices/auth/authSlice";

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userAuth = useSelector((state: RootState) => state.auth.user);

  console.log(userAuth);

  useEffect(() => {
    dispatch(
      actAuth({
        username: "admin",
        password: "adminpass",
      })
    );
  }, [dispatch]);

  return <div>index</div>;
};

export default Admin;
