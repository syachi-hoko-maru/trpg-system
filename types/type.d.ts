declare type FormValue = number | string | Boolean;
declare type FormItem = {
  name: string;
  value: FormValue;
  label: string;
  type: "number" | "switch" | string[];
  group: "hantei" | "teiko" | "damage";
  option?: boolean;
  hidden?: boolean;
};
