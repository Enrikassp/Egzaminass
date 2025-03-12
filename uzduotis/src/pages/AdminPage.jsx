import { useState } from "react"
import AdminTicketList from "./AdminTicketList"
import { Button } from "@mui/material"

export default function AdminPage() {
    const [showTickets, setShowTickets] = useState(false)
    return <div className="flex flex-col">
        <div className="w-full mb-5 flex flex-row gap-2">
            <Button variant="contained" onClick={() => {
                setShowTickets(true)
            }}>Get tickets</Button>
        </div>

        {showTickets && (
            <AdminTicketList/>
        )}
    </div>
}