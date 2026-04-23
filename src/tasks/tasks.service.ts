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


  getTaskById(id: number): Task  {
    const task = this.tasks.find(task => task.id === id);
    if (!task)  throw new NotFoundException(`Il task con id ${id} non è stato trovato`);
    return task;
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: this.tasks.length +1,
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    console.log("Task created:", this.tasks);
    return task;
  }

  update(id: number, UpdateTaskDto: UpdateTaskDto): Task  {
    const task = this.getTaskById(id);
    const { title, description, status } = UpdateTaskDto;
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    return task;
  }

  deleteTask(id: number): void {
    const taskToDelete = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id);
  }
}
