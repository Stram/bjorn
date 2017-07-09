import Widget, {widgetModelProps} from 'apps/dashboard/models/Widget';

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
