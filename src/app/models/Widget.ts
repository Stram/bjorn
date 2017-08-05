import Model from './Model';

export interface IWidgetModelProps {
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
  uid: string;
}

export default class Widget extends Model {
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  public type: string;
  public uid: string;

  constructor({width, height, x, y, type, uid}: IWidgetModelProps) {
    super();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
    this.uid = uid;
  }
}
