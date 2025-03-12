import { useContext } from "react";
import SessionContext from "../contexts/SessionContext";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import useLogout from "../custom-hooks/useLogout";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

export default function Dashboard() {
    const {sessionState} = useContext(SessionContext)
    const logout = useLogout()

    return (
        <main id="dashboard" className="container">
            <div className="main-grid p-5">
            <Paper className="item nav flex justify-between items-center">
                <div className="flex flex-col gap-5">
                <h1 className="font-bold text-2xl">{sessionState.isAdmin ? 'Dashboard' : 'Main page'}</h1>
                <Typography>Sign in As: {sessionState.user.username}</Typography>
                <Button onClick={logout} variant="outlined" color="error">
                    Log out
                </Button>
                </div>
            </Paper>

            {!sessionState.isAdmin ? (
                <UserPage/>
            ) : (
                <AdminPage/>
            )}
            </div>
        </main>
    );
}