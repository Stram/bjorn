import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class Firebase {
  constructor(config) {
    this.config = config;

    this.initializeApplication();

    if (config.databaseURL) {
      this.initializeDatabase();
    }

    if (config.authDomain) {
      this.initializeAuth();
      this.setAuthListeners();
    }
  }

  checkSession() {
    return this.authStatePromise;
  }

  initializeApplication() {
    if (firebase.apps.length) {
      this.app = firebase.app();
    } else {
      this.app = firebase.initializeApp(this.config);
    }
  }

  initializeDatabase() {
    this.database = this.app.database();
  }

  initializeAuth() {
    this.auth = this.app.auth();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  setAuthListeners() {
    this.authStatePromise = new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve({user});
        } else {
          reject({user: null});
        }
      });
    });
  }
}
