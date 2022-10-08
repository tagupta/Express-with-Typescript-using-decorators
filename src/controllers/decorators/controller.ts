import { NextFunction, Request, RequestHandler, Response } from 'express';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetaDataKeys } from './MetadataKeys';
import { Methods } from './Methods';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid Request Body');
      return;
    }
    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller(rootPrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetaDataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetaDataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetaDataKeys.middleware, target.prototype, key) ||
        [];

      const keys =
        Reflect.getMetadata(MetaDataKeys.validator, target.prototype, key) ||
        [];
      const validator = bodyValidators(keys);

      if (path) {
        router[method](
          `${rootPrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
