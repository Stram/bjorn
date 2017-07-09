import {createApp} from 'app';

export interface Context {
  url: string
}

export default (context: Context) => {
  
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