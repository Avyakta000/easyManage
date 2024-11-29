const prisma = require("../db/prisma.js");
const { calculateAverageCompletionTime, calculateTaskTimes} = require("../utils/taskStats.js");

// get tasks
exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy, sortOrder } = req.query;

    const where = {
      userId: req.user.id, // Ensure tasks belong to the logged-in user
      ...(status && { status }),
      ...(priority && { priority: Number(priority) }),
    };
    console.log(where, "where");
    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        [sortBy || "startTime"]: sortOrder || "desc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    //   return res.status(500).json({ message:  });
    next(new Error("Error retrieving tasks"));
  }
};

// create task
exports.createTask = async (req, res, next) => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    // Validate priority
    if (priority < 1 || priority > 5) {
      res.status(400);
      throw new Error("Priority must be between 1 and 5");
    }

    const userId = req.user.id; // Assuming JWT token gives the userId

    const newTask = await prisma.task.create({
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        priority,
        status,
        userId, // Relating task to the user
      },
    });

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    next(new Error("Error creating task"));
  }
};

// update task
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, priority, status, startTime, endTime } = req.body;


    // Validate priority
    if (priority && (priority < 1 || priority > 5)) {
      res.status(400);
      throw new Error("Priority must be between 1 and 5");
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        priority,
        status,
        startTime: new Date(startTime), 
        endTime: new Date(endTime),
      },
    });

    return res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// delete task
exports.deleteTasks = async (req, res, next) => {
  try {
    const { taskIds } = req.body; // Expecting an array of task IDs
    console.log(taskIds, req.body, 'req')
    if (!taskIds || taskIds.length === 0) {
      res.status(400);
      throw new Error("No task IDs provided");
    }

    // delete multiple tasks
    const result = await prisma.task.deleteMany({
      where: {
        id: {
          in: taskIds, // this will delete all tasks with IDs in the taskIds array
        },
      },
    });

    if (result.count === 0) {
      res.status(404);
      throw new Error("No tasks found with provided IDs");
    }

    return res.status(200).json({ message: `${result.count} task(s) deleted successfully` });
  } catch (error) {
    console.error(error);
    next(new Error("Error deleting tasks"));
  }
};

// dashboard Statistics
exports.getDashboardStats = async (req, res, next) => {
  try {
    // total number of tasks
    const totalTasks = await prisma.task.count({
      where: { userId: req.user.id },
    });

    // pompleted tasks
    const completedTasks = await prisma.task.count({
      where: { userId: req.user.id, status: "FINISHED" },
    });

    // pending tasks
    const pendingTasks = totalTasks - completedTasks;

    // calculate percentage of completed and pending tasks
    const completedPercentage =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;
    const pendingPercentage =
      totalTasks > 0 ? ((pendingTasks / totalTasks) * 100).toFixed(2) : 0;

    // fetch all pending tasks
    const pendingTasksList = await prisma.task.findMany({
      where: { userId: req.user.id, status: "PENDING" },
    });

    // fetch all completed tasks to calculate average completion time
    const completedTaskList = await prisma.task.findMany({
      where: { userId: req.user.id, status: "FINISHED" },
    });

    // get task statistics (time lapsed, estimated time left, priority-based times)
    const {
      timeLapsed,
      estimatedTimeLeft,
      priorityTimeLapsed,
      priorityTimeLeft,
    } = calculateTaskTimes(pendingTasksList);

    // get average completion time for completed tasks
    const averageCompletionTime =
      calculateAverageCompletionTime(completedTaskList);

    // return the response with all calculated statistics
    return res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completedPercentage,
      pendingPercentage,
      timeLapsed: timeLapsed.toFixed(2), // rounded to 2 decimals
      estimatedTimeLeft: estimatedTimeLeft.toFixed(2),
      priorityTimeLapsed,
      priorityTimeLeft,
      averageCompletionTime,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
