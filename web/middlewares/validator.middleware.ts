import Validators from "../validators"
import { NextFunction, Request, RequestParamHandler, Response } from "express"
import responses from "../responses";

interface Validators {
    [key: string]: any;
}

export default function validatorMiddleware(validator: string): any  {
    const validJoiObjects: Validators = Validators;
    if (!validJoiObjects[validator]) throw new Error(`'${validator}' validator is not exists`)

    return function (request: Request, response: Response, next: NextFunction): void {
        validJoiObjects[validator].validateAsync(request.body).then((body: any) => {
            request.body = body;
            return next();
        }).catch((error: any) => {
            if (error.isJoi) return responses.UnprocessableEntityError(response, error.message);

            return responses.InternalServerError(response);
        })
    }
}