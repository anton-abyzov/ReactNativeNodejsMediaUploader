import { controller, httpGet } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { Media } from '../models/media';

@injectable()
@controller('/')
export class LoginController {
  @httpPost('/')
  public login(request: Request): Promise<Media> {
    const body = request.body;
    const login = body.login;
    const pass = body.password;
  }
}
