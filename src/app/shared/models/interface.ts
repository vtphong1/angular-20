interface IFieldConfigFormControl {
  name: string;
  label?: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'array' | 'input_rate' | 'rate' | 'radio_button';
  options?: { label: string; value: any }[];
  value?: any;
  validators?: any[];
  children?: IFieldConfigFormControl[];
}
