import { OmitType } from "@nestjs/mapped-types";
import{ AuthCredentialsDto} from "./auth-credentials.dto"

export  class FindUserDto extends OmitType(AuthCredentialsDto,["password"] as const) {}
