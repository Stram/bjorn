import Widget, {IWidgetModelProps} from 'models/Widget';

interface ITimeWidgetProps extends IWidgetModelProps {
  refreshInterval: number;
}

export default class TimeWidget extends Widget {

  public refreshInterval: number;

  constructor(props: ITimeWidgetProps) {
    super(props);
    this.refreshInterval = props.refreshInterval;
  }
}
