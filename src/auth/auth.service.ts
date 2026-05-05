import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrYpt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository,private jwtService:JwtService) { }


    async singUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return await this.usersRepository.createUser(authCredentialDto);
    }

    async singIn(authCredentialDto: AuthCredentialsDto): Promise< {accessToken : string} > {
        const { username, password } = authCredentialDto;
        const user = await this.usersRepository.findOne({ username });

        if (!user) { throw new NotFoundException("non esiste nessun utente con questo nome") }
        else {
            
            if (await bcrYpt.compare(password, user.password)){
                const payload:JwtPayload = {username};
                const accessToken = this.jwtService.sign(payload);
                return {accessToken}
            } else
                throw new UnauthorizedException("Controlla le tue credenziali di logins");
        }
    }
}
 