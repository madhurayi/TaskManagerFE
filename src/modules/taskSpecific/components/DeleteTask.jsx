import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosConfig";

export const DeleteTask = ({ open, onClose, tasknumber }) => {
  const [, setSearchParams] = useSearchParams();
  const handleDeleteTask = async () => {
    await axiosInstance.delete(
      `/task?taskNumber=${tasknumber}`
    );
    setSearchParams({});
    onClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete {tasknumber}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This task cannot be reverted once deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleDeleteTask}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
