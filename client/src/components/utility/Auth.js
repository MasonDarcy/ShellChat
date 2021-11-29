import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLoginAction } from "../../actions/loginActions/autoLoginAction";

function Auth() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginAction());
  }, []);

  return null;
}

export default Auth;
