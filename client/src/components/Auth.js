import React, { useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";

function Auth() {
  //Create a function that fires when the component loads -- tries to authenticate - dispatch an action?
  //If it fails, the user is not logged in
  //When the login action gets fired, we adjust the state
  useEffect(() => {
    //dispatch an attempt to login with the sessionID
    //dispatch();
  }, []);

  return null;
}

export default Auth;
