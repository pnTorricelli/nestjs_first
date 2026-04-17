import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-tank.dto';
import { UpdateTaskDto } from './dto/update-tank.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {

    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    console.log("Task created:", this.tasks);
    return task;
  }

  update(id: string, UpdateTaskDto: UpdateTaskDto): Task | undefined {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return undefined;
    const { title, description, status } = UpdateTaskDto;
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
