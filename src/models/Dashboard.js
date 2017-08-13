import Model from 'models/Model';

export default class Dashboard extends Model {
  static createEmpty() {
    return {
      createdAt: new Date().toString(),
      width: 4,
      height: 3,
      widgets: [],
    };
  }

  constructor({id, createdAt, width, height, widgets}) {
    super({id});
    this.createdAt = createdAt;
    this.width = width;
    this.height = height;
    this.widgets = widgets;
  }
}
