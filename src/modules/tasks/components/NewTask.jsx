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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { Add } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { priorities } from "../utils/priorities";
import { statusOptions } from "../utils/statusOptions";
import { axiosInstance } from "../../../api/axiosConfig";

export const NewTask = ({ setNewTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("Unassigned");
  const [priority, setPriority] = useState(priorities[0].name);
  const [taskCount, setTaskCount] = useState(0);
  const [title, setTitle] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [allEmployees, setAllEmployees] = useState();

  const handleClickOpen = () => setOpen(true);
  const resetForm = () => {
    setTaskDate(null);
    setPriority(priorities[0].name);
    setDescription("");
    setAssignTo("Unassigned");
    setTitle("");
  };
  const handleSave = async (event) => {
    event.preventDefault();
    if (title.trim() === "") {
      return;
    }
    const empId = allEmployees.find((emp) => emp.empName === assignTo);
    const unAssignedId = allEmployees.find(
      (emp) => emp.empName === "Unassigned"
    );
  
    const res = {
      title: title,
      description: description,
      assignedto: empId.empId ?? unAssignedId,
      priority: priority,
      duedate: dayjs(taskDate).format("YYYY-MM-DD"),
      status: statusOptions[0].value,
    };
    await axiosInstance.post("/task", res);
    resetForm();
    setOpen(false);
    setNewTaskAdded((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newTaskNumber = await axiosInstance.get("/task/newTaskNumber");
        setTaskCount(newTaskNumber.data);
        const allEmps = await axiosInstance.get("/employee");
        setAllEmployees(allEmps.data);
      } catch { /* empty */ }
    };
    fetchData();
  }, [open]);
  return (
    <div className=" ">
      <div className="new flex flex-row-reverse p-2 ">
        <Button
          onClick={handleClickOpen}
          size="sm"
          color="success"
          variant="contained"
          startIcon={<Add />}
        >
          New
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            component: "form",
          }}
          className="rounded-lg"
        >
          <DialogTitle className="text-center">
            New Task
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="px-4 gap-2 ">
            <Grid container className={"mb-4 px-4 "}>
              <div className="flex flex-row">
                <div className="mx-2 ">
                  <Typography className="mb-2 ">Task Number</Typography>
                  <TextField
                    required
                    variant="outlined"
                    value={taskCount}
                    size="small"
                    disabled
                  />
                </div>
                <div className="mx-2">
                  <Typography className="mb-4 ">Title</Typography>
                  <TextField
                    autoFocus
                    required
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                    size="small"
                  />
                </div>
                <div className="mx-2">
                  <Typography className="mb-4 ">Due date</Typography>
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
                  <Typography className="mb-4 ">Assign To</Typography>
                  <Select
                    id="assign-to"
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    className="min-w-52 h-10"
                  >
                    {allEmployees?.map((emp) => (
                      <MenuItem key={emp.id} value={emp.empName}>
                        {emp.empName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="mx-2">
                  <Typography className="mb-4">Priority</Typography>
                  <Select
                    id="priorities"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="min-w-52 h-10"
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
            <div className="my-2 mx-5">
              <Typography className="mb-4 ">Description</Typography>
              <TextField
                placeholder="Max. 10000 characters"
                fullWidth
                multiline
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                className="mb-4"
              />
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
              onClick={() => setOpen(false)}
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
      <div></div>
    </div>
  );
};
