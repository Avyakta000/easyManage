// taskStatsUtils.js

// Helper function to calculate time lapsed and estimated time left
const calculateTaskTimes = (tasks) => {
    let timeLapsed = 0;
    let estimatedTimeLeft = 0;
    let priorityTimeLapsed = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let priorityTimeLeft = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
    tasks.forEach((task) => {
      const currentTime = new Date();
      const taskStartTime = new Date(task.startTime);
      const taskEndTime = new Date(task.endTime);
  
      // Calculate time lapsed and estimated time left for pending tasks
      timeLapsed += Math.max(0, (currentTime - taskStartTime) / 3600000);  // in hours
      estimatedTimeLeft += Math.max(0, (taskEndTime - currentTime) / 3600000);  // in hours
  
      // Calculate time lapsed and estimated time left for each priority
      priorityTimeLapsed[task.priority] += Math.max(0, (currentTime - taskStartTime) / 3600000);
      priorityTimeLeft[task.priority] += Math.max(0, (taskEndTime - currentTime) / 3600000);
    });
  
    return { timeLapsed, estimatedTimeLeft, priorityTimeLapsed, priorityTimeLeft };
  };
  
  // Helper function to calculate average completion time of completed tasks
  const calculateAverageCompletionTime = (completedTaskList) => {
    let totalCompletionTime = 0;
    let completedTaskCount = 0;
  
    completedTaskList.forEach((task) => {
      const taskStartTime = new Date(task.startTime);
      const taskEndTime = new Date(task.endTime);
  
      // Calculate the time taken for each completed task
      const actualTimeTaken = (taskEndTime - taskStartTime) / 3600000; // in hours
      totalCompletionTime += actualTimeTaken;
      completedTaskCount++;
    });
  
    const averageCompletionTime = completedTaskCount > 0 ? (totalCompletionTime / completedTaskCount).toFixed(2) : 0;
    
    return averageCompletionTime;
  };
  
  // Export the utility functions
  module.exports = {
    calculateTaskTimes,
    calculateAverageCompletionTime
  };
  