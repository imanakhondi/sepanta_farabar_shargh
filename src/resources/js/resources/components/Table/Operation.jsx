import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "../../common/Tooltip";
import { general } from "../../constants/strings/fa";
const Operation = ({ link, showLink, repairLink, addLink, addCarLink,continueLink }) => {
    return (
        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
            {showLink && (
                <Tooltip message={general.view}>
                    <Link to={showLink}>
                        <i className="icon-trash4 before:content-['\e8a4'] text-2xl cursor-pointer font-bold text-blue-500"></i>
                    </Link>
                </Tooltip>
            )}
            {link && (
                <Tooltip message={general.edit}>
                    <Link to={link}>
                        <i className="icon-edit4 before:content-['\e88c'] text-2xl cursor-pointer font-bold text-green-500"></i>
                    </Link>
                </Tooltip>
            )}
            {repairLink && (
                <Tooltip message={general.repair}>
                    <Link to={repairLink}>
                        <i className="icon-add-square before:content-['\ee7f'] text-2xl cursor-pointer font-bold text-yellow-500"></i>
                    </Link>
                </Tooltip>
            )}
            {addLink && (
                <Tooltip message={general.addTank}>
                    <Link to={addLink}>
                        <i className="icon-add-square before:content-['\ee7f'] text-2xl cursor-pointer font-bold text-yellow-500"></i>
                    </Link>
                </Tooltip>
            )}
            {addCarLink && (
                <Tooltip message={general.addCar}>
                    <Link to={addCarLink}>
                        <i className="icon-add-square before:content-['\ee7f'] text-2xl cursor-pointer font-bold text-yellow-500"></i>
                    </Link>
                </Tooltip>
            )}
            {continueLink && (
                <Tooltip message={general.continue}>
                    <Link to={continueLink}>
                        <i className="icon-add-square before:content-['\ee7f'] text-2xl cursor-pointer font-bold text-yellow-500"></i>
                    </Link>
                </Tooltip>
            )}
            {/* <i className="icon-trash4 before:content-['\eaa0'] text-2xl cursor-pointer font-bold text-red-500"></i> */}
        </td>
    );
};

export default Operation;
