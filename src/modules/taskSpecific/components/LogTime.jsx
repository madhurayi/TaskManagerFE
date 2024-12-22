import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { axiosInstance } from "../../../api/axiosConfig";

export const LogTime = ({ selectedTaskObj, setLogTimeEntries }) => {
  const [logEntryDate, setLogEntryDate] = useState(null);
  const [logEntryTimeSpent, setLogEntryTimeSpent] = useState(null);
  const [logEntryNotes, setLogEntryNotes] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);
  const resetLogTimeForm = () => {
    setLogEntryDate(null);
    setLogEntryTimeSpent(null);
    setLogEntryNotes("");
  };
  const handleLogTimeSave = async (event) => {
    event.preventDefault();
    const lastestLog = {
      logDate: dayjs(logEntryDate).format("YYYY-MM-DD"),
      logTime: dayjs(logEntryTimeSpent).format("HH") +"h "+dayjs(logEntryTimeSpent).format("MM")+"m",
      logNote: logEntryNotes,
      logEntryUserId: selectedTaskObj?.empId,
      taskNumber: selectedTaskObj?.tasknumber,
    };

    await axiosInstance.post("/logentries", lastestLog);
    const entriesRes = await axiosInstance.get(
      `/logentries/${selectedTaskObj?.tasknumber}`
    );

    setLogTimeEntries(entriesRes);
    selectedTaskObj.logTimeEntries = (selectedTaskObj.logTimeEntries || []).concat(lastestLog);
    resetLogTimeForm();
    handleClose();
  };
  return (
    <div className="mt-4 ">
      <Button
        onClick={handleClickOpen}
        size="sm"
        color="primry"
        variant="contained"
        sx={{ backgroundColor: "#f2f2f2" }}
        className="min-w-36 h-10"
      >
        Log Time
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleLogTimeSave,
        }}
        className="rounded-lg"
      >
        <DialogTitle className="text-center">
          New Log Entry
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="px-4 gap-2 ">
          <Grid container className={"mb-4 px-4 "}>
            <div className="flex flex-col">
              <div className="mx-2 ">
                <Typography className="mb-2 ">Task Number</Typography>
                <TextField
                  required
                  variant="outlined"
                  value={selectedTaskObj?.tasknumber}
                  size="small"
                  disabled
                />
              </div>
              <div className="mx-2">
                <Typography className="mb-4 ">Date</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={logEntryDate}
                    onChange={(newValue) => setLogEntryDate(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          height: "10px",
                          "& .MuiInputBase-root": {
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="mx-2">
                <Typography className="mb-4 ">Time Spent</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    views={["hours", "minuts"]}
                    format="HH:MM"
                    value={logEntryTimeSpent}
                    onChange={(newValue) => setLogEntryTimeSpent(newValue)}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Grid>
          <div className="my-2 mx-5">
            <Typography className="mb-4 ">Notes</Typography>
            <TextField
              placeholder="Add Notes"
              fullWidth
              multiline
              rows={2}
              value={logEntryNotes}
              onChange={(e) => setLogEntryNotes(e.target.value)}
              variant="outlined"
              className="mb-4"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="success">
            Save
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
  );
};
