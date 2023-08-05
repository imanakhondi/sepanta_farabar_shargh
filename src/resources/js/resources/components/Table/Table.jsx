import React from "react";
import TableFooter from "./TableFooter";
import { general } from "../../constants/strings/fa";

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
}) => {
    const pageNumber = Math.ceil(count / pageSize);
    const numbers = [...Array(pageNumber + 1).keys()].slice(1);

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-primaryColorDark">{title}</h2>
            <h3 className="text-primaryColor text-sm mt-1">{subTitle}</h3>
            {loading && (
                <span className="py-2 my-3 text-center rounded-lg bg-blue-200 text-blue-500 border border-blue-500">
                    {general.loading}
                </span>
            )}
            {!loading && (
                <>
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
