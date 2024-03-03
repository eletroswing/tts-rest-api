import { NextFunction, Request, Response } from "express"
import responses from "../responses";

export default function authenticatedMiddleware(request: Request, response: Response, next: NextFunction): void {
    if(process.env.REST_API_KEY && request.headers.authorization != process.env.REST_API_KEY) {
      return responses.ForbiddenError(response);
    };

    return next();
}