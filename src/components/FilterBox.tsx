import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { SelectController } from "./DropDown";
import { DatePicker } from "./DatePicker";
import { cities } from "@/staticData/city";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { IOption } from "@/types/IShared";

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

  const { handleSubmit } = formProps;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const btnSubmit = (data: Form) => {
    const { source, destination, departureDate, passengers, returnDate } = data;
    console.log({ source, departureDate });

    push({
      pathname: "/ticket",
      query: {
        source: source.value,
        destination: destination.value,
        departureDate: departureDate.toString(),
        returnDate: returnDate.toString(),
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(btnSubmit)}
      className="w-full rounded-md bg-white shadow-lg p-6 grid md:grid-cols-3 xl:grid-cols-6 gap-8"
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
      <SelectController
        title="تعداد مسافر"
        formProps={formProps}
        fieldName="passengers"
        placeholder="تعداد مسافر"
        options={[]}
      />
      <div className="w-full h-full flex items-end">
        <Button title="جست و جو" type="submit" className="h-[38px] w-full" />
      </div>
    </form>
  );
};
