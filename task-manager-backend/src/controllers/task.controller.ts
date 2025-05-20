import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model";

// Utils
const isValidObjectId = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, priorityLevel, status } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Name is required and must be a string" });
  }

  try {
    const task = await Task.create({
      name,
      description: description || "",
      priorityLevel,
      status,
      user: req.userId,
    });

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ------ 1. read + sanitize query params ------
    const page  = Math.max(1, Number(req.query.page)  || 1);   // at least 1
    const limit = Math.max(1, Number(req.query.limit) || 10);  // at least 1
    const skip  = (page - 1) * limit;

    // ------ 2. query DB ------
    const [tasks, total] = await Promise.all([
      Task.find({ user: req.userId })
          .sort({ createdAt: -1 })   // newest first (optional)
          .skip(skip)
          .limit(limit),
      Task.countDocuments({ user: req.userId }),
    ]);

    // ------ 3. build paging metadata ------
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, description, priorityLevel, status } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  if (!name && !description && !priorityLevel && !status) {
    return res.status(400).json({
      message: "At least one field (name, description, priorityLevel, status) must be provided for update",
    });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { name, description, priorityLevel, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskPriority = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { priorityLevel } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  if (!priorityLevel) {
    return res.status(400).json({ message: "Priority level is required" });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { priorityLevel },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.userId });

    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
