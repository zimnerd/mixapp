import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private fb: FormBuilder) {}

  generateForm(fields: FormField[]): FormGroup {
    const group = this.fb.group({});
    
    fields.forEach(field => {
      const control = this.fb.control(
        { value: field.value || '', disabled: field.disabled || false },
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });

    return group;
  }

  private bindValidations(validations: any) {
    if (validations.length > 0) {
      return Validators.compose(validations);
    }
    return null;
  }
}