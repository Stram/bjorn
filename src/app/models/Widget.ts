import Model from './Model';

export interface IWidgetModelProps {
  width: number;
  height: number;
}

export default class Widget extends Model {

  public width: number;
  public height: number;

  constructor({width, height}: IWidgetModelProps) {
    super();
    this.width = width;
    this.height = height;
  }
}
