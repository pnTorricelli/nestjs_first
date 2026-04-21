import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-tank.dto';
import { UpdateTaskDto } from './dto/update-tank.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto ): Task[] {
    if(Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }else{
      return this.tasksService.getAllTasks();
    }
    
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
