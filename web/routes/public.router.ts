import { Request, Response, Router } from 'express';
import authenticatedMiddleware from '../middlewares/autenticated.middleware';
import validatorMiddleware from '../middlewares/validator.middleware';
import handleCreateTts from '../services/tts.service';
import responses from '../responses';
import { allowedVoices } from '../constants';

const PublicRouter: Router = Router();

PublicRouter.post('/tts', authenticatedMiddleware, validatorMiddleware('tts'), (request: Request, response: Response): void => {
   handleCreateTts(request.body);
   return responses.Created(response);
});

PublicRouter.get('/voices', authenticatedMiddleware, (_request: Request, response: Response): void => {
    return responses.Sucess(response, allowedVoices);
 });

export default PublicRouter;