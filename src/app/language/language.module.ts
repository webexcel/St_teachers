import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageComponent} from './language.component';
import { LanguageRoutingModule } from "./language-routing.module";
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { TranModule } from "../tran.module";


@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    IonicModule,
    FormsModule,
    TranModule
  ]
})
export class LanguageModule { }
