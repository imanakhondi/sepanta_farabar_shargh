import TableFooter from "./TableFooter";
import Loading from "../../common/Loading";

const Table = ({
    pageSize,
    renderHeader,
    items,
    count,
    renderItems,
    currentPage,
    setCurrentPage,
    title,
    subTitle,
    loading,
    showBTN = false,
    modal,
    setModal,
    showText=false,
}) => {
    const pageNumber = Math.ceil(count / pageSize);
    const numbers = [...Array(pageNumber + 1).keys()].slice(1);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-primaryColorDark">{title}</h2>
                    <h3 className="text-primaryColor text-sm mt-1">
                        {subTitle}
                    </h3>
                </div>
                {showBTN && (
                    <button
                        className="py-2 px-4 bg-btnPrimaryColor text-white text-sm border-2 border-btnPrimaryColor duration-100 font-IRANSansWeb font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-navBgColor focus:ring-opacity-75"
                        onClick={() => setModal(!modal)}
                    >
                        افزودن
                    </button>
                )}
            </div>
            {loading && <Loading />}
            {!loading && (
                <>
                    {showText && (
                        <div>
                            <div className=" mt-5 text-left">
                                <div className="text-xs">
                                    تاریخ :
                                    <span className="text-red-500">
                                        1402/03/03
                                    </span>
                                </div>
                                <div className="text-xs">
                                    شماره :
                                    <span className="text-red-500">
                                        1402/159
                                    </span>
                                </div>
                            </div>
                            <p className="text-center">بسمه تعالی</p>
                            مدیریت محترم ...
                            <br />
                            جناب آقای بنی سعید <br />
                            با سلام ، <br />
                            احتراما نظر به خرید فرآورده مایع گاز (LPG) از شرکت
                            محترم ملی پخش فرآورده های نفتی ایران به شماره حواله
                            217792/910 شرکت تجارتی بینظیر صالحی لمتید با کد
                            پیمان
                            <span className="text-red-500">061اص</span> شرکت حمل
                            و نقل بین اللملی سپنتا فرابر شرق جهت بارگیری از مبدا{" "}
                            <span className="text-red-500">آبادان</span> به مقصد{" "}
                            <span className="text-red-500">افغانستان</span> ،
                            بدین وسلیه لیست کامیون های ارسالی این شرکت به حضور
                            تقدیم می گردد. خواهمند است در خصوص بارگیری کامیون
                            ذیل مساعدت مقتضی را مبذول فرمائید.پیشاپیش از مساعدت
                            و بذل توجه جنابعالی کمال سپاس و امتنان را دارم.
                        </div>
                    )}
                    <table className="table-autoborder-collapse border-separate border-spacing-y-2 table-auto w-full text-sm mt-4">
                        <thead className=" bg-slate-500">
                            {renderHeader()}
                        </thead>
                        <tbody className=" [&>*:nth-child(even)]:bg-white/90 [&>*:nth-child(odd)]:bg-btnPrimaryColor/5 space-y-4">
                            {renderItems()}
                        </tbody>
                    </table>

                    <TableFooter
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        numbers={numbers}
                        pageNumber={pageNumber}
                    />
                </>
            )}
        </div>
    );
};

export default Table;
