import Model from 'models/Model';

export default class Widget extends Model {
  static createFromResponse(response) {
    const {id, width, height, x, y, type} = response;
    return new Widget({
      id, width, height, x, y, type
    });
  }

  constructor({width, height, x, y, type, id}) {
    super({id});
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
  }
}
