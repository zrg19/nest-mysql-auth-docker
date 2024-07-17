import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login.user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // Register User
    @Post("/register")
    async resgisterUser(@Body() registerUser: RegisterUserDto) {
        return await this.authService.registerUser(registerUser);
    }

    // Authenticate User
    @Post("/login")
    async loginUser(@Body() loginUser: LoginUserDto) {
        return await this.authService.loginUser(loginUser);
    }

    // Get Logged In User
    @UseGuards(JwtAuthGuard)
    @Get("/user")
    async getUser(@Request() req){
        return await this.authService.getUser(req.user);
    }
}
