import { IOption } from "@/types/IShared";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import Select from "react-select";

interface SelectDropDownProps<TFieldValues extends FieldValues> {
  title: string;
  formProps: UseFormReturn<TFieldValues, any>;
  fieldName: FieldPath<TFieldValues>;
  options: IOption[];
  placeholder?: string;
  required?: boolean;
}

export const SelectController = <T extends FieldValues>({
  title,
  formProps,
  fieldName,
  placeholder,
  required,
  options,
}: SelectDropDownProps<T>) => {
  const {
    control,
    formState: { errors },
  } = formProps;

  return (
    <div className="flex flex-col">
      <label htmlFor={fieldName}>{title}</label>
      <Controller
        rules={{ required: required }}
        name={fieldName}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            id={fieldName}
            options={options}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            isSearchable
          />
        )}
      />
      <span className="mt-0.5 text-sm text-red-400">
        {errors[fieldName]?.type === "required" && `${title} اجباری می‌باشد.`}
        {errors[fieldName]?.type === "pattern" &&
          `${title} وارد شده صحیح نمی‌باشد.`}
      </span>
    </div>
  );
};
