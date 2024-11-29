import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'input-outline',
  templateUrl: './input-outline.component.html',
  styleUrls: ['./input-outline.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InputOutlineComponent
    }
  ],
  imports: [ReactiveFormsModule, CommonModule, MatIcon],
  standalone: true
})
export class InputOutlineComponent implements ControlValueAccessor, OnInit{
  @Input("title") title: any;
  @Input("box-height") box_height?: number;
  @Input("placeholder") placeholder: any
  @Input("password") password?:boolean
  @Input("value") value?: any
  @Input("disabled") disabled?: any
  @Input('font-size') fontSize: any;
  @ContentChild('icon') icon? :  TemplateRef<any>;

  onChange = (option:any) => {};

  onTouched = () => {};

  touched = false;


  entered_text = new FormControl("")
  hide: boolean = false

  ngOnInit(): void {
    this.hide = this.password || false
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
    this.entered_text.setValue(obj)
  }


}
