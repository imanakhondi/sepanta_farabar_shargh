import { general } from "../../constants/strings/fa";

const SubmitButton = ({
    disabled = "",
    submit = `${general.submit}`,
    customStyleBtn = "",
    showEditBTN = false,
    onClick,
    onCancel,
}) => {
    return (
        <div className="flex gap-x-10 w-full">
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
            {onCancel && (
                <button
                    type="submit"
                    className={`${customStyleBtn} w-full bg-red-500 rounded-xl py-3 mx-auto px-5 mt-3 text-white`}
                    onClick={onCancel}
                >
                    کنسل
                </button>
            )}
        </div>
    );
};

export default SubmitButton;
