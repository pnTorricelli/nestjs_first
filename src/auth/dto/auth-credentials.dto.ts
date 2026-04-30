import { IsNotEmpty,IsPassportNumber,IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsNotEmpty({message:"Il nome utente è obbligatori"})
    @IsString({message:"Il nome utente deve essere una stringa"})
    @MinLength(2,{message:"Il nome utente deve essere lungo almeno 2 caratteri"})
    @MaxLength(10,{message:"Il nome utente non deve superare i 10 caratteri"})
    username!:string;
    @IsNotEmpty({message:"La password è obbligatori"})
    @IsString({message:"La password deve essere una stringa"})
    @IsStrongPassword({minLength:2,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1},{message:"Password troppo debole"})
    password!:string
}