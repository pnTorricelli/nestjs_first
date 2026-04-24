import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from "./task.entity"
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tank.dto';
import { TaskStatus } from './task-status.enum';
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

  getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto);
  }

  updateTask(id: number, UpdateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.update(id, UpdateTaskDto);
  }

  deleteTask(id: number): void {
    this.taskRepository.deleteTask(id);
  }

}
