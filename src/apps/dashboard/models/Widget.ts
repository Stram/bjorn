import Model from './Model';

export interface widgetModelProps {
  width: number;
  height: number;
}

export default class Widget extends Model {

  public width: number;
  public height: number;

  constructor({width, height}: widgetModelProps) {
    super();
    this.width = width;
    this.height = height;
  }
}