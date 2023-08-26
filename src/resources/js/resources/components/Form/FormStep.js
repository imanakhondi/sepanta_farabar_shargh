import Stepper from "./FormStep/Stepper";

const FormStep = ({ children, activeStepIndex,setActiveStepIndex }) => {
    return (
        <div className="">
            <div className="mx-auto">
                <Stepper activeStepIndex={activeStepIndex} setActiveStepIndex={setActiveStepIndex} />
                {children}
            </div>
        </div>
    );
};

export default FormStep;
