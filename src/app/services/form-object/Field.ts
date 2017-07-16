import Validator from './validators/Validator';

export interface IFieldOptions {
  name: string;
  type: string;
  validators?: Array<Validator>;
}

export default class Field {
  private name: string;
  private type: string;
  private validators: Array<Validator>;
  private _value: any;

  constructor({name, type, validators = []}: IFieldOptions) {
    this.name = name;
    this.type = type;
    this.validators = validators;
    this._value = null;
  }

  get isValid() {
    return this.validators.every((validator) => validator.validate(this.value));
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}
