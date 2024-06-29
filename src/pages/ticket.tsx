import { ISaveInfo, ITicketBody, getTickets, saveInfo } from "@/api/ticket";
import { FilterBox } from "@/components/FilterBox";
import { TicketCard } from "@/components/TicketCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const TicketPage = () => {
  const searchParams = useSearchParams();
  const [canSendRequest, setCanSetRequest] = useState(false);
  const [query, setQuery] = useState<ITicketBody | null>(null);

  const { data } = useQuery({
    queryKey: ["ticket", query],
    queryFn: () => query && getTickets(query),
    enabled: canSendRequest,
  });

  const { mutate } = useMutation({
    mutationFn: (body: ISaveInfo) => saveInfo(body),
  });

  const flights = useMemo(() => data?.Flights, [data]);

  useEffect(() => {
    const source = searchParams.get("source");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");

    if (!!source && !!destination && !!departureDate && !!returnDate) {
      setCanSetRequest(true);
      setQuery({
        AdultCount: 1,
        Baggage: true,
        CabinClass: "All",
        ChildCount: 0,
        InfantCount: 0,
        Routes: [
          {
            OriginCode: source,
            DestinationCode: destination,
            DepartureDate: departureDate,
          },
        ],
      });
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("tying");

    if (!!data) {
      console.log("calling");

      mutate({ info: JSON.stringify(data) });
    }
  }, [data]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between`}>
      <FilterBox />

      {flights
        ?.filter((item) => item.Prices.length > 0)
        .map((item) => (
          <TicketCard
            key={item.Id}
            data={item}
            btnTitle="رزور آنلاین"
            className="w-full md:w-1/2"
          />
        ))}

      <div className="bg-yellow-400 flex-col items-center justify-between p-3 w-full md:w-1/2">
        <div
          className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 font-medium"
          role="alert"
        >
          موجود شد خبرم کن
        </div>
        {flights
          ?.filter((item) => item.Prices.length === 0)
          .map((item) => (
            <TicketCard
              key={item.Id}
              data={item}
              btnTitle="رزور خودکار"
              className="w-full"
            />
          ))}
      </div>
    </main>
  );
};

export default TicketPage;
