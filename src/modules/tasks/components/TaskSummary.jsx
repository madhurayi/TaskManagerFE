import { Box, Paper, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
export const TaskSummary = ({ taskList }) => {
  const taskData = taskList;
  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  // Initialize counters
  const metrics = {
    totalTasks: taskData?.length,
    overdueTasks: 0,
    dueTodayTasks: 0,
    inProgressTasks: 0,
    yetToStartTasks: 0,
    priorityToday: 0,
    unassignedTasks: 0,
  };

  // Calculate metrics
  taskData.length>0 ? taskData?.forEach((task) => {
    const taskDate = task.duedate
      ? new Date(task.duedate).toISOString().split("T")[0]
      : null;
    // Overdue Tasks
    if (taskDate && taskDate < today) metrics.overdueTasks++;

    // Due Today Tasks
    if (taskDate === today) metrics.dueTodayTasks++;

    // Status-based metrics
    if (task.status === "In Progress") metrics.inProgressTasks++;
    if (task.status === "Yet To Start") metrics.yetToStartTasks++;

    // Priority Today
    if (
      taskDate === today &&
      ["High", "Medium", "Blocker"].includes(task.priority)
    ) {
      metrics.priorityToday++;
    }

    // Unassigned Tasks
    if (task.assignedto === "Unassigned") metrics.unassignedTasks++;
  }) : "";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="grey.100"
      borderRadius={2}
      p={1}
      gap={1}
    // boxShadow={1}
    >
      {/* Overdue Tasks */}
      {/* <Box display="flex" alignItems="center" sx={{backgroundColor:"green"}}> */}
      <div className="flex lg:flex-row gap-5 max-[1035px]:flex-col lg:gap-9 ">
        <div className="flex flex-row gap-5 md:gap-9">
          <Box ml={2} textAlign="center">
            <div className="bg-white m-5">
              <WarningIcon sx={{ borderRadius: 4 }} color="error" />
            </div>
          </Box>

          {/* over Due Tasks */}
          <Box textAlign="center" >
            <Typography variant="h6" color="error" fontWeight="bold">
              {metrics.overdueTasks}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Overdue Tasks
            </Typography>
          </Box>
          {/* Due Today */}
          <Box textAlign="center">
            <Typography variant="h6" color="textPrimary" fontWeight="bold">
              {metrics.dueTodayTasks}
            </Typography>
            <div className="flex flex-row items-center gap-1">
              <div className="w-[3px] h-[12px] bg-orange-400 rounded-full" />
              <Typography variant="body2" color="textSecondary">
                Due Today
              </Typography>
            </div>
          </Box>
        </div>
        <div className="flex flex-row gap-5 md:gap-9">
          {/* Priority Today */}
          <Box textAlign="center" >
            <Typography variant="h6" color="textPrimary" fontWeight="bold">
              {metrics.priorityToday}
            </Typography>
            <div className="flex flex-row items-center gap-1">
              <div className="flex w-[3px] h-[12px] bg-orange-400 rounded-full" />
              <Typography variant="body2" color="textSecondary">
                Priority Today
              </Typography>
            </div>
          </Box>

          {/* Yet To Start */}
          <Box textAlign="center" >
            <Typography variant="h6" fontWeight="bold">
              {metrics.yetToStartTasks}
            </Typography>
            <div className="flex flex-row items-center gap-1">
              <div className="w-[3px] h-[12px] bg-blue-900 rounded-full" />
              <Typography variant="body2" color="textSecondary">
                Yet To Start
              </Typography>
            </div>
          </Box>

          {/* In Progress */}
          <Box textAlign="center" >
            <Typography variant="h6" fontWeight="bold">
              {metrics.inProgressTasks}
            </Typography>
            <div className="flex flex-row items-center gap-1">
              <div className="w-[3px] h-[12px] bg-orange-400 rounded-full" />
              <Typography variant="body2" color="textSecondary">
                In Progress
              </Typography>
            </div>
          </Box>
        </div>
      </div>
      {/* Unassigned */}
      <Paper
        elevation={3}
        sx={{
          p: 0.5,
          borderRadius: 2,
          textAlign: "center",
          minWidth: 80,
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" color="textPrimary" fontWeight="bold">
          {metrics.unassignedTasks}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Unassigned
        </Typography>
      </Paper>
    </Box>
  );
};
