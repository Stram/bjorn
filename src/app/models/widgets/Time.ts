import Widget, {widgetModelProps} from 'app/models/Widget';

interface TimeWidgetProps extends widgetModelProps {
  refreshInterval: number
}

export default class TimeWidget extends Widget {
  
  public refreshInterval: number
  
  constructor(props: TimeWidgetProps) {
    super(props);
    this.refreshInterval = props.refreshInterval;
  }
}
