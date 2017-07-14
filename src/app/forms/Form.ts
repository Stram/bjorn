export default abstract class Form {
  constructor() {

  }

  get isValid() {
    return true;
  }

  public validate() {

  }

  public submit() {

  }

  abstract onSubmit(): Promise<any>;
}