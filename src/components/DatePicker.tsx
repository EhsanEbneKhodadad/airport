import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import DatePickerCom from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface SelectDropDownProps<TFieldValues extends FieldValues> {
  title: string;
  formProps: UseFormReturn<TFieldValues, any>;
  fieldName: FieldPath<TFieldValues>;
  placeholder?: string;
  required?: boolean;
}

export const DatePicker = <T extends FieldValues>({
  title,
  formProps,
  fieldName,
  placeholder,
  required,
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
        render={({ field: { onChange, value } }) => (
          <DatePickerCom
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            calendar={persian}
            locale={persian_fa}
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
