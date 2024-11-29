import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {NgStyle} from "@angular/common";
import {InputOutlineComponent} from "../input-outline/input-outline.component";

@Component({
  selector: 'select-outline',
  templateUrl: './select-outline.component.html',
  styleUrls: ['./select-outline.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectOutlineComponent
    }
  ],
  imports: [
    MatIcon,
    ReactiveFormsModule,
    NgStyle,
    InputOutlineComponent
  ],
  standalone: true
})
export class SelectOutlineComponent implements ControlValueAccessor , OnInit{
  @Input("title") title: any;
  @Input("placeholder") placeholder: any

  @Input("options") options?: any[]
  @Input("option-title") option_title: any
  @Input("option-leading") option_leading: any
  @Input("option-trailing") option_trailing: any

  @Input("box-height") box_height?: number;
  @Input("options-height") options_height?: number;
  @Input("options-width") options_width?: number;
  @Input("font-size") font_size?: number;
  @Input("default-value-index") default_value_index?: number;

  show_options: any = false;

  @Input("auto-complete") auto_complete?: any
  @Input("ac-label") auto_complete_label?: any;
  @Input("ac-function") updateAutoOptions? : Function = (options:any[], value:any)=>{return options}
  autoCompleteSearchValue = new FormControl()
  filteredOptions: any[] = []

  @Input("select-value") select_value: any
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const optionsContainer = document.querySelector('.'+this.title+'options') as HTMLElement;
    const inputBox = document.querySelector('.'+this.title+'box') as HTMLElement;

    console.log('hi')
    if (optionsContainer!=null){
      if (clickedElement === optionsContainer || optionsContainer.contains(clickedElement) || clickedElement===inputBox || inputBox.contains(clickedElement)) {
        console.log('clicked on area', this.title)
      }
      else{
        console.log('clicked outside ', this.title)
        this.show_options=false
      }
    }
  }



  ngOnInit() {
    if (this.options==undefined) this.options=[]
    this.filteredOptions = this.options

    this.autoCompleteSearchValue.valueChanges.subscribe(
      async (value) => {
        this.filteredOptions = await this.updateAutoOptions!(this.options, value)
      }
    )

    if (this.default_value_index != undefined){
      console.log("Hi")
      this.selected_option = this.options![this.default_value_index]
      this.onChange((this.select_value)?this.selected_option![this.select_value]: this.selected_option!)
    }
  }


  onChange = (option:any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  selected_option=null
  constructor() {
    if (this.box_height==null){
      this.box_height = 50
    }

  }

  select(option: any) {
    this.markAsTouched();
    if (!this.disabled) {
      this.selected_option = option
      this.onChange((this.select_value)?this.selected_option![this.select_value]: this.selected_option!)
      this.show_options=false
    }
  }

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

  writeValue(obj: any): void {
    this.selected_option=(this.select_value)?this.options!.find((option:any) => option[this.select_value] === obj):obj
  }
}
