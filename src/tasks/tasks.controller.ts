import { Body, Controller, Get, Post, Param, Delete, Patch, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-tank.dto';
import { UpdateTaskDto } from "./dto/update-tank.dto"
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get(":id")
  getTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Patch(":id")
  updateTask(@Param("id", ParseIntPipe) id: number, @Body() UpdateTaskDto: UpdateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.updateTask(id, UpdateTaskDto, user);
  }

  @Delete(":id")
  deleteTask(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): void {
    this.tasksService.deleteTask(id, user);
  }
}
