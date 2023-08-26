import  { useState } from "react";
import FormStep from "../../../components/Form/FormStep"
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const EditIntroduction = () => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState({});
    return (
        <FormStep
            activeStepIndex={activeStepIndex}
            setActiveStepIndex={setActiveStepIndex}
        >
            <div className="mt-10">
                {activeStepIndex === 0 && (
                    <StepOne
                        formData={formData}
                        activeStepIndex={activeStepIndex}
                        setActiveStepIndex={setActiveStepIndex}
                        setFormData={setFormData}
                    />
                )}
                {activeStepIndex === 1 && (
                    <StepTwo
                        formData={formData}
                        activeStepIndex={activeStepIndex}
                        setActiveStepIndex={setActiveStepIndex}
                        setFormData={setFormData}
                    />
                )}
                {activeStepIndex === 2 && (
                    <StepThree
                        formData={formData}
                        activeStepIndex={activeStepIndex}
                        setActiveStepIndex={setActiveStepIndex}
                        setFormData={setFormData}
                    />
                )}
            </div>
        </FormStep>
    );
};

export default EditIntroduction;
