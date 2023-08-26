

const Modal = ({ modal, setModal, children,positionStyle="",customStyle="" }) => {
    return (
        <>
            <div
                className=" bg-navBgColorDark opacity-10 w-full min-h-screen z-[98] absolute inset-0 "
                onClick={() => setModal(!modal)}
            ></div>
            <div className={`${positionStyle} relative text-slate-600`}>
                <div className={`${customStyle} shadow-lg bg-white dark:bg-navBgColorDark dark:text-primaryColorDark p-3 w-48 min-h-[100px] z-[99] rounded-lg absolute left-0 top-6 font-IRANSansWeb text-sm mt-5`}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
