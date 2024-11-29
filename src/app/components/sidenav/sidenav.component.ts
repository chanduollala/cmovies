import {Component, Input, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {InputOutlineComponent} from "../input/input-outline/input-outline.component";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Timestamp} from "rxjs";
import {Time} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatIcon,
    InputOutlineComponent,
    ReactiveFormsModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{

  @Input() fetchItemsUrl:string = ""



  menu_items: {
    name: string ,
    description: string,
    URL: string,
    children: any[],
    search_children: any[]
    icon: string,
    clicked: boolean,
    show_children: boolean,
    hovered: boolean
  } [] = []

  fixed_menu_items= [
    {
        name: "Preferences",
        icon: "settings",
        URL: "/preferences"
      },
    {
      name: "Logout",
      icon: "logout",
      URL: "/logout"
    }
  ]

  search_text = new FormControl("")
  search_menu_items:{
    name: string ,
    description: string,
    URL: string,
    children: any[],
    search_children: any[]
    icon: string,
    clicked: boolean,
    show_children: boolean,
    hovered: boolean
  }[] = []

  constructor(protected router: Router, protected auth:AuthService) {

  }

  loadMenuItems = async () => {
    this.menu_items = await this.auth.httpGET(this.fetchItemsUrl, 200)
    this.search_menu_items = this.menu_items
    this.menu_items.forEach((item)=> {
      if (item.children.some((child) => {
        return child.URL === this.router.url.slice(1)
      })) this.navigate(item)
    } )
  }

  ngOnInit() {
    this.loadMenuItems().then(
      () => {

      }
    )


    this.search_text.valueChanges.subscribe(
      (value)=> {
        if (value!= null) {
          this.search_menu_items = this.menu_items.filter(item => {
            let nameIncludesText = item.name.toLowerCase().includes(value.toLowerCase())

            item.search_children = (nameIncludesText)? item.children: item.children.filter((child:any) => {
              return child.name.toLowerCase().includes(value.toLowerCase())
            })
            return nameIncludesText || item.search_children.length>0
          })
        }
        else {
          this.search_menu_items = this.menu_items
        }
      }
    )
  }



  selected = 0
  nav_hover: boolean = false;
  select(index: number){
    console.log(this.router.url.slice(1))
    console.log(this.menu_items[0].URL)
  }

  navigate(menu_item: any, parent?:any) {
    if (parent) {
      parent.clicked = true
      parent.show_children = true
    }
    if (menu_item.URL === "#"){
      menu_item.clicked = !menu_item.clicked
      menu_item.show_children = menu_item.clicked
    }
    else {
      this.router.navigateByUrl( menu_item.URL, { replaceUrl: true })
    }
  }


  expandNavItem(menu_item: any) {
    if (this.search_text.value) return
    menu_item.hovered = true
    let already_clicked = menu_item.clicked
    setTimeout(() => {
      if (already_clicked && !menu_item.clicked) return
      if (this.nav_hover && menu_item.hovered)
        menu_item.show_children = true
    }, 500
    );
  }

  collapseNavItem(menu_item: any) {
    if (this.search_text.value) return
    menu_item.hovered= false
    if (!menu_item.clicked && !this.nav_hover) menu_item.show_children = false
  }

  exitNav()
  {
    this.nav_hover = false;
    setTimeout(() => {
      this.menu_items.forEach((item) => {
        item.show_children = item.clicked
      })}, 300
    );

  }
}
