import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useLogin from "../custom-hooks/useLogin";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const login = useLogin();

  return (
    <main className="bg-slate-200 flex flex-col justify-center place-items-center h-[100vh] select-none">
      <div className="bg-white rounded p-8 shadow-md">
        <LoginHeader />
        <form className="flex flex-col gap-2 w-[400px]" onSubmit={login}>
          <TextField
            id="outlined-basic"
            label="Username / Email"
            variant="outlined"
            name="usernameOrEmail"
            fullWidth
          />
          <TextField
            variant="outlined"
            id="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            name="password"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" type="submit" fullWidth>
            Login In
          </Button>
        </form>

        <LoginFooter />
      </div>
    </main>
  );
}

function LoginHeader() {
  return (
    <div className="mb-5">
      <h2 className="font-bold text-2xl">Login</h2>
      <p className="text-[#979797]">Login with your existing account...</p>
    </div>
  );
}

function LoginFooter() {
  return (
    <div className="text-center mt-4">
      <p>
        Dont have a account?
        <a className="font-semibold cursor-pointer ml-1" href="/register">
          Click here to register...
        </a>
      </p>
    </div>
  );
}