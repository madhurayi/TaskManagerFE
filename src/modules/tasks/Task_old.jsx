import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Filter } from "./components/Filter";
import { NewTask } from "./components/NewTask";
import { TaskListCard } from "./components/TaskListCard";
import { TaskSummary } from "./components/TaskSummary";
import { useEffect, useState } from "react";
import { AllTaskShortView } from "../taskSpecific/components/AllTaskShortView";
import CloseIcon from "@mui/icons-material/Close";
import { statusOptions } from "./utils/statusOptions";
import { LogTime } from "../taskSpecific/components/LogTime";
import dayjs from "dayjs";
import { TimeSheet } from "./components/TimeSheet";
import { MoreVerticalIconView } from "../taskSpecific/components/MoreVerticalIconView";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfig";
import { Sidebar } from "../dashboard/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { priorities } from "./utils/priorities";

export const Task = () => {
  const statusOptionsList = [
    { id: 0, value: "Select Status", label: "Select Status" },
    ...statusOptions,
  ];
  const [taskList, setTaskList] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [isTaskSelected, setIsTaskSelected] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskObj, setSelectedTaskObj] = useState({});
  const [logTimeEntries, setLogTimeEntries] = useState({});
  const [allEmployees, setAllEmployees] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusChange, setStatusChange] = useState(selectedTaskObj?.status);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [openMenu, setOpenMenu] = useState(false);

  const handleStatusChange = async (event) => {
    const taskId =
      searchParams.get("task") ?? selectedTaskObj.tasknumber ?? selectedTaskId;
    await axiosInstance.patch(
      `task/changestatus/${taskId}`,
      event.target.value
    );
    setStatusChange(event.target.value);
    setTaskUpdated((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/task");
        setTaskList(response?.data);
        setFilteredTaskList(response?.data);

        const allEmps = await axiosInstance.get("/employee");
        setAllEmployees(allEmps.data);

        if (searchParams.has("task") && response?.data?.length) {
          const taskNoFrmUrl = searchParams.get("task");
          const fetchTaskFrmUrl = response?.data?.find(
            (task) => task.tasknumber == taskNoFrmUrl
          );
          setSelectedTaskObj(fetchTaskFrmUrl);
          const emp = allEmployees?.find(
            (emp) => fetchTaskFrmUrl?.empId === emp.empId
          ).empName;
          setSelectedEmployee(emp);
          const logentriesRes = await axiosInstance.get(
            `/logentries/${fetchTaskFrmUrl.tasknumber}`
          );
          setLogTimeEntries(logentriesRes);
        }
      } catch { /* empty */ }
    };

    fetchData();
  }, [taskUpdated, searchParams]);

  useEffect(() => {
    const fetchSelectedTaskDetails = async () => {
      if (!selectedTaskId || !filteredTaskList) return;
      const res = filteredTaskList.find(
        (task) => task.tasknumber === selectedTaskId
      );
      setSelectedTaskObj(res);
    };
    fetchSelectedTaskDetails();
  }, [selectedTaskId, filteredTaskList]);

  useEffect(() => {
    const fetch = async () => {
      const st = "Select Status";
      const pt = "Select priority";
      const response = await axiosInstance.get("/task");
      if (
        (!selectedPriority && selectedStatus == st) ||
        (!selectedPriority && !selectedStatus) ||
        (selectedPriority == pt && !selectedStatus) ||
        (selectedPriority == pt && selectedStatus) == st
      ) {
        setFilteredTaskList(response?.data);
        return;
      }

      if (selectedPriority == pt && selectedStatus) {
        const filteredData = response?.data?.filter(
          (task) => task.status == selectedStatus
        );
        setFilteredTaskList(filteredData);
        return;
      }
      if (selectedStatus == st && selectedPriority) {
        const filteredData = response?.data?.filter(
          (task) => task.priority === selectedPriority
        );
        setFilteredTaskList(filteredData);
        return;
      }

      if (selectedPriority && !selectedStatus) {
        const filteredData = response?.data?.filter(
          (task) => task.priority === selectedPriority
        );
        setFilteredTaskList(filteredData);
        return;
      }
      if (!selectedPriority && selectedStatus) {
        const filteredData = response?.data?.filter(
          (task) => task.status === selectedStatus
        );
        setFilteredTaskList(filteredData);
        return;
      }

      const priorityFilter = response?.data?.filter(
        (task) => task.priority === selectedPriority
      );

      const filteredData = priorityFilter?.filter(
        (task) => task.status === selectedStatus
      );
      setFilteredTaskList(filteredData);
    };
    fetch();
  }, [selectedPriority, selectedStatus]);

  const formattedDueDate = selectedTaskObj?.duedate
    ? dayjs(selectedTaskObj?.duedate).format("DD/MM/YYYY")
    : "N/A";
  return (
    <div className="w-full relative">
      <div className=" bg-slate-100 h-14 z-20 w-full ">
        <FontAwesomeIcon
          icon={openMenu ? faXmark : faBars}
          onClick={() => setOpenMenu((prev) => !prev)}
          className="text-black h-6 w-6 md:hidden p-3"
        />
        {openMenu && <div className="w-full md:hidden z-30 fixed">
          <Sidebar />
        </div>}
      </div>
      {searchParams.get("task") ? (
        <div className="flex flex-col">
          <div className="border-gray-100 border-r-[1px] h-full w-full flex md:flex-row ">
            <div className="allTasks hidden lg:flex flex-col border-gray-200 border-r-[1px] overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
              <div className="flex flex-row justify-between border-gray-100 ">
                <h1 className="font-serif p-2 m-3 text-xl">
                  All Tasks
                </h1>
                <NewTask setNewTaskAdded={setTaskUpdated} />
              </div>
              <div className="bg-white h-full mb-2 flex flex-col overflow-y-auto">
                {taskList.length > 0 ? (
                  taskList.map((data) => (
                    <AllTaskShortView
                      key={data.tasknumber}
                      taskNumber={data.tasknumber}
                      title={data.title}
                      priority={data.priority}
                      duedate={data.duedate}
                      status={data.status}
                      selectedTaskId={selectedTaskId}
                      setSelectedTaskId={setSelectedTaskId}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <span>No Tasks Available</span>
                  </div>
                )}
              </div>
            </div>
            <div className="detailedTaskView flex-grow pl-4 w-full">
              <div className="border-gray-100 border-y-[1px] justify-between flex flex-col-reverse md:flex-row">
                <div className={`${priorities.find(p => p.name === selectedTaskObj?.priority)?.bgColor} flex  items-center rounded-r-xl p-4 m-2 w-fit`}>
                  <div className="text-gray-800 text-center font-semibold">
                    {selectedTaskObj?.priority
                      ? selectedTaskObj?.priority.toUpperCase() + " PRIORITY"
                      : null}
                  </div>
                </div>
                <div className=" flex flex-row justify-between items-center">
                  <div className="flex gap-5 md:gap-2">
                    <div>
                      <LogTime
                        selectedTaskObj={selectedTaskObj}
                        setLogTimeEntries={setLogTimeEntries}
                      />
                    </div>
                    <div className="changeStatus mt-4 ml-1">
                      <Select
                        sx={{ backgroundColor: "green", color: "white" }}
                        id="status"
                        placeholder="Select Status"
                        value={
                          statusChange ??
                          selectedTaskObj?.status ??
                          statusOptionsList[0].value
                        }
                        onChange={handleStatusChange}
                        className="min-w-36 h-10"
                      >
                        {statusOptionsList.map((status) => (
                          <MenuItem key={status.id} value={status.value}>
                            {status.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="menu items-center justify-center self-center mt-7">
                      <MoreVerticalIconView
                        selectedTaskObj={selectedTaskObj}
                        setTaskUpdated={setTaskUpdated}
                      />
                    </div>
                    <div
                      className="mt-4 ml-1"
                      onClick={() => {
                        setIsTaskSelected(false);
                        setSearchParams({});
                      }}
                    >
                      <IconButton
                        aria-label="close"
                        color="error"
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" h-[70px] border-gray-900 border-y-[1px] flex flex-row  ">
                <div className="flex flex-row gap-2 items-center">
                  <Typography sx={{ fontSize: 18, color: "#4d4d4d" }}>
                    {selectedTaskObj?.tasknumber}
                  </Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                    {selectedTaskObj?.title}
                  </Typography>
                  <div className="flex-1 flex justify-center text-center min-w-32">
                    {statusOptions.map(option => (
                      selectedTaskObj?.status === option.value && (
                        <div className={`flex flex-row items-center gap-1  text-white p-2 rounded-md ${option.color}`} key={option.id}>
                          {selectedTaskObj?.status}
                        </div>
                      )
                    ))}
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className=" h-1/6 border-gray-100 border-y-[1px] flex flex-row justify-start">
                <div className="flex flex-col m-4 gap-3">
                  <Typography className="w-40">Due Date:</Typography>
                  <Typography className="w-40">Assigned To:</Typography>
                </div>
                <div className="flex flex-col m-4 gap-3">
                  <Typography className="w-40 ">{formattedDueDate}</Typography>
                  <Typography className="w-40">{selectedEmployee}</Typography>
                </div>
              </div>
              <div className="">
                <div className="h-[40px] align-middle p-3 font-bold border-gray-100 border-y-[1px]  mx-2 py-1">
                  {" "}
                  TIMESTAMPS
                </div>
                <TableContainer
                  component={Paper}
                  style={{
                    maxHeight: "320px",
                    overflow: "auto",
                    "-::WebkitScrollbar": { display: "none" },
                  }}
                >
                  {/* [&::-webkit-scrollbar]:w-0 */}
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
                        <TableCell sx={{ color: "#1a1a1a" }}>DATE</TableCell>
                        <TableCell>USER</TableCell>
                        <TableCell>TIME</TableCell>
                        <TableCell>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TimeSheet
                        logTimeEntries={logTimeEntries ?? []}
                        selectedTaskObj={selectedTaskObj}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col h-screen" style={{ height: `calc(100vh - 56px)` }}>
          <div className="border-gray-100 border-y-[1px]">
            <div className="bg-white h-14">
              <NewTask setNewTaskAdded={setTaskUpdated} />
            </div>
            <div className="bg-gray-100 rounded-md md:mx-2">
              <TaskSummary taskList={taskList} />
            </div>
          </div>
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="filters">
              <Filter
                setSelectedPriority={setSelectedPriority}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="flex flex-col flex-grow overflow-auto">
              {/* Scrollable Container */}
              <div className="flex-1 flex-col w-full inset-0 h-full overflow-auto">
                {/* Table */}
                <div className="w-ful max-w-ful mb-2">
                  {/* Header */}
                  <div className="flex sticky z-10 bg-gray-200 font-sans text-lg text-center top-0 w-fll px-4 py-2 min-w-[910px] items-center">
                    <div className="flex-1 min-w-32">Task Number</div>
                    <div className="flex-1 min-w-32">Title</div>
                    <div className="flex-1 min-w-32">Assigned To</div>
                    <div className="flex-1 min-w-32">Priority</div>
                    <div className="flex-1 min-w-32">Due Date</div>
                    <div className="flex-1 min-w-32">Completion Percentage</div>
                    <div className="flex-1 min-w-32">Status</div>
                  </div>

                  {/* Body */}
                  {filteredTaskList?.length ? (
                    filteredTaskList.map((data, index) => (
                      <div
                        key={data.tasknumber}
                        className={`min-w-[910px] ${index % 2 === 1 ? "bg-gray-100" : "bg-white"}`}

                      >
                        <TaskListCard
                          key={data.tasknumber}
                          tasknumber={data.tasknumber}
                          title={data.title}
                          assignedto={data.empId}
                          priority={data.priority}
                          duedate={data.duedate}
                          status={data.status}
                          isTaskSelected={isTaskSelected}
                          setIsTaskSelected={setIsTaskSelected}
                          setSelectedTaskId={setSelectedTaskId}
                          allEmployees={allEmployees}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center text-center">
                      No Tasks Found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};