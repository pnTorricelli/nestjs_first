import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcript from "bcrypt";
@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository) { }


    async singUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialDto);
    }

    async singIn(authCredentialDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.usersRepository.findOne({ username });

        if (!user) { throw new NotFoundException("non esiste nessun utente con questo nome") }
        else {
            
            if (await bcript.compare(password, user.password))
                return "Success";
            else
                throw new UnauthorizedException("Controlla le tue credenziali di logins");
        }
    }
}
