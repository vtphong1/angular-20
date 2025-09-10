import {Component, inject, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ErrorMessage} from '../error-message/error-message';

@Component({
  selector: 'app-dynamic-form-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorMessage],
  templateUrl: './dynamic-form-component.html',
  styleUrl: './dynamic-form-component.scss'
})
export class DynamicFormComponent {
  @Input() fields: IFieldConfigFormControl[] = [];
  dynamicForm!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit() {
    this.dynamicForm = this.fb.group({});
    this.buildForm(this.fields, this.dynamicForm);
  }

  private buildForm(fields: IFieldConfigFormControl[], group: FormGroup) {
    fields.forEach(field => {
      if (field.type === 'array' || field.type === 'input_rate') {
        const arr = this.fb.array([]);
        // Khởi tạo ít nhất 1 phần tử
        // this.addArrayItem(arr, field.children || []);
        this.addArrayItem(arr, field.children || [], field.validators || []);
        group.addControl(field.name, arr);
      } else {
        group.addControl(
          field.name,
          this.fb.control(field.value || '', field.validators || [])
        );
      }
    });
  }

  addArrayItem(formArray: FormArray, children: any[], parentValidators?: any[]) {
    const childGroup = this.fb.group({});

    children.forEach(child => {
      // Kết hợp validators từ parent và child
      let validators = [...(child.validators || [])];

      childGroup.addControl(
        child.name,
        this.fb.control(child.value || '', validators)
      );
    });

    formArray.push(childGroup);
  }

  getFormArray(name: string): FormArray {
    return this.dynamicForm.get(name) as FormArray;
  }

  getControlFromArray(arrayName: string, index: number, controlName: string) {
    return this.getFormArray(arrayName).at(index).get(controlName);
  }

  onSubmit() {
    console.log(this.dynamicForm.getRawValue())
  }
}
