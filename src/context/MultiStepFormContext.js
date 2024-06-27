import { createContext } from "react";

const MultiStepFormContext = createContext({});

export default MultiStepFormContext;

export const { Provider, Consumer } = MultiStepFormContext;
