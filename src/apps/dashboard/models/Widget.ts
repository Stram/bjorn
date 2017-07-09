export interface widgetModelProps {
  width: number;
  height: number;
}

export default class Widget {

  public width: number;
  public height: number;

  constructor({width, height}: widgetModelProps) {
    this.width = width;
    this.height = height;
  }
}