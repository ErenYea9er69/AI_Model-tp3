import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {

user = new User();

ngOnInit() {}


  constructor() { }
onLoggedin()
{
console.log(this.user);}

}
