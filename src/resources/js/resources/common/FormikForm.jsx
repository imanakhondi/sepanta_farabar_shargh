import SubmitButton from "./Input/SubmitButton";
import Loading from "./Loading";

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
    showEditBTN,
    onClick,
    onCancel=false
}) => {
    return (
        <div
            className={`${customStyle} flex flex-col bg-white rounded-xl shadow-lg px-10 py-4 mx-3`}
        >
            <h2 className="font-bold text-primaryColorDark">{title}</h2>
            <h3 className="text-primaryColor text-sm mt-2 mb-5">{subTitle}</h3>
            {loading && <Loading />}
            {error.message && (
                <span className="py-2 text-center rounded-lg bg-red-200 text-red-500 border border-red-500">
                    {error.message}
                </span>
            )}
            {/* {!error.message && ( */}
                <form
                    onSubmit={onSubmit}
                    className={`${customStyleForm} flex flex-wrap justify-between mt-5`}
                >
                    {children}
                    <SubmitButton
                        disabled=""
                        customStyleBtn={customStyleBtn}
                        showEditBTN={showEditBTN}
                        onClick={onClick}
                        onCancel={onCancel}
                    />
                </form>
            {/* )} */}
        </div>
    );
};

export default FormikForm;
