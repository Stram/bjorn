import {RequestHandler} from 'express';

class DashboardController {
  index: RequestHandler = (req, res, next) => {
    res.render('dashboard', {layout: 'dashboard'});
  }
}

export default new DashboardController();
