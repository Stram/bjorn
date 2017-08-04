/**
 * Extends interfaces in Vue.js
 */

import Vue from 'vue';
import Firebase from 'app/services/firebase';

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: Firebase;
    $style: {[key: string]: string};
  }
}
