import { useState } from "react";
import FormStep from "../../../../components/Form/FormStep"
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const CompleteCarIntroduction = () => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState({});
    return (
        <FormStep
            activeStepIndex={activeStepIndex}
            setActiveStepIndex={setActiveStepIndex}
        >
            <div className="mt-10">
                {activeStepIndex === 0 && (
                    <StepTwo
                        formData={formData}
                        activeStepIndex={activeStepIndex}
                        setActiveStepIndex={setActiveStepIndex}
                        setFormData={setFormData}
                    />
                )}
                {activeStepIndex === 1 && (
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

export default CompleteCarIntroduction;
