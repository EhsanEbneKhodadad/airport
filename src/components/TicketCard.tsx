import { IFlight } from "@/api/ticket";
import Image from "next/image";
import React from "react";

type Props = {
  data: IFlight;
  btnTitle: string;
  className?: string;
};

export const TicketCard: React.FC<Props> = ({ data, btnTitle, className }) => {
  return (
    <div
      key={data.Id}
      className={`flex items-center justify-around rounded shadow my-3 bg-white px-6 py-4 ${className}`}
    >
      <div className="flex flex-col">
        <Image
          width={50}
          height={50}
          src={data?.Segments[0].Legs[0]?.Airline.Logo.replace("static.", "")}
          alt={data?.Segments[0].Legs[0]?.Airline.PersianTitle}
        />
        <p>{data?.Segments[0].Legs[0]?.Airline.PersianTitle}</p>
      </div>
      <div className="flex gap-16">
        <div>
          <p>
            {new Date(
              data?.Segments[0].Legs[0]?.DepartureTime
            ).toLocaleTimeString("fa", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>{data?.Segments[0].Legs[0]?.Origin}</p>
        </div>

        <div>
          <p>
            {new Date(
              data?.Segments[0].Legs[0]?.ArrivalTime
            ).toLocaleTimeString("fa", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>{data?.Segments[0].Legs[0]?.Destination}</p>
        </div>
      </div>
      <div className="flex flex-col font-bold text-xl mb-2 gap-2">
        {data.Prices[data.Prices.length - 1]?.PassengerFares.filter(
          (ii) => ii.PaxType === "ADL"
        ).map((i, index) => (
          <p key={index} className="text-blue-700 text-sm">
            {(i.TotalFare / 10).toLocaleString()}
          </p>
        ))}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded h-[30px] py-1 px-4 text-sm">
          {btnTitle}
        </button>
      </div>
    </div>
  );
};
