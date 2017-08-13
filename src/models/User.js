import Model from 'models/Model';

export default class User extends Model {
  static createFromResponse(responseUser) {
    const { email, displayName, photoURL, uid } = responseUser;
    return new User({
      email,
      name: displayName,
      photoURL,
      uid,
    });
  }

  constructor({uid, name, email, photoURL}) {
    super();
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
  }
}
