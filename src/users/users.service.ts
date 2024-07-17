import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/typeorm/repositories/user.respository';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
    constructor(private readonly userRespository: UserRepository){}

    findUsers() {
        return this.userRespository.find();
    }

    async createUser(userDetails: CreateUserParams) {
        
        try {
            userDetails.password = await bcrypt.hash(userDetails.password, 12);
            const newUser =  this.userRespository.create({
                ...userDetails,
                createdAt: new Date(),
            });
            const user = await  this.userRespository.save(newUser);
            delete user.password;
            return user;
        } catch (error) {
            if (error?.errno == 1062) 
                throw new BadRequestException(error.sqlMessage)
            else 
                throw new BadRequestException("Invalid Request")
        }
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRespository.update({ id }, { ...updateUserDetails });
    }

    deleteUser(id: number) {
        return this.userRespository.delete({ id });
    }
}
