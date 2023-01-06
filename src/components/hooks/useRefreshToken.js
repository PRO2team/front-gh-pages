import axios from "../api/axios";
import useAuth from "./useAuth";
import { useRef, useState, useEffect } from "react";

import globalUrls from "../Utility/Urls";

const useRefreshToken = () => {
  const { auth, setAuth, local } = useAuth();
  let temp;
  let tempAuth;
  let requestOptions;
  console.log(auth?.login);
  console.log(auth?.refreshToken);
  console.log(auth);

  const setAuthentification = () => {
    tempAuth = JSON.parse(localStorage.getItem("auth"));
    console.log(tempAuth);
    if (tempAuth !== null && tempAuth.length !== 0) {
      return tempAuth;
    }
  };

  if (auth !== null && auth.length !== 0) {
    temp = setAuthentification();
    requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        login: temp.login,
        refreshToken: temp.refreshToken,
      },
      body: "",
    };
  } else {
    requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        login: auth?.login,
        refreshToken: auth?.refreshToken,
      },
      body: "",
    };
  }

  const refresh = async () => {
    console.log(requestOptions);

    const response = await fetch(globalUrls.REFRESH_TOKEN_URL, requestOptions);
    if (response.status === 200) {
      const data = await response.text();
      setAuth((prev) => {
        if (JSON.stringify(prev) === "{}") {
          return { ...temp, accessToken: data };
        }
        console.log(JSON.stringify(prev));
        console.log(data);
        return { ...prev, accessToken: data };
      });
      localStorage.setItem("acessToken", data);
      return data;
    }
  };
  return refresh;
};

export default useRefreshToken;