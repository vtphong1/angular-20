import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective, ControlContainer, FormControl, FormGroup} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessage implements OnInit{
  @Input() control!: AbstractControl;
  @Input() fieldName: string = '';
  @Input() customMessages: { [key: string]: string } = {};

  private defaultMessages: { [key: string]: string } = {
    required: 'Trường này là bắt buộc',
    email: 'Email không hợp lệ',
    min: 'Giá trị tối thiểu là {min}',
    max: 'Giá trị tối đa là {max}',
    minlength: 'Độ dài tối thiểu là {requiredLength} ký tự',
    maxlength: 'Độ dài tối đa là {requiredLength} ký tự',
    pattern: 'Định dạng không hợp lệ',
    unique: 'Giá trị đã tồn tại',
    mustMatch: 'Mật khẩu không khớp',
    phone: 'Số điện thoại không hợp lệ'
  };

  ngOnInit() {
    if (!this.control) {
      throw new Error('Control input is required for ErrorMessageComponent');
    }
  }

  shouldShowError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    if (!this.control.errors) {
      return '';
    }

    const errors = this.control.errors;
    const firstErrorKey = Object.keys(errors)[0];

    // Ưu tiên custom message trước
    if (this.customMessages[firstErrorKey]) {
      return this.interpolateMessage(this.customMessages[firstErrorKey], errors[firstErrorKey]);
    }

    // Sử dụng default message
    if (this.defaultMessages[firstErrorKey]) {
      return this.interpolateMessage(this.defaultMessages[firstErrorKey], errors[firstErrorKey]);
    }

    // Fallback message
    return this.getGenericMessage(firstErrorKey);
  }

  private interpolateMessage(message: string, errorValue: any): string {
    if (typeof errorValue === 'object' && errorValue !== null) {
      let interpolatedMessage = message;
      Object.keys(errorValue).forEach(key => {
        interpolatedMessage = interpolatedMessage.replace(`{${key}}`, errorValue[key]);
      });
      return interpolatedMessage;
    }
    return message;
  }

  private getGenericMessage(errorKey: string): string {
    const fieldDisplay = this.fieldName || 'Trường này';

    switch (errorKey) {
      case 'required':
        return `${fieldDisplay} là bắt buộc`;
      case 'email':
        return `${fieldDisplay} phải là email hợp lệ`;
      case 'min':
        return `${fieldDisplay} phải lớn hơn hoặc bằng giá trị tối thiểu`;
      case 'max':
        return `${fieldDisplay} phải nhỏ hơn hoặc bằng giá trị tối đa`;
      case 'minlength':
        return `${fieldDisplay} quá ngắn`;
      case 'maxlength':
        return `${fieldDisplay} quá dài`;
      case 'pattern':
        return `${fieldDisplay} không đúng định dạng`;
      default:
        return `${fieldDisplay} không hợp lệ`;
    }
  }
}
