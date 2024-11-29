import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
  imports: [
    MatIcon
  ],
  standalone: true
})
export class BackButtonComponent {

  @Input("route") route : string = ''
  goBack(){
    window.history.back()
  }

  constructor(private router:Router) {
  }

}
