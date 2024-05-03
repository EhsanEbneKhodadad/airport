import axios from "axios";

export interface IRoute {
  OriginCode: string;
  DestinationCode: string;
  DepartureDate: string;
}

export interface ITicketBody {
  AdultCount: number;
  Baggage: boolean;
  CabinClass: string;
  ChildCount: number;
  InfantCount: number;
  Routes: IRoute[];
}

export interface ITicketRequest {
  Flights: IFlight[];
  Meta: string;
}

export interface IFlight {
  AutomaticReserve: boolean;
  Id: string;
  Prices: IPrice[];
  Segments: ISegment[];
  UnchangeableInfCount: boolean;
}

export interface IPrice {
  PassengerFares: IPassengerFares[];
}

export interface IPassengerFares {
  Discount: Number;
  DiscountPercent: number;
  PaxType: "ADL" | "CHD" | "INF";
  SpecialDiscountAllowed: boolean;
  TotalFare: number;
}

export interface ISegment {
  ConnectionTime: string;
  Legs: ILeg[];
}

export interface ILeg {
  Origin: string;
  OriginAirport: string;
  DepartureTime: string;
  Destination: string;
  DestinationAirport: string;
  ArrivalTime: string;
  Airline: IAirline;
}

export interface IAirline {
  EnglishTitle: string;
  IataCode: string;
  Logo: string;
  PersianTitle: string;
  Title: string;
}

export interface ISaveInfo {
  info: string;
}

export const getTickets = async (
  body: ITicketBody
): Promise<ITicketRequest> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_TICKET_URL ?? "",
    body
  );

  return response.data;
};

export const saveInfo = async (body: ISaveInfo): Promise<any> => {
  const response = await axios.post("/api/save-data", body);

  return response.data;
};
