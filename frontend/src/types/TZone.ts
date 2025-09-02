export default interface Zone {
  id?: string;
  zoneId?: string;
  name: string;
  categoryId?: string;
  gateIds?: string[];
  totalSlots: number;
  subscriberCount?: number;

  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;

  rateNormal?: number;
  rateSpecial?: number;

  open: boolean;
}
