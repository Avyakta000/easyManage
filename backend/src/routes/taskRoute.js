const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protectRoute } = require("../middlewares/protectRoutes.js");

// Route to create a new task
router.post('/', protectRoute, taskController.createTask);

// Route to get tasks with optional filters and sorting
router.get('/', protectRoute, taskController.getTasks);

// Route to update task status (mark as finished)
router.put('/:taskId', protectRoute, taskController.updateTaskStatus);

// Route to delete task
router.delete('/', protectRoute, taskController.deleteTasks);

// Route to get dashboard statistics
router.get('/dashboard/stats', protectRoute, taskController.getDashboardStats);

module.exports = router;
