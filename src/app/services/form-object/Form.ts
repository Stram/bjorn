import Field, {IFieldOptions} from './Field';

export interface IFormOptions {
  fields: Array<IFieldOptions>;
}

export default abstract class Form {
  private fields: {[key: string]: Field};

  constructor({fields}: IFormOptions) {
    this.fields = fields.map((fieldOptions) => new Field(fieldOptions)).reduce((accumulator, field) => {
      accumulator[field.name] = field;
      return accumulator;
    }, {} as {[key: string]: Field});
  }

  get listOfFields() {
    return Object.values(this.fields);
  }

  get isValid() {
    return this.listOfFields.every((field) => field.isValid);
  }

  public submit() {
    if (this.isValid) {
      this.onSubmit();
    }
  }

  protected abstract onSubmit(): Promise<any>;
}
