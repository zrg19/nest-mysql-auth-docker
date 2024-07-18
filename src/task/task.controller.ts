import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/typeorm/entities/Task';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
    private logger = new Logger(TaskController.name);
    constructor(private tasksService: TaskService, private usersService: UsersService) {}

    @Get() 
    getTasks(@Query(ValidationPipe) tasksFilterDto: GetTasksFilterDto, @Req() req){
        this.logger.verbose(`User "${req.user.username}" retrieving all tasks. Filters: ${JSON.stringify(tasksFilterDto)}`);
        return this.tasksService.getTasks(tasksFilterDto, req.user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
        this.logger.verbose(`User "${req.user.username}" create new task. Filters: ${JSON.stringify(createTaskDto)}`);
        const user =  await this.usersService.findById(req.user.userId);
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number, @Req() req): Promise<Task> {
      return this.tasksService.getTaskById(id, req.user);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Req() req
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, req.user)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number, @Req() req) {
      if (this.tasksService.deleteTask(id, req.user)) {
        return { message: 'Task deleted successfully' };
      } else {
        return { message: 'Task not deleted' };
      }
    }
}
