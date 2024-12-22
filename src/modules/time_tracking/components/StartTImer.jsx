import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';

export const StartTImer = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div className="mt-4 mr-2">
        <Button
          onClick={handleClickOpen}
          size="sm"
          color="success"
          variant="contained"
        >
          Start
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSave,
          }}
          className="rounded-lg"
        >
          <DialogTitle className="text-center">
            <TimerIcon />
            Start Timer
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="px-4 gap-2 ">
            <div className="flex flex-col">
              <div className="mx-2 ">
                <Typography className="mb-2 ">Task</Typography>
                <TextField
                  required
                  variant="outlined"
                  // value={`TASK-${taskCount}`}
                  size="small"
                  disabled
                />
              </div>
            </div>
            <div className="my-2 mx-5">
              <Typography className="mb-4 ">Notes</Typography>
              <TextField
                placeholder="Add Notes"
                fullWidth
                multiline
                rows={2}
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                className="mb-4"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="success">
              Start Timer
            </Button>
            <Button
              onClick={handleClose}
              type="cancel"
              variant="contained"
              color="disabled"
              sx={{ backgroundColor: "#e6e6e6" }}
              className="bg-gray-400 "
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
