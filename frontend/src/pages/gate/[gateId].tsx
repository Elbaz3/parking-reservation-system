import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getZones from "../../store/slices/zonesSlice/actGetZones";
import type { RootState, AppDispatch } from "../../store";

const Gate = () => {
  const { gateId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const zones = useSelector((state: RootState) => state.zones);
  console.log(zones);

  useEffect(() => {
    dispatch(getZones(gateId!));
  }, [dispatch, gateId]);

  return <div>{gateId}</div>;
};

export default Gate;
