import Model from 'models/Model';

export default class Dashboard extends Model {
  constructor({id, createdAt, widgets}) {
    super({id});
    this.createdAt = createdAt || new Date().toString();
    this.width = 4;
    this.height = 3;
    this.widgets = widgets || [];
  }
}
