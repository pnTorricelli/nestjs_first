import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-tank.dto';
import { UpdateTaskDto } from './dto/update-tank.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {

    return this.tasks;
  }

  
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search} = filterDto;
    let tasks = this.getAllTasks();
    
    if(status){
      tasks= tasks.filter(tasks => tasks.status === status);
    }
    if(search){
      tasks = tasks.filter(task => 
        task.title.includes(search) || task.description.includes(search)
      );
    }
    return tasks
  }


  getTaskById(id: string): Task | undefined {
    const task = this.tasks.find(task => task.id === id);
    if (!task)  throw new NotFoundException(`Task with ID "${id}" not found`);
    return task;
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
