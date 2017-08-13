import Model from 'models/Model';

interface IUserOptions {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
}

export default class User extends Model {
  public static createFromResponse(responseUser: any) {
    const { email, displayName, photoURL, uid } = responseUser;
    return new User({
      email,
      name: displayName,
      photoURL,
      uid,
    });
  }

  public uid: string;
  public name: string;
  public email: string;
  public photoURL: string;

  constructor({uid, name, email, photoURL}: IUserOptions) {
    super();
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
  }
}
