import { ITicketBody, getTickets } from "@/api/ticket";
import { FilterBox } from "@/components/FilterBox";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TicketPage = () => {
  const searchParams = useSearchParams();
  const [canSendRequest, setCanSetRequest] = useState(false);
  const [query, setQuery] = useState<ITicketBody | null>(null);

  const data = useQuery({
    queryKey: ["ticket", query],
    queryFn: () => query && getTickets(query),
    enabled: canSendRequest,
  });

  console.log({ data });

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

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between`}>
      <FilterBox />
    </main>
  );
};

export default TicketPage;
