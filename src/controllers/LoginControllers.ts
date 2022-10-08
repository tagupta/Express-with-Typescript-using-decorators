import { NextFunction, Request, Response } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
              <form method="POST">
                <div>
                  <label>Email: </label>
                  <input type="email" name="email"/>
                </div>
                <div>
                  <label>Password: </label>
                  <input type="password" name="password"/>
                </div>
                <button>Submit</button>
              </form>
            `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body;

    if (email === 'test@test.com' && password === '123') {
      //mark this person as logged in
      req.session = { loggedIn: true };
      //redirect this person to root route
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getlogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
