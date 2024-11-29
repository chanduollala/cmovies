import {Component, Input, OnInit} from '@angular/core';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";


export class Checkbox{
  public selected: boolean = false
  object: any

  constructor(option:any) {
    this.object = option
  }

  static fromList(list:any[]) : Checkbox[]{
    let res: Checkbox[] = []
    list.forEach((option)=>{
      res.push(new Checkbox(option))
    })
    return res
  }

}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions},
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: MultiSelectComponent
    }
  ],
  imports: [ReactiveFormsModule],
  standalone: true

})
export class MultiSelectComponent implements OnInit, ControlValueAccessor{


  @Input("options") options?:any[]
  @Input("display") display:any
  @Input("value") value:any


  options_loaded: Checkbox[] = []
  options_selected: any[] = []

  ngOnInit() {
    console.log(this.options)
    this.options_loaded = Checkbox.fromList(this.options!)
  }


  constructor() {
  }

  valueUpdated(event:any, index:number){
    let checkbox: HTMLInputElement = event.target
    console.log(this.options_selected)
    // console.log(this.options_loaded)
    this.options_loaded[index].selected = checkbox.checked
    this.options_selected = this.options_loaded.filter((cb_option)=> cb_option.selected).map((cboption)=> (this.value)?cboption.object[this.value]:cboption.object)
    this.onChange(this.options_selected)
  }

  onChange = (option:any) => {};

  onTouched = () => {};

  touched = false;


  disabled = false

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  writeValue(obj: any[]): void {
    this.options_selected = obj?obj:[]
    this.options_loaded.forEach((option, index) => {
      if (this.options_selected.includes(option.object[this.value])){
        this.options_loaded[index].selected=true
      }
    })
  }

}
