import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/typeorm/repositories/user.respository';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dtos/register.user.dto';
import { LoginUserDto } from './dtos/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRespository: UserRepository,
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async registerUser(registerUser: RegisterUserDto) {
        return await this.usersService.createUser({...registerUser});
    }

    async loginUser(loginUser: LoginUserDto): Promise<{ access_token: string }> {
        const user = await this.userRespository.findOne({ where: {
            email: loginUser.email
        }});
        if (user === null) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(loginUser.password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async getUser(user: any) {
        const userObj: User =  await this.userRespository.findOne({
            where: {
                id: user.userId
            }
        });
        delete userObj.password;
        return userObj;
    }
}
