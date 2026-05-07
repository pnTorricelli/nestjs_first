import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Task } from "./task.entity";
import { CreateTaskDto } from './dto/create-tank.dto';
import { TaskRepository } from './task.repository';
import { UpdateTaskDto } from "./dto/update-tank.dto"
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';
@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository
  ) { }

  getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const task= this.taskRepository.getAll(filterDto, user);
    if(task === undefined) {
      throw new InternalServerErrorException()};
    return task;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id, user);
    if (!found) throw new NotFoundException("Task non trovato");
    return found
  }

  createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto, user);
  }

  async updateTask(id: number, UpdateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    const taskUpdated = await this.taskRepository.update(task, UpdateTaskDto);
    return taskUpdated;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const deleted = await this.taskRepository.deleteTask(id,user);
    if (!deleted) {
      throw new NotFoundException("Task non trovato");
    }
  }

}
