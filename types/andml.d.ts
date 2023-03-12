import { ComputedOptions, ConcreteComponent, MethodOptions } from "vue";

declare type AndmlData = {
  andml?: string;
  component:
    | string
    | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions>;
  props?: string;
};

declare type AndmlScript = {
  script: string;
  component:
    | string
    | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions>;
};
