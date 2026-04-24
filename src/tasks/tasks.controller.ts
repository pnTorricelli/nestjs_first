import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-tank.dto';
import {UpdateTaskDto} from "./dto/update-tank.dto"
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto ): Promise<Task[]> {
      return this.tasksService.getAllTasks(filterDto);
    }
  

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(":id")
  getTaskById(@Param("id") id:number):Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Patch(":id")
  updateTask(@Param("id") id: number, @Body() UpdateTaskDto: UpdateTaskDto):Promise<Task> {
    return this.tasksService.updateTask(id, UpdateTaskDto);
  }
  @Delete(":id")
  deleteTask(@Param("id") id: number): void {
    this.tasksService.deleteTask(id);
  }
}
