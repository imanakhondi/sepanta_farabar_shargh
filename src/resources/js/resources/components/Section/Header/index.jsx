import React, { useState } from "react";
import profile from "../../../images/profile.jpeg";
import Modal from "../../../common/Modal";
import { Link, useNavigate } from "react-router-dom";
import { header } from "../../../constants/strings/fa";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../http/entities/User";
import { userLogOut } from "../../../state/user/userAction";
import Search from "../../../common/Input/Search";
import Siderbar from "../Sidebar";
const Header = () => {
    const [modal, setModal] = useState(false);
    const [menuMobile, setMenuMobile] = useState(false);
    const user = new User();
    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        if (userState.isAuthenticated) {
            user.logOut();
            dispatch(userLogOut());
            navigate("/login");
        }
    };
    console.log(menuMobile);

    return (
        <div className="h-16 my-3 ml-5 container">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center">
                    <i
                        className="icon-element-34 text-xl ml-3 md:hidden"
                        onClick={() => {setMenuMobile(!menuMobile)}}
                    ></i>
                    {menuMobile && (
                        <Modal modal={menuMobile} setModal={setMenuMobile} positionStyle="!static" customStyle="!top-0 bottom-0 right-0 mt-0 w-80 !shadow-none !bg-navBgColor ">
                            <Siderbar customStyle="!block z-[999]" />
                            {/* <div className="hidden md:block w-60 min-h-min bg-navBgColor text-primaryColor my-3 mr-6 ml-2 py-5 pl-4 rounded-[50px] shadow-xl">
                                <div className="flex items-center justify-center mb-5 pb-5 border-b mr-5 border-primaryColor">
                                    <img
                                        src={logo}
                                        alt=""
                                        className="w-20 h-20"
                                    />
                                </div>

                                <ul>
                                    {menuItems.map((menu, index) => {
                                        return (
                                            <MenuItem
                                                item={menu}
                                                key={index}
                                                id={index}
                                            />
                                        );
                                    })}

                                    <li
                                        className="flex items-center relative h-[50px] mb-1 pr-5 dark:text-primaryColor text-red-500 cursor-pointer "
                                        onClick={logoutHandler}
                                    >
                                        <i className="icon-logout4 text-xl ml-3"></i>
                                        <div className="xl:flex items-center w-full justify-between hidden text-sm  ">
                                            {sidebar.logout}
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
                        </Modal>
                    )}
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setModal(!modal)}
                    >
                        <img src={profile} alt="" className="h-10 w-10 " />
                        <div className="hidden md:flex flex-col mr-2 text-xs font-bold text-primaryColorDark">
                            <h1>
                                {userState.user.name} {userState.user.family}
                            </h1>
                            <span>{userState.user.username}</span>
                        </div>
                    </div>
                    {modal && (
                        <Modal modal={modal} setModal={setModal}>
                            <div>
                                <i className="icon-user4 text-xl ml-3 "></i>
                                {userState.user.name} {userState.user.family}
                            </div>
                            <Link to="">
                                <button
                                    className="cursor-pointer my-3 flex items-center"
                                    onClick={() => setModal(!modal)}
                                >
                                    <i className="icon-user-edit4 text-xl ml-3 "></i>
                                    <span>{header.editProfile}</span>
                                </button>
                            </Link>
                            <hr />
                            <div
                                onClick={logoutHandler}
                                className="cursor-pointer my-3 text-red-500 flex items-center"
                            >
                                <i className="icon-logout4 text-xl ml-3 "></i>
                                <span>{header.logout}</span>
                            </div>
                        </Modal>
                    )}
                </div>
                <Search />
            </div>
        </div>
    );
};

export default Header;
