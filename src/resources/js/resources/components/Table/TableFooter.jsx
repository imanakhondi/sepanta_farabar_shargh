import { useEffect } from "react";
import { general } from "../../constants/strings/fa";

const TableFooter = ({ currentPage, setCurrentPage, numbers, pageNumber }) => {
    const footerTableFun = (id) => {
        const btn = document.getElementById(`btn-${id}`);
        const numBtns = document.querySelectorAll(".numBtns");
        [...numBtns].map((item) => {
            item.classList.remove("bg-btnPrimaryColor");
        });
        if (btn !== null) {
            btn.classList.add("bg-btnPrimaryColor");
        }
    };

    useEffect(() => {
        if (currentPage === 1) {
            footerTableFun(1);
        }
    }, []);

    const prevHandler = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            footerTableFun(currentPage - 1);
        }
    };

    const pageCurrentHandler = (id) => {
        setCurrentPage(id);
        footerTableFun(id);
    };

    const nextHandler = () => {
        if (currentPage !== pageNumber) {
            setCurrentPage(currentPage + 1);
            footerTableFun(currentPage + 1);
        }
    };

    const lastHandler = () => {
        setCurrentPage(pageNumber);
        footerTableFun(pageNumber);
    };

    const firstHandler = () => {
        setCurrentPage(1);
        footerTableFun(1);
    };
    return (
        <nav>
            <ul className="flex gap-2">
                <li>
                    <button onClick={firstHandler}>{general.first}</button>
                </li>
                <li>
                    <button onClick={prevHandler}>{general.previous}</button>
                </li>
                {numbers.map((item) => {
                    return (
                        <li key={`btn-${item}`} className="">
                            <button
                                onClick={() => pageCurrentHandler(item)}
                                className="numBtns rounded-full w-8 h-8"
                                id={`btn-${item}`}
                            >
                                {item}
                            </button>
                        </li>
                    );
                })}
                <li>
                    <button onClick={nextHandler}>{general.next}</button>
                </li>
                <li>
                    <button onClick={lastHandler}>{general.last}</button>
                </li>
            </ul>
        </nav>
    );
};

export default TableFooter;
