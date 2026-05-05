import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { FindUserDto } from "./dto/findUser.dto";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>) { }


    async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const  salt = await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password,salt);
        const user =  this.usersRepository.create({
            username,
            password:hashedPassword
        })
        console.log("HASH",hashedPassword)
        try {
             await this.usersRepository.save(user);
        } catch (error:any) {
            console.log("Codice errore",error.code)
            if(error.code === "23505")
            throw new ConflictException("Il nome utente esiste già")//nome utente duplicato
                else
            throw new InternalServerErrorException
        }
       
    }

    async findOne(dto: FindUserDto):Promise<User|null>{
        return await this.usersRepository.findOneBy({username:dto.username})
    }
} 