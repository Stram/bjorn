import {RequestHandler} from 'express';

class DashboardController {
  index: RequestHandler = (req, res, next) => {
    res.render('dashboard');
  }
}

export default new DashboardController();
