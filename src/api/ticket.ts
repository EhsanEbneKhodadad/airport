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

export const getTickets = async (body: ITicketBody) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_TICKET_URL ?? "",
    body
  );

  return response.data;
};
