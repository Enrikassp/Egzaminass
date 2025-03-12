import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useSessionState } from "./custom-hooks/useSessionState";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SessionContext from "./contexts/SessionContext";

function App() {
  const mode = "light";
  const { sessionState, setSessionState } = useSessionState();
  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  document.querySelector("body").style.backgroundColor =
    darkTheme.palette.background.default;
  return (
    <ThemeProvider theme={darkTheme}>
      <SessionContext.Provider value={{ sessionState, setSessionState }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                sessionState.isLogged ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                sessionState.isLogged ? <Dashboard /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/login"
              element={
                sessionState.isLogged ? <Navigate to="/dashboard" /> : <Login />
              }
            />

            <Route
              path="/register"
              element={
                sessionState.isLogged ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Register />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </SessionContext.Provider>
    </ThemeProvider>
  );
}

export default App;