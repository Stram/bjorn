import Model from 'models/Model';
import Dashboard from 'models/Dashboard';

export default class Widget extends Model {
  constructor({width, height, x, y, type, id, dashboard}) {
    super({id});
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
    this.dashboard = dashboard;
  }
}
