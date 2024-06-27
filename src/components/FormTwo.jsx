import { useContext } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "../context/MultiStepFormContext";
import { motion } from "framer-motion";

const FormTwo = () => {
  const {
    formOneState,
    formTwoState,
    formThreeState,
    setFormTwoState,
    next,
    prev,
    currentStep,
    handleSubmit: onSubmit,
  } = useContext(MultiStepFormContext);
  useContext(MultiStepFormContext);

  return (
    <Formik
      initialValues={formTwoState}
      onSubmit={(values) => {
        setFormTwoState(values);
        next();
      }}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) errors.firstName = "Firstname is required";

        if (!/^[A-Za-z]{2,50}$/.test(values.firstName))
          errors.firstName = "Firstname must be atleast 2 characters and maximum 50 characters";

        if (values.lastName && !/^[A-Za-z]+$/.test(values.lastName))
          errors.lastName = "Lastname must be only alphabets";

        if (!/^.{10,}$/.test(values.address))
          errors.address = "Address must be atleast 10 characters";
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
              <label className="mb-1 font-normal text-blue-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_5%)]">
                First Name <span className="text-red-600">*</span>
              </label>
              <Input
                name={"firstName"}
                className={`${errors.firstName && "border-red-400"} mt-1 rounded-sm bg-[#E7F0FE]`}
              />
              <p className={"text-sm font-normal text-red-600"}>{errors.firstName}</p>
            </div>
            <div className={"mb-[1.6em]"}>
              <label className="font-normal text-blue-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_5%)]">
                Last Name <span className="italic text-gray-600">(optional)</span>
              </label>
              <Input
                name={"lastName"}
                className={`${errors.lastName && "border-red-400"} mt-1 rounded-sm bg-[#E7F0FE]`}
              />
              <p className={"text-sm font-normal text-red-600"}>{errors.lastName}</p>
            </div>
            <div className={"mb-[1.6em]"}>
              <label className="font-normal text-blue-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_5%)]">
                Address <span className="text-red-600">*</span>
              </label>
              <Input
                name={"address"}
                className={`${errors.address && "border-red-400"} mt-1 rounded-sm bg-[#E7F0FE]`}
              />
              <p className={"text-sm font-normal text-red-600"}>{errors.address}</p>
            </div>
            <div className={"mb-[1.6em] flex justify-between"}>
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
                onClick={() => onSubmit(formOneState, formTwoState, formThreeState)}
              >
                Save
              </Button>
              <Button type={"primary"} onClick={handleSubmit} className="rounded-sm">
                Save and Next
              </Button>
            </div>
          </motion.div>
        );
      }}
    </Formik>
  );
};
export default FormTwo;
