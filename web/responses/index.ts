import { Response } from 'express';

function InternalServerError(response: Response, message?: string): void {
    response.status(500).json({
        status: 500,
        statusCode: 'internal-server-error',
        success: false,
        message: message || 'Something unexpected happened on the server.'
    })
}

function UnprocessableEntityError(response: Response, message?: string): void {
    response.status(422).json({
        status: 422,
        statusCode: 'unprocessable-entity',
        success: false,
        message: message || 'The body sent is not valid.'
    })
}

function ForbiddenError(response: Response, message?: string): void {
    response.status(403).json({
        status: 403,
        statusCode: 'forbidden',
        success: false,
        message: message || 'You need a valid token on your header.'
    })
}

function Created(response: Response, data?: any): void {
    response.status(201).json({
        status: 201,
        statusCode: 'created',
        success: true,
        data: data || {}
    })
}

function Sucess(response: Response, data?: any): void {
    response.status(200).json({
        status: 200,
        statusCode: 'sucess',
        success: true,
        data: data || {}
    })
}

export default Object.freeze({ InternalServerError, UnprocessableEntityError, ForbiddenError, Created, Sucess });