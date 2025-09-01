import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// ---------- AUTH ----------
export const login = async (data: { username: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res;
};

// ---------- MASTER / GATE ----------
export const getZones = async (gateID: string) => {
  const res = await api.get(`/master/zones?gateId=${gateID}`);
  return res;
};

export const checkInVisitor = async (data: {
  gateId: string;
  zoneId: string;
}) => {
  const res = await api.post("/tickets/checkin", { ...data, type: "visitor" });
  return res.data;
};

export const checkinSubscriber = async (data: {
  gateId: string;
  zoneId: string;
  subscriptionId: string;
}) => {
  const res = await api.post("/tickets/checkin", {
    ...data,
    type: "subscriber",
  });
  return res.data;
};

export const getSubscription = async (id: string) => {
  const res = await api.get(`/subscriptions/${id}`);
  return res.data;
};

// ---------- CHECKPOINT ----------
export const getTicket = async (id: string) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data;
};

export const checkoutTicket = async (data: {
  ticketId: string;
  forceConvertToVisitor?: boolean;
}) => {
  const res = await api.post("/tickets/checkout", data);
  return res.data;
};

// ---------- ADMIN ----------
export const getEmployees = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const addEmployee = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  const res = await api.post("/admin/users", data);
  return res.data;
};

export const getParkingState = async () => {
  const res = await api.get("/admin/reports/parking-state");
  return res.data;
};

export const toggleZoneOpen = async (id: string, open: boolean) => {
  const res = await api.put(`/admin/zones/${id}/open`, { open });
  return res.data;
};

export const updateCategoryRates = async (
  id: string,
  rates: { rateNormal: number; rateSpecial: number }
) => {
  const res = await api.put(`/admin/categories/${id}`, rates);
  return res.data;
};

export const addRushHour = async (data: { start: string; end: string }) => {
  const res = await api.post("/admin/rush-hours", data);
  return res.data;
};

export const addVacation = async (data: { start: string; end: string }) => {
  const res = await api.post("/admin/vacations", data);
  return res.data;
};

// ---------- EXPORT API ----------
export default api;
