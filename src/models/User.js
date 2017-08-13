import Model from 'models/Model';

export default class User extends Model {
  static createFromResponse(responseUser) {
    const { email, displayName, photoURL, uid } = responseUser;
    return new User({
      email,
      name: displayName,
      photoURL,
      id: uid,
    });
  }

  constructor({id, name, email, photoURL}) {
    super({id});
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
  }
}
