import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DatepickerComponent
    }
  ],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class DatepickerComponent implements ControlValueAccessor, OnInit{
  @Input("title") title: any;
  @Input("box-height") box_height?: number;
  @Input("placeholder") placeholder: any
  @Input("value") value?: any
  @Input("disabled") disabled?: any
  @Input('font-size') fontSize: any;

  onChange = (option:any) => {};

  onTouched = () => {};

  touched = false;


  entered_text = new FormControl("")

  ngOnInit(): void {
    console.log(this.value);
    if (this.value){
      this.entered_text.setValue(this.value)
    }
    (this.disabled)?this.entered_text.disable():this.entered_text.enable()
  }
  constructor() {
    if (this.box_height==null){
      this.box_height = 50
    }
    this.entered_text.valueChanges.subscribe((val)=>{
      console.log(this.entered_text.value)
      this.markAsTouched()
      if (!this.disabled){
        this.onChange(val)
      }
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    (isDisabled)?this.entered_text.disable():this.entered_text.enable()
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  writeValue(obj: any): void {
    console.log(obj)
    this.entered_text.setValue(obj)
  }


}
