import { Button, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useRegister from "../custom-hooks/useRegister";
import useShowPasswords from "../custom-hooks/useShowPasswords";

export default function Register() {
  const { handleRegister, errors } = useRegister();
  const {
    showPassword,
    showRepeatedPassword,
    handleClickShowPassword,
    handleClickShowRepeatedPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    handleMouseDownRepeatedPassword,
    handleMouseUpRepeatedPassword,
  } = useShowPasswords();

  return (
    <main className="bg-slate-200 flex flex-col justify-center place-items-center h-[100vh] select-none">
      <div className="bg-white rounded p-8 shadow-md">
        <RegisterHeader />

        <form
          className="flex flex-col gap-2 w-[400px]"
          onSubmit={handleRegister}
        >
          <TextField
            error={!!errors.username}
            helperText={errors.username}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            fullWidth
          />
          <TextField
            error={!!errors.email}
            helperText={errors.email}
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password}
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

          <TextField
            variant="outlined"
            error={!!errors.repeatedPassword}
            helperText={errors.repeatedPassword}
            id="repeatedPassword"
            type={showRepeatedPassword ? "text" : "password"}
            fullWidth
            name="repeatedPassword"
            label="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showRepeatedPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowRepeatedPassword}
                    onMouseDown={handleMouseDownRepeatedPassword}
                    onMouseUp={handleMouseUpRepeatedPassword}
                    edge="end"
                  >
                    {showRepeatedPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" type="submit" fullWidth>
            Register In
          </Button>
        </form>

        <RegisterFooter />
      </div>
    </main>
  );
}

function RegisterHeader() {
  return (
    <div className="mb-5">
      <h2 className="font-bold text-2xl">Registration</h2>
      <p className="text-[#979797]">Register your new account...</p>
    </div>
  );
}

function RegisterFooter() {
  return (
    <div className="text-center mt-4">
      <p>
        Already have an account?
        <a className="font-semibold cursor-pointer ml-1" href="/login">
          Click here to login...
        </a>
      </p>
    </div>
  );
}