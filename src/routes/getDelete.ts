import { deleteUser, findUserById } from "../repositories/userRepository";
import { Application } from "express-ws";

export function deleteProfile(app: Application) {
  app.post("/delete", async (req, res) => {
    const id = req.signedCookies.ssid;

    const user = await findUserById(id);
    if (!user) {
      res.status(401).send("User not found");
      return;
    }

    await deleteUser(id);

    res.redirect("/");
  });
}