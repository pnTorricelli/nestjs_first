import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-tank.dto';
import { UpdateTaskDto } from './dto/update-tank.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  };

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(":id")
  getTaskById(@Param("id") id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }
  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() UpdateTaskDto: UpdateTaskDto): Task | undefined {
    return this.tasksService.update(id, UpdateTaskDto);
  }
  @Delete(":id")
  deleteTask(@Param("id") id: string): void {
    this.tasksService.deleteTask(id);
  }
}
