import { FormGroup, ValidatorFn } from '@angular/forms';

export interface FormField {
    type: string;
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    options?: SelectOptions[];
    filter?:boolean;
    filterBy?:string;
    filterOn?:string;
    value?: any;
    max?: number;
    min?: number;
    validations?: ValidatorFn[];
    disabled?: boolean;
    position?: number;
}

export interface SelectOptions {
    value: string;
    viewValue: string;
    key: string | number;
    [key: string]: any;
}

export interface FormProperties {
    showCancelBtn?: boolean;
    title: string;
    subtitle?: string;
    submitButtonText?: string;
    formData: FormField[];
    cancelButtonText?: string;
    onSubmit?: (form: FormGroup) => void;
    onCancel?: () => void;
}
