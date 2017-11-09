import { controller, httpPost } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { Request } from 'express';

@injectable()
@controller('/')
export class LoginController {
  @httpPost('/')
  public login(request: Request): Promise<boolean> {
    const body = request.body;
    const login = body.login;
    const pass = body.password;
    if (login === "user" && pass === "pass") {
      return new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });
    }
    return new Promise<boolean>((resolve, reject) => {
      resolve(false);
    });
  }
}
