import {RequestHandler} from 'express';

class AdminController {
  index: RequestHandler = (req, res, next) => {
    res.render('admin');
  }
}

export default new AdminController();
