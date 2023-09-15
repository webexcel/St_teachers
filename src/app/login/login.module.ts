import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule} from '@angular/forms';
import { TranModule } from "../tran.module";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    TranModule
  ]
})
export class LoginModule { }
