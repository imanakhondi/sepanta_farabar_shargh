import React from "react";
import TableFooter from "./TableFooter";

const Table = ({
    pageSize,
    renderHeader,
    items,
    renderItems,
    currentPage,
    setCurrentPage,
    title,
    subTitle,
}) => {
    const pageNumber = Math.ceil(items.length / pageSize);
    const numbers = [...Array(pageNumber + 1).keys()].slice(1);

    return (
        <>
            <h2 className="font-bold text-primaryColorDark">{title}</h2>
            <h3 className="text-primaryColor text-sm mt-1">{subTitle}</h3>
            <table className="table-autoborder-collapse border-separate border-spacing-y-2 table-auto w-full text-sm mt-4">
                <thead className=" bg-slate-500">{renderHeader()}</thead>
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
    );
};

export default Table;
