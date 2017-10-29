import Model from 'models/Model';

export default class Dashboard extends Model {
  static createEmpty() {
    return {
      createdAt: new Date().toString(),
      width: 4,
      height: 3,
      widgets: [],
      name: ''
    };
  }

  static createFromResponse(response) {
    const {id, name, createdAt, width, height, widgets} = response;
    return new Dashboard({
      id, name, createdAt, width, height, widgets
    });
  }

  constructor({id, name, createdAt, width, height, widgets}) {
    super({id});
    this.name = name;
    this.createdAt = createdAt;
    this.width = width;
    this.height = height;
    this.widgets = widgets && !Array.isArray(widgets) ? Object.values(widgets) : widgets;
  }
}
