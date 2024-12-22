import { HOME_PATH, TIME_TRACKING } from "../../routes/path";
// import tasks from '../../../assets/tasks.png';
// import timer from '../../../assets/timer.png';
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
export const navOptions = [
  {
    id: 1,
    path: HOME_PATH,
    title: "Tasks",
    icon: (
      <TaskOutlinedIcon
        variant="true"
        style={{ fontSize: 16, color: "white" }}
        className="transition-transform duration-300 group-hover:scale-110"
      />
    ),
  },
  {
    id: 2,
    path: TIME_TRACKING,
    title: "Time Tracking",
    icon: (
      <TimerOutlinedIcon
        style={{ fontSize: 16, color: "white" }}
        className="transition-transform duration-300 group-hover:scale-110"
      />
    ),
  },
];
