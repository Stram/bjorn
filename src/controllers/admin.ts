import {RequestHandler} from 'express';

class AdminController {
  index: RequestHandler = (req, res, next) => {
    res.json({});
  }
}

export default new AdminController();
