declare type FormValue = number | string | Boolean | FormItem[];
declare type FormItem = {
  name: string;
  value: FormValue;
  label: string;
  type: "number" | "switch" | string[] | "form";
  group: "hantei" | "teiko" | "damage";
  option?: boolean;
  hidden?: boolean;
};
