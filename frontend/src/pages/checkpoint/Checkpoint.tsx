import { useEffect } from "react";
import type { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { actAuth } from "../../store/slices/auth/authSlice";
// import { getTicket, checkoutTicket } from "../../services/api";

const Checkpoint = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userAuth = useSelector((state: RootState) => state.auth.user);

  console.log(userAuth);

  useEffect(() => {
    dispatch(
      actAuth({
        username: "emp1",
        password: "pass1",
      })
    );
  }, [dispatch]);

  return <div>checkpoint</div>;
};

export default Checkpoint;
