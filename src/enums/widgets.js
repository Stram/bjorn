import clockIcon from 'images/clock.svg';
import ClockWidgetOptionsForm from 'components/widgets/clock/Options.vue';

import newsletterIcon from 'images/newsletter.svg';
import NewsletterWidgetOptionsForm from 'components/widgets/newsletter/Options.vue';

const widgetTypes = {
  clock: {
    icon: clockIcon,
    id: 'clock',
    name: 'Clock',
    optionsFormComponent: ClockWidgetOptionsForm,
  },
  newsletter: {
    icon: newsletterIcon,
    id: 'newsletter',
    name: 'Newsletter',
    optionsFormComponent: NewsletterWidgetOptionsForm,
  },
};

export default widgetTypes;
