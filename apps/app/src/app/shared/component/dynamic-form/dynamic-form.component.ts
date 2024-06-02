import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField, DynamicFormService, SelectOptions, FormProperties } from '@mixapp/utils';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';
import { FormGroupMakerService } from '../../services/form-group-maker.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  standalone: true,
  providers: [DynamicFormService]
})
export class DynamicFormComponent  implements OnInit {
  @Output() submitForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() formProperties: FormProperties = {
    title: 'Form',
    formData: [],
    submitButtonText: 'Submit',
    cancelButtonText: 'Cancel'
  };
  form: FormGroup = new FormGroup({});
  filteredOptions: { [key: string]: SelectOptions[] } = {};
  formFields: FormField[] = [];

  constructor(private dynamicFormService: FormGroupMakerService) {
  }

  ngOnInit() {
    this.formFields = this.formProperties.formData;
    this.form = this.dynamicFormService.generateForm(this.formFields);
    this.initFilters();
  }

  initFilters(): void {
    if (!this.formFields) return;
    this.formFields.forEach(field => {
      if (field.filter && field.filterBy) {
        const checkField = this.formFields.find(f => f.name === field.filterBy);
        const checkFormControl = this.form.controls[field.filterBy];
        if (checkFormControl && field.options) {
          checkFormControl.valueChanges.subscribe(value => {
            this.filteredOptions[field.name] = field.options ? field.options.filter(option => {
              if (field.filterOn && value) {
                return option[field.filterOn] === value
              } else {
                return true;
              }
            }) : field.options ?? [];
          });
        }
      }
    });
  }

  getOptions(field: FormField): SelectOptions[] {
    if (field.filter && this.filteredOptions[field.name]) {
      return this.filteredOptions[field.name];
    }
    return field.options ?? [];
  }

  getControl(name: string) {
    return this.form.get(name);
  }

  close() {
    this.form.reset();
  }

  submit() {
    if(this.formProperties.onSubmit) {
      this.formProperties.onSubmit(this.form);
      return;
    }
    this.submitForm.emit(this.form);
  }
}
