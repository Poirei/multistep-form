import { useContext } from "react";
import { Formik } from "formik";
import { Button, Select } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "../context/MultiStepFormContext";
import { motion } from "framer-motion";

const FormThree = () => {
  const {
    formOneState,
    formTwoState,
    formThreeState,
    setFormThreeState,
    prev,
    currentStep,
    handleSubmit: submit,
    navigate,
  } = useContext(MultiStepFormContext);
  useContext(MultiStepFormContext);

  return (
    <Formik
      initialValues={formThreeState}
      onSubmit={() => {
        submit(formOneState, formTwoState, formThreeState);

        navigate("/posts");
      }}
      validate={(values) => {
        const errors = {};
        if (!values.countryCode) errors.countryCode = "Required";

        if (!values.phoneNumber) errors.phoneNumber = "Required";

        if (!/^\d{10}$/.test(values.phoneNumber)) errors.phoneNumber = "Invalid phone number";

        if (!values.acceptTermsAndConditions)
          errors.acceptTermsAndConditions = "You have to accept terms and conditions";

        return errors;
      }}
    >
      {({ handleSubmit, errors }) => {
        return (
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className={"mx-auto my-[10em] max-w-[400px]"}
          >
            <div className={"mb-[1.6em]"}>
              <label>Country Code *</label>

              <Select
                name={"countryCode"}
                defaultValue={"+91"}
                className={`w-min ${errors.countryCode && "border-red-400"}`}
                options={[
                  { label: "India (+91)", value: "+91" },
                  { label: "US (+1)", value: "+1" },
                ]}
                onChange={(e) => {
                  setFormThreeState((formThreeState) => ({
                    ...formThreeState,
                    countryCode: e,
                  }));
                }}
              />
              <p className={"text-red-400"}>{errors.countryCode}</p>
            </div>
            <div className={"mb-[1.6em]"}>
              <label>Phone *</label>
              <Input
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                name={"phoneNumber"}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(+e.key) && !e.key.match(/[Backspace|Delete]/)) {
                    e.preventDefault();
                  }
                }}
                className={`${errors.countryCode && "border-red-400"}`}
                onChange={(e) => {
                  setFormThreeState((formThreeState) => ({
                    ...formThreeState,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
              <p className={"text-red-400"}>{errors.phoneNumber}</p>
            </div>
            <div className={"mb-[1.6em] flex gap-x-2 align-middle"}>
              <label>Terms and Conditions *</label>
              <Input
                type="checkbox"
                name={"acceptTermsAndConditions"}
                className={`h-4 w-4 ${errors.acceptTermsAndConditions && "border-red-400"}`}
                onChange={(e) => {
                  setFormThreeState((formThreeState) => ({
                    ...formThreeState,
                    acceptTermsAndConditions: e.target.checked,
                  }));
                }}
              />
              <p className={"text-red-400"}>{errors.acceptTermsAndConditions}</p>
            </div>
            <div className={" mb-[1.6em] flex justify-between"}>
              <Button
                type={"default"}
                onClick={prev}
                className="rounded-sm"
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                type="dashed"
                className="rounded-sm"
                onClick={handleSubmit}
                disabled={!formThreeState.acceptTermsAndConditions}
              >
                Save
              </Button>
              <Button
                type={"primary"}
                onClick={handleSubmit}
                className="rounded-sm"
                disabled={currentStep === 2}
              >
                Save and Next
              </Button>
            </div>
          </motion.div>
        );
      }}
    </Formik>
  );
};
export default FormThree;
