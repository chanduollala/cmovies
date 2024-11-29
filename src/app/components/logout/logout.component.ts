import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: "<div></div>"
})
export class LogoutComponent {

  constructor(private AuthService: AuthService, private router: Router) {
    this.router.navigate(["/"]).then(
      ()=> setTimeout(()=> this.AuthService.logout().then(
      ()=> {}), 1000)
    )
  }
}
