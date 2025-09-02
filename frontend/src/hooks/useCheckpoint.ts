import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { checkoutTicket, getTicket } from "../services/api";
import { removeUser } from "../store/slices/auth/authSlice";

export interface Ticket {
  id: string;
  type: "subscriber" | "visitor";
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string;
}

// type BreakdownItem = {
//   from: string;
//   to: string;
//   hours: number;
//   rateMode: string;
//   rate: number;
//   amount: number;
// };

// type TicketData = {
//   durationHours: number;
//   breakdown: BreakdownItem[];
//   amount: number;
// };

const useCheckpoint = () => {
  const token = useSelector((state: RootState) => state.auth.user?.token);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Ticket | null>(null);
  const [checkoutRes, setCheckoutRes] = useState<Ticket | null>(null);
  const [showT, setShowT] = useState<"show" | "checkout" | null>(null);
  const [error, setError] = useState("");

  const handleShow = async () => {
    if (!ticketId) return;
    setLoading(true);
    try {
      const res = await getTicket(ticketId);
      console.log(res);
      setResponse(res);
      setShowT("show");
      setError("");
    } catch (err) {
      setError(err.response.data.message);
      setShowT("show");
    } finally {
      setLoading(false);
    }
  };

  const handleChickout = async () => {
    if (!ticketId) return;
    setLoading(true);
    try {
      const res = await checkoutTicket({ ticketId });
      console.log(res);
      setCheckoutRes(res.data);
      setShowT("checkout");
      setError("");
    } catch (err) {
      setError(err.response.data.message);
      setShowT("checkout");
    } finally {
      setLoading(false);
    }
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(removeUser());
    };
  }, [dispatch]);

  return {
    token,
    ticketId,
    setTicketId,
    handleShow,
    loading,
    handleChickout,
    showT,
    response,
    checkoutRes,
    error,
  };
};

export default useCheckpoint;
