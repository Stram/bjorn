import {RequestHandler} from 'express';

class AdminController {
  public index: RequestHandler = (req, res, next) => {
    res.render('admin');
  }
}

export default new AdminController();
