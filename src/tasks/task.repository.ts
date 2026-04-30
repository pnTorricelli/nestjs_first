import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-tank.dto"
import { TaskStatus } from "./task-status.enum";
import { UpdateTaskDto } from "./dto/update-tank.dto"
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TaskRepository {
    constructor(@InjectRepository(Task)
    private taskRepository: Repository<Task>) { }

    async getAll(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.taskRepository.createQueryBuilder("task");

        if (status) {
            query.andWhere("task.status = :status", { status });
        }

        if (search) {
            query.andWhere(
                "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
                { search: `%${search}%` }
            );
        }

        return query.getMany();
    }

    async getTaskById(id: number): Promise<Task|null> {
        const found = await this.taskRepository.findOneBy({ id });
        return found
    }

    async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = CreateTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN
        })
        await this.taskRepository.save(task)
        return task;
    }

    async update(task: Task, UpdateTaskDto: UpdateTaskDto): Promise<Task> {
        Object.assign(task, UpdateTaskDto);
        await this.taskRepository.save(task);
        return task
    }
    async deleteTask(id: number): Promise<boolean> {
        const taskToDelete = await this.taskRepository.delete(id);
        return taskToDelete.affected !== 0
    }
}