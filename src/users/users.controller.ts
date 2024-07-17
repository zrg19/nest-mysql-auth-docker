import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser({...createUserDto})
    }

    @Put(':id')
    async updateByUserId(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto
    ) {
        await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteByUserId(
        @Param('id', ParseIntPipe) id: number
    ) {
        await this.userService.deleteUser(id);
    }
}
