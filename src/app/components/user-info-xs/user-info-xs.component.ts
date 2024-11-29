import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

class AuthComponent {
}

@Component({
  selector: 'app-user-info-xs',
  standalone: true,
  imports: [],
  templateUrl: './user-info-xs.component.html',
  styleUrl: './user-info-xs.component.css'
})
export class UserInfoXsComponent implements OnInit{


  user_info = {
    uname : "user",
    image_url : "https://maxst.icons8.com/vue-static/landings/page-index/hero/hero-products/icons2x.webp"
  }

  constructor(private auth: AuthService) {
  }
  async loadNameAndImage() {
    let resp = await this.auth.getNameAndImage()
    console.log(resp)
    if (resp.name){
      this.user_info.uname = resp.name
    }
    if (resp.image){
      this.user_info.image_url = resp.avatar
    }
  }

  ngOnInit(): void {
    this.loadNameAndImage()
  }
}
