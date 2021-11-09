import React, { useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { autoLoginAction } from "../actions/autoLoginAction";

function Auth() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginAction());
  }, []);

  return null;
}

export default Auth;
