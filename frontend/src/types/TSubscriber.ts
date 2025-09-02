export type Car = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};

export type Checkin = {
  id: string;
  zoneId: string;
  checkedInAt: string; // ISO date string
  checkedOutAt?: string; // optional if still active
};

export type TSubscriber = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: Date;
  expiresAt: Date;
  currentCheckins: Checkin[];
};
