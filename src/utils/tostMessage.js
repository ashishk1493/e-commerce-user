import { toast } from "react-toastify";

export const PAnotifySuccess = (message) =>
    toast(<p style={{ fontSize: 16, zIndex: 11111 }}>{message}</p>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: "success"
    });
export const PAnotifyError = (message) =>
    toast(<p style={{ fontSize: 16, zIndex: 11111 }}>{message}</p>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: "error"
    });