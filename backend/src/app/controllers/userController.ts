import { Request, Response } from "express";

import { User } from "../entities/User";

class UserController {
  async store(req: Request, res: Response) {
    const { discordUserId, isSuperAdmin } = req.body;

    const user = new User();

    user.discordUserId = discordUserId;
    user.isSuperAdmin = isSuperAdmin;

    await user.save();

    return res.status(201).json(user);
  }

  async index(req: Request, res: Response) {
    const users = await User.find();

    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      relations: ["participations"],
    });

    return res.json(user);
  }

  async showByDiscordUserId(req: Request, res: Response) {
    const { discordUserId } = req.params;

    const user = await User.findOne({
      where: { discordUserId },
      relations: ["participations"],
    });
    if (!user) return res.status(404).send({
      message: 'No user found with this Discord ID'
    });
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findOne(id);

    await user.remove();

    return res.status(200);
  }
}

export default new UserController();