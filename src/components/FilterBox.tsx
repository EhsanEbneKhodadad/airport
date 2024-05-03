import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { SelectController } from "./DropDown";
import { DatePicker } from "./DatePicker";
import { cities } from "@/staticData/city";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IOption } from "@/types/IShared";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

type Form = {
  source: IOption;
  destination: IOption;
  passengers: string;
  departureDate: Date;
  returnDate: Date;
};

export const FilterBox = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const formProps = useForm<Form>();

  const { handleSubmit, reset } = formProps;

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  useEffect(() => {
    const source = searchParams.get("source") ?? "";
    const sourceResult = cities.find((item) => item.value === source);

    const destination = searchParams.get("destination") ?? "";
    const destinationResult = cities.find((item) => item.value === destination);

    const departureDate = searchParams.get("departureDate") ?? "";
    const returnDate = searchParams.get("returnDate") ?? "";

    if (sourceResult && destinationResult && departureDate && returnDate) {
      reset({
        source: { label: sourceResult?.label, value: sourceResult?.value },
        destination: {
          label: destinationResult?.label,
          value: destinationResult?.value,
        },
        departureDate: new Date(departureDate),
        returnDate: new Date(returnDate),
      });
    }
  }, [reset, searchParams]);

  const btnSubmit = (data: Form) => {
    const { source, destination, departureDate, passengers, returnDate } = data;

    const departureDateRes = new DateObject(departureDate)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DD");
    const returnDateRes = new DateObject(returnDate)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DD");

    push({
      pathname: "/ticket",
      query: {
        source: source.value,
        destination: destination.value,
        departureDate: departureDateRes,
        returnDate: returnDateRes,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(btnSubmit)}
      className="w-full rounded-md bg-white shadow-lg p-6 grid md:grid-cols-3 xl:grid-cols-5 gap-8"
    >
      <SelectController
        title="مبدا"
        formProps={formProps}
        fieldName="source"
        placeholder="مبدا"
        options={cities}
        required
      />
      <SelectController
        title="مقصد"
        formProps={formProps}
        fieldName="destination"
        placeholder="مقصد"
        options={cities}
        required
      />
      <DatePicker
        title="تاریخ رفت"
        formProps={formProps}
        fieldName="departureDate"
        placeholder="تاریخ رفت"
        required
      />
      <DatePicker
        title="تاریخ برگشت"
        formProps={formProps}
        fieldName="returnDate"
        placeholder="تاریخ برگشت"
      />
      {/* <SelectController
        title="تعداد مسافر"
        formProps={formProps}
        fieldName="passengers"
        placeholder="تعداد مسافر"
        options={[]}
      /> */}
      <div className="w-full h-full flex items-end">
        <Button title="جست و جو" type="submit" className="h-[38px] w-full" />
      </div>
    </form>
  );
};
