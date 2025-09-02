type Car = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};

type Checkin = {
  ticketId: string;
  zoneId: string;
  checkinAt: string; // ISO date
};

export type TSubscription = {
  id: string;
  userName: string;
  active: boolean;
  category: "cat_premium" | "cat_regular" | "cat_economy" | "cat_vip";
  cars: Car[];
  startsAt: string; // ISO date
  expiresAt: string; // ISO date
  currentCheckins: Checkin[];
};
