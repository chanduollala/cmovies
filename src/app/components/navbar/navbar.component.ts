import { Component } from '@angular/core';
import {InputOutlineComponent} from "../input/input-outline/input-outline.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        InputOutlineComponent,
        MatIcon
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
