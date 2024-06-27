import { Steps } from "antd";
import { Provider } from "../context/MultiStepFormContext";
import { useState } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const formOneInitialState = {
  email: "",
  password: "",
};

const formTwoInitialState = {
  firstName: "",
  lastName2: "",
  address: "",
};

const formThreeInitialState = {
  countryCode: "+91",
  phoneNumber: "",
  acceptTermsAndConditions: false,
};

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <FormOne />;
    case 1:
      return <FormTwo />;
    case 2:
      return <FormThree />;
    default:
      return null;
  }
};

async function handleSubmit(formOneData, formTwoData, formThreeData) {
  console.log(formOneData, formTwoData, formThreeData);

  const { email, password } = formOneData;
  const { firstName, lastName, address } = formTwoData;
  const { countryCode, phoneNumber } = formThreeData;

  const response = await fetch("https://codebuddy.review/submit", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      address,
      countryCode,
      phoneNumber,
    }),
  });

  const data = await response.json();
  console.log(data);
}

const MultiStepForm = () => {
  const [formOneState, setFormOneState] = useState(formOneInitialState);
  const [formTwoState, setFormTwoState] = useState(formTwoInitialState);
  const [formThreeState, setFormThreeState] = useState(formThreeInitialState);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);
  return (
    <Provider
      value={{
        formOneState,
        setFormOneState,
        formTwoState,
        setFormTwoState,
        formThreeState,
        setFormThreeState,
        currentStep,
        handleSubmit,
        next,
        prev,
        navigate,
      }}
    >
      <Steps current={currentStep} className="mx-auto max-w-[1100px] font-sans">
        <Step
          title={"Email & Password"}
          onClick={() => setCurrentStep(0)}
          className="disabled::cursor-not-allowed cursor-pointer"
        />
        <Step
          title={"Personal Details"}
          onClick={() => Object.values(formOneState).every((value) => value) && setCurrentStep(1)}
          className="disabled::cursor-not-allowed cursor-pointer"
          disabled={Object.values(formOneState).every((value) => value === "")}
        />
        <Step
          title={"Terms & Conditions"}
          onClick={() => Object.values(formTwoState).every((value) => value) && setCurrentStep(2)}
          className="disabled::cursor-not-allowed cursor-pointer"
          disabled={Object.values(formTwoState).every((value) => value === "")}
        />
      </Steps>
      <main>{renderStep(currentStep)}</main>
    </Provider>
  );
};
export default MultiStepForm;
