import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Task } from 'src/typeorm/entities/Task';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User

 } from 'src/typeorm/entities/User';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
    private logger = new Logger(TaskService.name);
    private taskRepository: Repository<Task>
    constructor(private dataSource: DataSource) {
        this.taskRepository = dataSource.getRepository(Task);
    }

    async getTasks(filterDto: GetTasksFilterDto, user: any): Promise<Task[]> {

        const { status, search } = filterDto;
        const query = this.taskRepository.createQueryBuilder('tasks');
        query.where('tasks.userId = :userId', { userId: user.userId });
        if (status) {
            query.andWhere('tasks.status = :status', { status })
        }
        if (search) {
            query.andWhere('tasks.title LIKE :search OR tasks.description LIKE :search', { search: `%${search}%`});
        }

        try {
            return query.getMany();
        } catch (error) {
            this.logger.error(`Fail to get tasks for user ${user.username}. Filters: ${JSON.stringify(filterDto)}`, error.stack)
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        let task = new Task()
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;  
        task = await this.taskRepository.save(task)
        delete task.user;
        return task;
    }

    async getTaskById(id: number, user: any): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id: id, userId: user.userId});
        if (!task) {
            throw new NotFoundException(`Task with id ${id} does not exists`);
        }
        return task;
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        let task = await this.getTaskById(id, user);
        task.status = status;
        task = await this.taskRepository.save(task);
        return task;
    }

    async deleteTask(id: number, user: User): Promise<boolean> {
        const task = await this.getTaskById(id, user);
        if (task) {
          const result = await this.taskRepository.delete(id)
          if (result.affected === 0) {
              throw new NotFoundException(`Task with id ${id} does not exist`);
          }
          return true;
        }
        return false;
    }
}
