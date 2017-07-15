import {createApp} from 'app';
import {APP_ROOT_ID} from 'app/config';

const {app, router} = createApp();

router.onReady(() => {
  app.$mount(`#${APP_ROOT_ID}`);
});
