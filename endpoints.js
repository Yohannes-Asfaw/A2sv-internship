const express = require('express');
const Task = require('./model');

const router = express.Router();

router.post('/tasks', async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const newTask = await Task.create({ title, description, dueDate });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
   
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});

router.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, dueDate } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, dueDate }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});


router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;
