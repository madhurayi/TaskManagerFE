import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TimeTrackingFilter } from "./components/TimeTrackingFilter";
import { StartTImer } from "./components/StartTImer";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "../dashboard/components/Sidebar";

export const TimeTracking = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (event) => {
    event.preventDefault();

  };
  return (
    <div className="w-full  h-screen flex flex-col ">
      <div className=" bg-slate-100 h-14 z-10 w-full ">
        <FontAwesomeIcon
          icon={openMenu ? faXmark : faBars}
          onClick={() => setOpenMenu((prev) => !prev)}
          className="text-black h-6 w-6 sm:hidden p-3"
        />

        {openMenu && <Sidebar />}
      </div>
      <div className="   ">
        <div className=" h-[70px] border-gray-100 border-y-[1px] justify-between flex flex-row">
          <div className="rounded-2xl p-5 m-1 font-bold">
            <Typography sx={{ font: 20, fontSize: 20 }}>
              All Timesheet
            </Typography>
          </div>
          <div className=" flex flex-row">
            <StartTImer />
            <div className="mt-4 ">
              <Button
                onClick={handleClickOpen}
                size="sm"
                color="success"
                variant="contained"
              >
                Log Time
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
                      <div className="mx-2">
                        <Typography className="mb-4 ">Date</Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
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
                      <div className="mx-2 ">
                        <Typography className="mb-2 ">Task</Typography>
                        <TextField
                          required
                          variant="outlined"
                          size="small"
                          disabled
                        />
                      </div>
                      <div className="mx-2">
                        <Typography className="mb-4 ">Time Spent</Typography>
                        <TextField
                          autoFocus
                          required
                          variant="outlined"
                          className="mb-4"
                          size="small"
                        />
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
            <div className="help  m-3  items-center align-middle ">
              <IconButton
                aria-label="more"
                aria-haspopup="true"
                aria-controls="long-menu"
                sx={{}}
              >
                <MoreHorizIcon />
              </IconButton>
            </div>
            <div className="help bg-orange-400 py-[8px] px-[10px] my-3 rounded-md items-center align-middle  ">
              <QuestionMarkIcon sx={{ color: "white", fontSize: 20 }} />
            </div>
          </div>
        </div>
        <div>
          <div className="filters bg-white">
            <TimeTrackingFilter />
          </div>
          <TableContainer
            component={Paper}
            style={{ maxHeight: "450px", overflow: "auto" }}
          >
            <Table
              stickyHeader
              aria-label="task table"
              style={{ minWidth: 600, tableLayout: "fixed" }}
            >
              <TableHead>
                <TableRow
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#d9d9d9",
                    fontWeight: "bold",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      inputProps={{
                        "aria-label": "select all tasks",
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#1a1a1a" }}>DATE</TableCell>
                  <TableCell>TASK</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{/* <Timesheet /> */}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
