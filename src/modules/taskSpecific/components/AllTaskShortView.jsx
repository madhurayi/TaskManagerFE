import { Checkbox, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { priorities } from "../../tasks/utils/priorities";

export const AllTaskShortView = ({
  taskNumber,
  title,
  priority,
  duedate,
  status,
  setSelectedTaskId,
}) => {
  const [, setSearchParams] = useSearchParams();
  const handleClickOnTask = () => {
    setSelectedTaskId(taskNumber);
    setSearchParams({ task: taskNumber });
  };
  const formattedDueDate = duedate
    ? dayjs(duedate).format("DD/MM/YYYY")
    : "N/A";
  return (
    <div
      className="pl-2 font-serif  border-gray-100 border-y-[1px] flex flex-row gap-2 hover:bg-slate-100 cursor-pointer "
      onClick={handleClickOnTask}
    >
      <div className="checkbox pb-1 ">
        <Checkbox
          color="primary"
          size="small"
          inputProps={{
            "aria-label": "select all tasks",
          }}
        />
      </div>
      <div className="task flex flex-col py-2 flex-grow">
        <div>
          <Typography className="w-40" sx={{ fontWeight: "bold" }}>
            {title?.toUpperCase()}
          </Typography>
        </div>
        <div>
          <Typography className="w-40 " sx={{ fontSize: 16, color: "#404040" }}>
            {status}
          </Typography>
        </div>
        <div className="task flex flex-row justify-start items-start gap-1  ">
          <div className="flex w-40 border-gray-200  border-r-[2px] ">
          <div className="font-light text-sm">Due Date: {formattedDueDate} </div>
          </div>
          <div className="flex-col p-1 w-40 text-sm font-light">
            {priorities.find(p => p.name === priority)?.icon || priority}{" "} {priority}
            </div>
        </div>
      </div>
    </div>
  );
};
