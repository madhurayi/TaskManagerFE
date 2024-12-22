import { statusOptions } from "../utils/statusOptions";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { priorities } from "../utils/priorities";

export const TaskListCard = ({
  tasknumber,
  title,
  assignedto,
  priority,
  duedate,
  status,
  setSelectedTaskId,
  allEmployees,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleTaskSelected = () => {
    setSelectedTaskId(tasknumber);
    setSearchParams({ task: tasknumber });
  };

  const progressValue =
    status === statusOptions[0].value
      ? 0
      : status === statusOptions[1].value
        ? 0.5
        : status === statusOptions[2].value
          ? 1
          : 0;

  const formattedDueDate = duedate
    ? dayjs(duedate).format("DD/MM/YYYY")
    : "N/A";
  const empId = allEmployees?.find((emp) => emp.empId === assignedto)?.empName;
  return (
    <div className="flex p-4 items-center text-base justify-center cursor-pointer" onClick={handleTaskSelected}>
      <div className="flex-1 text-center min-w-32 ">{tasknumber}</div>
      <div className="flex-1 text-center min-w-32">{title}</div>
      <div className="flex-1 text-center min-w-32 ">{empId}</div>
      <div className="flex-1 flex items-center justify-center text-center min-w-32">
        {priorities.find(p => p.name === priority)?.label || priority}
      </div>
      <div className="flex-1 text-center min-w-32 ">{formattedDueDate}</div>
      {/* progressValue */}
      <div className="flex-1 min-w-32">
        <div className="w-full h-2.5 rounded-md bg-gray-300 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-md bg-green-500"
            style={{
              width: `${progressValue * 100}%`,
            }}
          />
        </div>
      </div>
      {/* status */}
      <div className="flex-1 flex justify-center text-center min-w-32">
        {statusOptions.map(option => (
          status === option.value && (
            <div className="flex flex-row items-center gap-1" key={option.id}>
              <div className={`w-[3px] h-[12px] ${option.color} rounded-full`} />
              {status}
            </div>
          )
        ))}
      </div>
    </div>
  );
};
