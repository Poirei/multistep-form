import { useContext } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "../context/MultiStepFormContext";
import { motion } from "framer-motion";

const FormOne = () => {
  const {
    formOneState,
    formTwoState,
    formThreeState,
    setFormOneState,
    next,
    prev,
    currentStep,
    handleSubmit: onSubmit,
  } = useContext(MultiStepFormContext);

  return (
    <Formik
      initialValues={formOneState}
      onSubmit={(values) => {
        setFormOneState(values);
        next();
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) errors.email = "Email is required";

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email))
          errors.profession = "Invalid email address";

        if (!values.password) errors.password = "Password is required";

        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            values.password,
          )
        )
          errors.password =
            "Password must contain 2 capital letters, 2 small letters, 2 numbers, and 2 special characters";
        return errors;
      }}
    >
      {({ handleSubmit, errors }) => {
        return (
          <motion.div
            className={"mx-auto my-[10em] max-w-[400px]"}
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={"mb-[1.6em]"}>
              <label className="font-normal text-blue-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_5%)]">
                Email <span className="text-red-600">*</span>
              </label>
              <Input
                name={"email"}
                className={`rounded-sm ${errors.email && "border-red-600"} mt-1 bg-[#E7F0FE]`}
              />
              <p className={"text-sm font-normal text-red-600"}>{errors.email}</p>
            </div>
            <div className={"mb-[1.6em]"}>
              <label className="font-normal text-blue-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_5%)]">
                Password <span className="text-red-600">*</span>
              </label>
              <Input
                name={"password"}
                className={`rounded-sm ${errors.Password && "border-red-600"} mt-1 bg-[#E7F0FE]`}
                type="password"
              />
              <p className={"text-sm font-normal text-red-600"}>{errors.password}</p>
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
export default FormOne;
