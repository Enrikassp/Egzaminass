import { Alert, Button, Paper, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { TicketCreateSchema } from "../utils/validations/TicketSchema";

export default function TicketCreation() {
    const [helpAnswers, setHelpAnswers] = useState([])
    const [helpAnswerInput, setHelpAnswerInput] = useState('')
    const [isSnackBarOpen, setSnackBarOpen] = useState(false);
    const [snacbarMessage, setSnacbarMessage] = useState(false);

    function handleAnswerInputChange(event) {
        setHelpAnswerInput(event.target.value)
    }

    function addHelpAnswer() {
        if (helpAnswerInput.length === 0) {
           return alert('You cant add empty answer!')
        }
        const currentAnswers = [...helpAnswers];
        currentAnswers.push(helpAnswerInput.trim());
        setHelpAnswers(currentAnswers)
        setHelpAnswerInput('')
    }

    async function createTicket(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newTicketData = {
            answers: helpAnswers,
            question: formData.get('question'),
            status: 'pending'
        }

        const validationResult = TicketCreateSchema.safeParse(newTicketData)

        if (!validationResult.success) {
            setSnackBarOpen(true);
            setSnacbarMessage(validationResult.error.issues[0].message);
            return;
        }

        setSnackBarOpen(false)
        const promise = await fetch('/server/api/ticket/', {     
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTicketData), 
        })

    if (promise.ok) {
        setHelpAnswers([])
        setHelpAnswerInput('')
        } else {
        const response = await promise.json();
    
        if (promise.status !== 400) {
            setSnacbarMessage(response.message);
            setSnackBarOpen(true);
        }
        }
    }
    
    return (
        <Paper className="p-5">
        <h1 className="font-semibold">Help Ticket creating form</h1>
        <hr className="mb-5"/>
        <form onSubmit={createTicket}>
            <TextField  
                variant="standard"
                label="Ticket question"
                name="question"
                fullWidth
            />
            <div className="flex flex-col gap-2">
                <TextField
                    variant="standard"
                    label="Help answer"
                    fullWidth
                    name="answer"
                    onChange={handleAnswerInputChange}
                    value={helpAnswerInput}
                />
                <Button variant="contained" className="w-[200px]" onClick={addHelpAnswer}>Add help answer</Button>
            </div>
            <div className="my-5">
                <h1 className="font-semibold">Help answers:</h1>
                <ul className="p-2">
                    {helpAnswers.map((answer, index) => (
                        <li key={`${answer}-${index}`}>{answer}</li>
                    ))}
                </ul>
            </div>
            <Button variant="contained" fullWidth type="submit">Submit Form</Button>
        </form>

        <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackBarOpen(setSnackBarOpen)}
      >
        <Alert
          severity="error"
          color="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snacbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
    )
}