import dayjs from "dayjs";
import { TableCell, TableRow } from "@mui/material";

export const TimeSheet = ({ logTimeEntries, selectedTaskObj }) => {
  const formatDueDate = (duedate) =>
    duedate ? dayjs(duedate).format("DD/MM/YYYY") : "N/A";

  const formatTimeSpent = (timespent) => {
    if (!timespent) return "N/A";
    const hours = dayjs(timespent).format("HH");
    const minutes = dayjs(timespent).format("MM");
    return `${hours}h ${minutes}m`;
  };

  if (!logTimeEntries?.data?.length) {
    return (
      <div className="flex justify-center items-center text-center font-serif border-gray-100 border-b-2 pb-1">
        <span className="mt-2 font-light font-sans">No Timestamps Found</span>
      </div>
    );
  }

  return logTimeEntries.data.map(({ logDate, logUser, logTime }, index) => (
    <div
      key={index}
      className={`min-w-[528px] ${
        index % 2 === 1 ? "bg-gray-100" : "bg-white"
      } border-gray-100 border-[1px]`}
    >
      <div className="flex p-4 items-center text-base justify-center cursor-pointer">
        <div className="flex-1 text-center min-w-32 ">
          {formatDueDate(logDate)}
        </div>
        <div className="flex-1 text-center min-w-32 ">{logUser}</div>
        <div className="flex-1 text-center min-w-32">
          {logTime}
        </div>
        <div className="flex-1 text-center min-w-32 ">
          {selectedTaskObj?.status}
        </div>
        {/* <TableRow hover key={index}>
      <TableCell align="start">{formatDueDate(logDate)}</TableCell>
      <TableCell align="start">{logUser}</TableCell>
      <TableCell align="start">{formatTimeSpent(logTime)}</TableCell>
      <TableCell align="start">{selectedTaskObj?.status}</TableCell>
    </TableRow> */}
      </div>
    </div>
  ));
};
