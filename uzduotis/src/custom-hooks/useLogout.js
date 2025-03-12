import { useContext } from "react";
import SessionContext from "../contexts/SessionContext";

export default function useLogout() {
  const { setSessionState } = useContext(SessionContext);
  async function logout() {
    const promise = await fetch("/server/api/auth/logout");

    if (promise.ok) {
      window.location.href = "/login";
      setSessionState({
        user: {
          email: "",
          username: "",
        },
        isLogged: true,
      });
    } else {
      const response = await promise.json();
      alert(response.message);
    }
  }

  return logout;
}