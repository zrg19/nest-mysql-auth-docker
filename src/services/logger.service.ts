import { Injectable } from "@nestjs/common";
import { winstonConfig } from "src/config/winston.config";
import * as winston from "winston";
import { Logger } from "winston";

@Injectable()
export class LoggerService {
    private readonly logger: Logger

    constructor() {
        this.logger = winston.createLogger(winstonConfig);
    }

    info(message: string) {
        this.log('info', message);
    }

    error(message: string) {
        this.log('error', message);
    }

    log(level: string, message: string) {
        this.logger.log({level, message})
    }
}