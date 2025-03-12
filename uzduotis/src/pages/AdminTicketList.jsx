import { Chip, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material"
import { useEffect, useState } from "react"

export default function AdminTicketList() {
    const [userTickets, setUserTickets] = useState(null)
   useEffect(() => {
    async function getUserOwnedTickets() {
        const promise = await fetch('/server/api/ticket/', {     
            method: "GET",
        })

        const data = await promise.json()
        console.log(data)
        setUserTickets(data)
    }
    getUserOwnedTickets()
   }, []) 

   function getStatusInLithuanian(status) {
    if (status === 'active') {
        return {name: 'Pateiktas', color: 'info'}
    } else if (status === 'pending') {
        return {name: 'Svarstomas', color: 'warning'}
    } else if (status === 'completed') {
        return {name: 'Išspręstas', color:'success'}
    }
    }
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
      setStatus(event.target.value);
    };
  
   return (
    <div className="flex gap-5 flex-wrap">
        {userTickets === null ? (
            <span>There is no tickets or it may be loading...!</span>
        ) : (

            userTickets.map((ticket, index) => {
                const getStatus = getStatusInLithuanian(ticket.status)
                return (
                    <Paper key={`${ticket.question}-${index}`} className="min-w-[320px] max-w-[320px] p-2 flex flex-col gap-3">
                        <div className="flex flex-row gap-5">
                            <h1 className="font-semibold">{ticket.question}</h1> 
                            <Chip label={getStatus.name} variant="outlined" color={getStatus.color}/>
                        </div>
            
        
                        <h1>Question answers:</h1>
                        <hr />
                        <ul>
                            <li>{ticket.answers}</li>
                        </ul>

                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Change status</InputLabel>
                        <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Change Status"
                        onChange={handleChange}
                        >
                        <MenuItem value='active'>Pateiktas</MenuItem>
                        <MenuItem value='pending'>Svarstomas</MenuItem>
                        <MenuItem value='completed'>Išspręstas</MenuItem>
                        </Select>
                        </FormControl>
                    </Paper>
                )
            }
            )
        )}
    </div>

   ) 
}