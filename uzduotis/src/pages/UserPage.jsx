import { Button} from "@mui/material";
import { useState } from "react";
import TicketCreation from "./TicketCreation";
import UserTickets from "./UserTickets";
import AllUserTickets from "./AllUserTicekts";

export default function UserPage() {
    const [isCreating, setIsCreating] = useState(false) 
    const [showUsersTickets, setShowUserTickets] = useState(false)
    const [showAllUsersTickets, setShowAllUserTickets] = useState(false)
    return <div className="flex flex-col">
        <div className="w-full mb-5 flex flex-row gap-2">
            <Button variant="contained" onClick={() => {
                setShowUserTickets(false)
                setIsCreating(true)
            }}>Create a help ticket</Button>
            <Button variant="contained" onClick={() => {
                setIsCreating(false)
                setShowUserTickets(true)
            }}>Get own tickets</Button>
            <Button variant="contained" onClick={() => {
                setIsCreating(false)
                setShowUserTickets(false)
                setShowAllUserTickets(true)
            }}>Show question helps</Button>
        </div>

        {isCreating && (
            <TicketCreation/>
        )}

        {showUsersTickets && (
            <UserTickets/>
        )}
        {showAllUsersTickets && (
            <AllUserTickets/>
        )}
    </div>
}