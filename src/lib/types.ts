export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: AirportInfo;
  destination: AirportInfo;
  departure: FlightTimeInfo;
  arrival: FlightTimeInfo;
  status: 'Delayed' | 'On Time' | 'Cancelled' | 'Arrived' | 'Departed' | string;
  aircraft: string;
  duration: string;
  delay: number;
}

export interface AirportInfo {
  code: string;
  name: string;
  city: string;
}

export interface FlightTimeInfo {
  scheduled: string;
  actual?: string;
  estimated?: string;
  terminal: string;
  gate: string;
}
