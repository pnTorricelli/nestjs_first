import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: Math.random().toString(),
      title,
      description,
      status: "OPEN",
    };
    this.tasks.push(task);
    return task;
  }
}
