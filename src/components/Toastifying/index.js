import React from "react";
import { toast, ToastContainer } from "react-toastify";

export const TOASTIFY_OPTIONS = {
  position: "top-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  style: { fontSize: 16 },
} ;

function Toastifying(props){
  let type = props.type ;
   const TOASTIFY_OPTIONS = {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }



  toast(props.message, TOASTIFY_OPTIONS);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toastifying;
