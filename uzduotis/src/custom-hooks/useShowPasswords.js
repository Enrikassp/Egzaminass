import { useState } from "react";

export default function useShowPasswords() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setRepeatedShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowRepeatedPassword = () =>
    setRepeatedShowPassword((show) => !show);

  const handleMouseDownRepeatedPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpRepeatedPassword = (event) => {
    event.preventDefault();
  };

  return {
    showPassword,
    showRepeatedPassword,
    handleClickShowPassword,
    handleClickShowRepeatedPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    handleMouseDownRepeatedPassword,
    handleMouseUpRepeatedPassword,
  };
}