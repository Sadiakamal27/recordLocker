import React from 'react'
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";


const AddData = ({name, setName, email, setEmail, addData}) =>{
  return(
<div className="form">
        <Stack direction="row" spacing={2}>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="outlined-basic"
            label="name"
            variant="outlined"
          />
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="outlined-basic"
            label="email"
            variant="outlined"
          />
          <Button onClick={addData} variant="contained" color="success">
            <AddIcon />
          </Button>
        </Stack>
      </div>
  )

}

export default AddData