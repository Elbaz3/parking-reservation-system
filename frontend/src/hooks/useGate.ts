import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getZones from "../store/slices/zonesSlice/actGetZones";
import type { RootState, AppDispatch } from "../store";
import { getSubscription } from "../services/api";
import type { TSubscriber } from "../types/TSubscriber";

const useGate = () => {
  const { gateId } = useParams();

  const [loading, setLoading] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [subscriberDate, setSubscriberData] = useState<TSubscriber | null>(
    null
  );
  const [now, setNow] = useState(() => new Date());
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const zones = useSelector((state: RootState) => state.zones.zonesDetails);

  // get zones
  useEffect(() => {
    if (gateId) {
      setLoading(true);
      dispatch(getZones(gateId));
      setLoading(false);
    }
  }, [dispatch, gateId]);

  // clock
  const timeFormat: "12h" | "24h" = "12h";
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // connect state
  const derivedStatus = "connected";

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await getSubscription(inputValue);
      setSubscriberData(result);
      setLoading(false);
    } catch (error) {
      if (error) {
        alert(error.response.data.message || "subscriber id not found");
        setLoading(false);
      }
    }
    setInputValue("");
  };

  return {
    gateId,
    zones,
    timeFormat,
    now,
    derivedStatus,
    isSubscriber,
    setIsSubscriber,
    subscriberDate,
    setSubscriberData,
    handleSubmit,
    inputValue,
    setInputValue,
    loading,
  };
};

export default useGate;
