import clockIcon from 'images/clock.svg';
import ClockWidgetOptionsForm from 'components/widgets/clock/Options.vue';

const widgetTypes = {
  clock: {
    icon: clockIcon,
    id: 'clock',
    name: 'Clock',
    optionsFormComponent: ClockWidgetOptionsForm,
  },
};

export default widgetTypes;
