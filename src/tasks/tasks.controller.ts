import { Body, Controller, Get, Post, Param, Delete, Patch, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-tank.dto';
import { UpdateTaskDto } from "./dto/update-tank.dto"
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger} from "@nestjs/common";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TasksController");
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`Recupero di tutti i task di "${user.username}". Filtri: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getAllTasks(filterDto, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`L'utente ${user.username} a creato un nuovo task. Caratteristiche:${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get(":id")
  getTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`Tentativo di recuper  task con id "${id}" per l'utente ${user.username}`)
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
