import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.createFormGroup(this.fb);
  }

  ngOnInit() {
  }
  private createFormGroup(fb: FormBuilder): FormGroup {
    const defaultValues: FormModel = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    const form = fb.group({
      hours: 0,
      minutes: 0,
      seconds: 0
    } as FormModel);
    form.get('hours').setValidators(this.asValidator(this.isValidHours, 'hours').validate);
    form.get('minutes').setValidators(this.asValidator(this.isValidMinutes, 'minutes').validate);
    form.get('seconds').setValidators(this.asValidator(this.isValidSeconds, 'seconds').validate);
    form.statusChanges.subscribe(x => console.log(x));
    form.statusChanges.subscribe(x => console.log(form.errors, form.get('hours').errors));
    form.setValue(defaultValues);
    return form;
  }

  private isValidHours: (hours: string|number) => boolean = hours => {
    return this.isValidPositiveNumber(+hours);
  }

  private isValidMinutes: (minutes: string|number) => boolean = minutes => {
    return this.isValidPositiveNumber(+minutes) &&
      +minutes < 60;
  }

  private isValidSeconds: (seconds: string|number) => boolean = seconds => {
    return this.isValidPositiveNumber(+seconds) &&
      +seconds < 60;
  }
  private isValidPositiveNumber: (num: number) => boolean = num => {
    return typeof num === typeof 1 &&
      num > -1 &&
      !([Infinity, -Infinity, NaN].some(x => x === num));
  }
  private asValidator: (fn: (...args) => boolean, key: string) => Validator = (fn, key) => {
    return {
      validate: (c: FormControl) => {
        const isValid = fn(c.value);
        if (isValid) {
          return null;
        } else {
          return { [key]: true };
        }
      }
    };
  }
}

class FormModel {
  hours: number;
  minutes: number;
  seconds: number;
}
