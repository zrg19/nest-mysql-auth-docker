// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
// import { Request, Response } from "express";
// import { Observable, tap } from "rxjs";
// import { LoggerService } from "src/services/logger.service";

// @Injectable()
// export class LoggerInterceptor implements NestInterceptor {
//     constructor(private readonly loggerService: LoggerService){}
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//         const ctx = context.switchToHttp();
//         const request = ctx.getRequest<Request>();
//         const response = ctx.getResponse<Response>();

//         const startTime = Date.now();
//         this.loggerService.info('Request:', request)
//         return next.handle().pipe(
//             tap(() => {
//                 const endTime = Date.now();
//                 const resTime = endTime - startTime;

//                 console.log(`${request.method} ${request.path} ${response.statusCode} ${resTime}`)
//                 this.loggerService.info('Response:', response)
//             })
//         );
//     }

// }

import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NestInterceptor,
    Optional,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type RequestHandler = (request: Request, logger: Logger) => void;
export type ResponseHandler = (request: Request, response: Response, body: unknown, logger: Logger) => void;
export type ErrorHandler = (request: Request, error: Error, logger: Logger) => void;

export const defaultRequestHandler: RequestHandler = (request: Request, logger: Logger) => {
    const message = `REQUEST: ${request.method} ${request.url}`;
    logger.log({ message, body: request.body });
};

export const defaultResponseHandler: ResponseHandler = (
    request: Request,
    response: Response,
    _body: unknown,
    logger: Logger
) => {
    const message = `RESPONSE: ${request.method} ${request.url} => ${response.statusCode}`;
    logger.log({ message, body: _body });
};

export const defaultErrorHandler: ErrorHandler = (request: Request, error: Error, logger: Logger) => {
    if (error instanceof HttpException) {
        const statusCode: number = error.getStatus();
        const message = `ERROR: ${request.method} ${request.url} => ${statusCode}`;

        if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
            logger.error(
                {
                    message,
                    error,
                },
                error.stack
            );
        } else {
            logger.warn({
                message,
                error,
            });
        }
    } else {
        logger.error(
            {
                message: `ERROR: ${request.method} ${request.url}`,
            },
            error.stack
        );
    }
};

export type LoggingInterceptorConfig = {
    requestHandler: RequestHandler | null;
    responseHandler: ResponseHandler | null;
    errorHandler: ErrorHandler | null;
    context: string;
};

/**
 * Interceptor that logs input/output requests
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger: Logger;

    private readonly config: LoggingInterceptorConfig;

    constructor(@Optional() config?: Partial<LoggingInterceptorConfig> | string) {
        const partialConfig: Partial<LoggingInterceptorConfig> =
            typeof config === 'string' ? { context: config } : { ...config };

        this.config = {
            ...partialConfig,
            requestHandler:
                partialConfig.requestHandler !== undefined ? partialConfig.requestHandler : defaultRequestHandler,
            responseHandler:
                partialConfig.responseHandler !== undefined ? partialConfig.responseHandler : defaultResponseHandler,
            errorHandler: partialConfig.errorHandler !== undefined ? partialConfig.errorHandler : defaultErrorHandler,
            context: partialConfig.context || LoggerInterceptor.name,
        };

        this.logger = new Logger(this.config.context);
    }

    /**
     * Intercept method, logs before and after the request being processed
     * @param context details about the current request
     * @param callHandler implements the handle method that returns an Observable
     */
    public intercept(context: ExecutionContext, callHandler: CallHandler): Observable<unknown> {
        if (this.config.requestHandler != null) {
            const request = context.switchToHttp().getRequest();
            this.config.requestHandler(request, this.logger);
        }

        return callHandler.handle().pipe(
            tap({
                next: (val: unknown): void => {
                    this.logNext(val, context);
                },
                error: (err: Error): void => {
                    this.logError(err, context);
                },
            })
        );
    }

    /**
     * Logs the request response in success cases
     * @param body body returned
     * @param context details about the current request
     */
    private logNext(body: unknown, context: ExecutionContext): void {
        if (this.config.responseHandler != null) {
            const request = context.switchToHttp().getRequest<Request>();
            const response = context.switchToHttp().getResponse<Response>();
            this.config.responseHandler(request, response, body, this.logger);
        }
    }

    /**
     * Logs the request response in success cases
     * @param error Error object
     * @param context details about the current request
     */
    private logError(error: Error, context: ExecutionContext): void {
        const request = context.switchToHttp().getRequest<Request>();

        if (this.config.errorHandler != null) {
            this.config.errorHandler(request, error, this.logger);
        }
    }
}