import Widget from 'models/Widget';

export default class TimeWidget extends Widget {
  constructor(props) {
    super(props);
    this.refreshInterval = props.refreshInterval;
  }
}
