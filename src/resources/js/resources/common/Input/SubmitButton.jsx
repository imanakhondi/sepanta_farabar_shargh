import React from "react";
import { general } from "../../constants/strings/fa";

const SubmitButton = ({
    disabled = "",
    submit = `${general.submit}`,
    customStyleBtn = "",
    showEditBTN = false,
    onClick
}) => {
    return (
        <>
            {showEditBTN ? (
                <button
                    type="submit"
                    // disabled={!formik.isValid}
                    disabled={disabled}
                    className={`${customStyleBtn} w-full bg-btnPrimaryColor rounded-xl py-3 mx-auto px-5 mt-3 text-white`}
                    onClick={onClick}
                >
                    ویرایش
                </button>
            ) : (
                <button
                    type="submit"
                    // disabled={!formik.isValid}
                    disabled={disabled}
                    className={`${customStyleBtn} w-full bg-btnPrimaryColor rounded-xl py-3 mx-auto px-5 mt-3 text-white`}
                >
                    {submit}
                </button>
            )}
        </>
    );
};

export default SubmitButton;
