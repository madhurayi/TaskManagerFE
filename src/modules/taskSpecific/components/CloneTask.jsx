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
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { priorities } from "../../tasks/utils/priorities";
import { axiosInstance } from "../../../api/axiosConfig";
import { statusOptions } from "../../tasks/utils/statusOptions";

export const CloneTask = ({
  open,
  onClose,
  selectedTaskObj,
  setTaskCloned,
}) => {
  const [description, setDescription] = useState(selectedTaskObj?.description);
  const [assignTo, setAssignTo] = useState(selectedTaskObj?.assignedto);
  const [priority, setPriority] = useState(selectedTaskObj?.priority);
  const [title, setTitle] = useState(selectedTaskObj?.title);
  const [taskDate, setTaskDate] = useState(selectedTaskObj?.duedate);
  const [allEmployees, setAllEmployees] = useState();

  const resetForm = () => { };

  const handleSave = async (event) => {
    event.preventDefault();
    const empId = allEmployees.find((emp) => emp.empName === assignTo);
    const unAssignedId = allEmployees.find(
      (emp) => emp.empName === "Unassigned"
    );
    const clonedTask = {
      title: title ?? selectedTaskObj?.title,
      description: description ?? selectedTaskObj?.description,
      assignedto: empId.empId ?? unAssignedId,
      priority: priority ?? selectedTaskObj?.priority,
      duedate: taskDate ?? selectedTaskObj?.duedate,
      status: selectedTaskObj?.status ?? statusOptions[0].value,
    };
    await axiosInstance.post("/task", clonedTask);

    setTaskCloned((prev) => !prev);
    resetForm();
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get("/task/newTaskNumber");
        const allEmps = await axiosInstance.get("/employee");
        setAllEmployees(allEmps.data);
      } catch { /* empty */ }
    };
    fetchData();
  }, [open]);

  return (
    <div className=" ">
      <div className="new flex flex-row-reverse p-2 ">
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
            Clone Task
            <IconButton
              aria-label="close"
              onClick={onClose}
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
                    value={selectedTaskObj?.tasknumber}
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
                    value={title ?? selectedTaskObj?.title}
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
                    value={assignTo ?? selectedTaskObj?.assignedto}
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
                    value={priority ?? selectedTaskObj?.priority}
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
                value={description ?? selectedTaskObj?.description}
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
              onClick={onClose}
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
