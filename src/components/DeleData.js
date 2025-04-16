import React from 'react'
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";


const DeleData = ({ id, name, email, removeItem }) => {
    return (
        <div className="data_val">
          <h4>{name}</h4>
          <h4>{email}</h4>
          <Stack>
            <Button
              onClick={() => removeItem(id)}
              variant="contained"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </Stack>
        </div>
      );


}

export default DeleData