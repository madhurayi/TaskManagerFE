import Grid from "@mui/material/Grid2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { priorities } from "../../tasks/utils/priorities";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosConfig";

export const EditTask = ({ open, onClose, selectedTaskObj, setTaskEdited }) => {
  const [title, setTitle] = useState(selectedTaskObj?.title);
  const [taskDate, setTaskDate] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(
    selectedTaskObj?.empId
  );
  const [allEmployees, setAllEmployees] = useState();
  const [priority, setPriority] = useState(selectedTaskObj?.priority);

  const handleSave = async (event) => {
    event.preventDefault();
    if (title.trim() === "") {
      return;
    }
    const empId = allEmployees.find((emp) => emp.empName === selectedEmployee);
    const updatedTask = {
      ...selectedTaskObj,
      title: title ?? selectedTaskObj?.title,
      empId: empId?.empId ?? selectedTaskObj?.empId,
      priority: priority ?? selectedTaskObj?.priority,
      duedate: taskDate ?? selectedTaskObj?.duedate,
    };

    await axiosInstance.patch(
      `/task/${selectedTaskObj?.tasknumber}`,
      updatedTask
    );
    setTaskEdited((prev) => !prev);
    onClose();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmps = await axiosInstance.get("/employee");
        setAllEmployees(allEmps.data);
      } catch { /* handle error if needed */ }
    };
    fetchData();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        // onSubmit: handleSave,
      }}
      className="rounded-lg"
    >
      <DialogTitle className="text-center">
        Edit Task
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="px-4 gap-2">
        <div className="my-2 mx-7">
          <Grid container className={"mb-4 px-4"}>
            <div className="flex flex-col">
              <div className="mx-2">
                <Typography className="mb-2">Task Number</Typography>
                <TextField
                  required
                  variant="outlined"
                  value={selectedTaskObj?.tasknumber}
                  size="small"
                  disabled
                />
              </div>
              <div className="mx-2">
                <Typography className="mb-4">Title</Typography>
                <TextField
                  autoFocus
                  required
                  variant="outlined"
                  value={title ?? selectedTaskObj?.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4"
                  size="small"
                />
              </div>
              <div className="mx-2">
                <Typography className="mb-4">Due date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    views={["year", "month", "day"]}
                    value={taskDate}
                    onChange={(newValue) => setTaskDate(newValue)}
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
            </div>
            <div className="flex flex-row">
              <div className="mx-2">
                <Typography className="mb-4">Assign To</Typography>
                <Select
                  id="assign-to"
                  className="min-w-52 h-10"
                  value={selectedEmployee ?? selectedTaskObj?.empId}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  {allEmployees?.map((emp) => (
                    <MenuItem key={emp.id} value={emp?.empName}>
                      {emp.empName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="mx-2">
                <Typography className="mb-4">Priority</Typography>
                <Select
                  id="priorities"
                  className="min-w-52 h-10"
                  value={priority ?? selectedTaskObj?.priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  {priorities.map((p) => (
                    <MenuItem key={p.id} value={p.name}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
          type="cancel"
          variant="contained"
          color="inherit"
        // sx={{ backgroundColor: "#e6e6e6" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
