import expressWs, { Application } from "express-ws";
import express, { NextFunction, Response, Request } from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from "./routes/getLogin";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { postLogin } from "./routes/postLogin";
import { authentificationMiddleware } from "./middleware/authentificationMiddleware";
import { getRegister } from "./routes/getRegister";
import { postRegister } from "./routes/postRegister";
import { getProfile } from "./routes/getProfile";
import { postProfile } from "./routes/postProfile";
import { postDelete } from "./routes/postDelete";
import { deleteProfile } from "./routes/getDelete";
import { getChat } from "./routes/getChat";
import { getLogout } from "./routes/getLogOut";

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use(cookieParser('test'))
  app.use(express.static(path.join(__dirname, '../public')))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authentificationMiddleware)
  getProfile(app)
  postProfile(app)
  deleteProfile(app)
  postDelete(app)
  getLogout(app)
  getRoot(app)
  getChat(app)
  getWs(app, sockets)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).send('Internal server error')

    next()
  })

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

main()
