import { CreateTaskDto } from "./create-tank.dto";
import { PartialType } from "@nestjs/mapped-types";
import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
@IsOptional()
@IsEnum(TaskStatus, { message: 'Lo status deve essere OPEN, IN_PROGRESS o DONE' })
   status?:TaskStatus
}