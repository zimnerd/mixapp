import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormField, FormProperties, SelectOptions } from '../../../models';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent implements OnInit{
  formFields: FormField[] = this.data.formData;
  errors: any = {};
  form: FormGroup;
  filteredOptions: { [key: string]: SelectOptions[] } = {};
  constructor(public dialogRef: MatDialogRef<DialogFormComponent>, @Inject(MAT_DIALOG_DATA) public data: FormProperties,
   private dynamicFormService: DynamicFormService) {
    this.formFields = this.formFields.sort((a, b) =>{
      if(a.position && b.position){
        return a.position - b.position;
      }
      return 0;
    });
  }

  ngOnInit() {
    this.form = this.dynamicFormService.generateForm(this.formFields);
    this.initFilters();
  }

  initFilters(): void {
    if(!this.formFields) return;
    this.formFields.forEach(field => {
      if (field.filter && field.filterBy) {
        const checkField = this.formFields.find(f => f.name === field.filterBy);
        const checkFormControl = this.form.controls[field.filterBy];
        if (checkFormControl && field.options) {
          checkFormControl.valueChanges.subscribe(value => {
            this.filteredOptions[field.name] = field.options?  field.options.filter(option => {
            if(field.filterOn && value){
            return option[field.filterOn] === value}
          else {
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

  // checkFilter(field: FormField) {
  //   let options  = [...field.options!]
  //   const needsFilter = field.filter && field.filterBy && field.filterOn;
  //   if (needsFilter) {
  //     const filterFrom = this.formFields.find(f => f.name === field.filterBy);
  //     if (filterFrom && field.filterBy) {
  //       const filterValue = this.form.get(field.filterBy)?.value;
  //       if (filterValue) {
  //         options = this.getOptions(field, filterValue);
  //       }
  //     }
  //   }
  //   return options;
  // }

  // getOptions(field: FormField, filterValue: any): SelectOptions[] {
  //   if(!field.options) return [];
  //   if(!field.filterOn) return field.options;
  //   return field.options ? field.options?.filter(option => {
  //     if(field.filterOn && filterValue){
  //     return option[field.filterOn] == filterValue
  //   }else{
  //     return true;
  //   }
  //   }) : [];
  // }


  submit() {
    // check if form is valid
    if (!this.form.valid) {
      const errors  =  this.form.errors;
      if (errors) {
        this.errors = errors;
      }
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
