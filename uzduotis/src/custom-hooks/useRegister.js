import { useState } from "react";
import { registrationSchema } from "../utils/validations/AuthSchema";

export default function useRegister() {
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });
  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registrationData = {};

    formData.forEach((val, key) => (registrationData[key] = val));
    if (registrationData.password !== registrationData.repeatedPassword) {
      setErrors((current) => ({
        ...current,
        password: "Passwords does not match!",
        repeatedPassword: "Passwords does not match!",
      }));
      return;
    }

    resetErrors();
    const validationResult = registrationSchema.safeParse(registrationData);

    if (!validationResult.success) {
      resetErrors();

      validationResult.error.issues.forEach((issue) => {
        setErrors((current) => ({
          ...current,
          [issue.path[0]]: issue.message,
        }));
      });
      return;
    }

    resetErrors();
    const promise = await fetch("/server/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });
    if (promise.ok) {
      window.location.href = "/";
    } else {
      const response = await promise.json();

      if (response.error && Array.isArray(response.error)) {
        response.error.forEach((issue) => {
          setErrors((current) => ({
            ...current,
            [issue.path[0]]: issue.message,
          }));
        });
      } else {
        alert(response.message);
      }
    }
  }

  function resetErrors() {
    setErrors({
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    });
  }

  return { errors, handleRegister };
}