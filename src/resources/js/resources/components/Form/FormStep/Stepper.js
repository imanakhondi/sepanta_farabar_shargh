import { useEffect } from "react";

function Stepper({ activeStepIndex, setActiveStepIndex }) {
    useEffect(() => {
        const stepperItems = document.querySelectorAll(".stepper-item");
        stepperItems.forEach((step, i) => {
            if (i <= activeStepIndex) {
                step.classList.add("bg-btnSecondaryColor", "text-white","border-btnSecondaryColor");
                step.previousSibling.classList.add("border-btnSecondaryColor");
            } else {
                step.classList.remove("bg-btnSecondaryColor", "text-white","border-btnSecondaryColor");
                step.previousSibling.classList.remove(
                    "border-btnSecondaryColor"
                );
            }
        });
    }, [activeStepIndex]);

    return (
        <div className="flex items-center justify-center mx-3">
            <div className="flex-[4]">item</div>
            <div className="w-full flex-[3] flex flex-row items-center justify-center py-8 mx-auto ">
                <div className=""></div>
                <div
                    className="stepper-item w-16 h-16 text-[10px] flex items-center justify-center font-medium border-2 rounded-full cursor-pointer"
                    id="1"
                    onClick={(e) => setActiveStepIndex(e.target.id - 1)}
                >
                    انتظار بارگیری
                </div>
                <div className="flex-auto border-t-2 stepper-line"></div>
                <div
                    className="stepper-item w-16 h-16 text-[10px] flex items-center justify-center font-medium border-2 rounded-full cursor-pointer"
                    id="2"
                    onClick={(e) => setActiveStepIndex(e.target.id - 1)}
                >
                    انتظار تخلیه
                </div>
            </div>
        </div>
    );
}

export default Stepper;
