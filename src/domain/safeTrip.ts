export type TripStatus =
  | 'DRAFT'
  | 'PREPARING'
  | 'ACTIVE'
  | 'ALERT_TRIGGERED'
  | 'ARRIVED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export type TripType =
  | 'PASSENGER'
  | 'WALKING'
  | 'CUSTOM'
  | 'TRANSIT'
  | 'DELIVERY'
  | 'RIDE_APP';

export interface SafeTrip {
  id: string;
  userId?: string;
  status: TripStatus;
  tripType?: TripType | string;
  originAddress?: string | null;
  destinationAddress?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSafeTripInput {
  tripType?: TripType | string;
  originAddress?: string;
  destinationAddress?: string;
  notes?: string;
}

export interface ApiResourceResponse<T> {
  status: string;
  resource?: string;
  data: T | null;
  timestamp?: string;
  message?: string;
}
