import React, { useEffect } from "react";

function Alert({type, msg, removeAlert, list}) { // everytime when the props are going to change we will get a new set of timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    },3000)
    return () => clearTimeout(timeout)
  },[list])
  return <p className={`alert alert-${type}`}>{msg}</p>; // depending on the type it will be alert with the options danger or success
}

export default Alert;
