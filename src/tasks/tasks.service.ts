import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from "./task.entity";
import { CreateTaskDto } from './dto/create-tank.dto';
import { TaskRepository } from './task.repository';
import { UpdateTaskDto } from "./dto/update-tank.dto"
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository
  ) { }

  getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getAll(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id);
    if (!found) throw new NotFoundException("Task non trovato");
    return found
  }

  createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto);
  }

  async updateTask(id: number, UpdateTaskDto: UpdateTaskDto): Promise<Task> {
    const task= await this.getTaskById(id);
    const taskUpdated = await this.taskRepository.update(task, UpdateTaskDto);
    return taskUpdated; 
  }

  async deleteTask(id: number):Promise<void> {
    const task= await this.getTaskById(id);
      const deleted = await this.taskRepository.deleteTask(id);
  if (!deleted) {
    throw new NotFoundException("Task non trovato");
  }
  }

}
