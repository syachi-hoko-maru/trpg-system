import { ComputedOptions, ConcreteComponent, MethodOptions } from "vue";

type Component =
  | string
  | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions>;
declare type AndmlData = {
  andml?: string;
  component: Component;
  props?: string;
};

declare type AndmlBlockData = {
  andmls: string[];
  component: Component;
  props?: string;
};

declare type AndmlScript = {
  script: string;
  component: Component;
};
