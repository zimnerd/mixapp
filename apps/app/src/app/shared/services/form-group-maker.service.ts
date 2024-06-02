import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../../../../libs/utils';

@Injectable({
  providedIn: 'root'
})
export class FormGroupMakerService {

  constructor(private fb: FormBuilder) {
  }

  generateForm(fields: FormField[]): FormGroup {
    // sort fields by position
    fields = fields.sort((a, b) => {
      if (a.position && b.position) {
        return a.position - b.position;
      }
      return 0;
    });
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
