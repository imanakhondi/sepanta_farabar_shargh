import React from "react";
import SubmitButton from "./Input/SubmitButton";
import Loading from "./Input/Loading";

const FormikForm = ({
    children,
    onSubmit,
    customStyle = "",
    customStyleBtn = "",
    customStyleForm = "",
    loading,
    error,
    title = "",
    subTitle = "",
}) => {
    return (
        <div
            className={`${customStyle} flex flex-col bg-white rounded-xl shadow-lg px-10 py-4 mx-3`}
        >
            <h2 className="font-bold text-primaryColorDark">{title}</h2>
            <h3 className="text-primaryColor text-sm mt-2 mb-5">{subTitle}</h3>
            {loading && <Loading />}
            {error.message !== null && (
                <span className="py-2 text-center rounded-lg bg-red-200 text-red-500 border border-red-500">
                    {error.message}
                </span>
            )}
            <form
                onSubmit={onSubmit}
                className={`${customStyleForm} flex flex-wrap justify-between mt-5`}
            >
                {children}
                <SubmitButton disabled="" customStyleBtn={customStyleBtn} />
            </form>
        </div>
    );
};

export default FormikForm;
