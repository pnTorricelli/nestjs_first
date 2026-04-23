import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    
    @IsNotEmpty({ message: 'Il titolo è obbligatorio' })
    @IsString({ message: 'Il titolo deve essere una stringa' })
    title!: string;


    @IsNotEmpty({ message: 'La descrizione è obbligatoria' })
    @IsString({ message: 'La descrizione deve essere una stringa' })
    description!: string;
}