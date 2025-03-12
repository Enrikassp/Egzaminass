import { useContext } from "react";
import SessionContext from "../contexts/SessionContext";

export default function useLogin() {
  const { setSessionState } = useContext(SessionContext);
  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {};

    formData.forEach((val, key) => (loginData[key] = val));
    const promise = await fetch("/server/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (promise.ok) {
      window.location.href = "/";
      setSessionState({
        user: {
          email: loginData.email,
          username: loginData.username,
        },
        isLogged: true,
      });
    } else {
      const respone = await promise.json();
      alert(respone.message);
    }
  }

  return handleLogin;
}