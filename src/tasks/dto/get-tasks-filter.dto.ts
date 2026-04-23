import { IsEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus, { message: 'Lo status deve essere OPEN, IN_PROGRESS o DONE' })
    status?: TaskStatus;
    @IsOptional()
    @IsString({ message: 'La stringa di ricerca deve essere una stringa' })
    search?: string;
}
