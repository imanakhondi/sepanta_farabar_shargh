import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state/store";
import { Routes } from "./navigation";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className=" bg-[#EAEDF4] overflow-hidden font-IRANSansWeb relative">
            <Routes />
        </div>
    );
}

export default App;

if (document.getElementById("root")) {
    createRoot(document.getElementById("root")).render(
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}
