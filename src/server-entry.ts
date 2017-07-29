import {createApp} from 'app';

export interface IContext {
  url: string;
}

// For ssr Firebase
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export default (context: IContext) => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp();

    router.push(context.url);

    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({code: 404});
      }

      resolve(app);
    }, reject);
  });
};
