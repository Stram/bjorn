import clockIcon from 'images/clock.svg';
import {TimeWidget, TimeWidgetOptionsForm} from 'components/widgets/time';

const widgetTypes = {
  clock: {
    icon: clockIcon,
    id: 'clock',
    name: 'Clock',
    widgetComponent: TimeWidget,
    optionsFormComponent: TimeWidgetOptionsForm,
  },
};

export default widgetTypes;
