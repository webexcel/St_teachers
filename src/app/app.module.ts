import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TranModule } from './tran.module';
//service
import { CommonModule } from '@angular/common';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Media } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { loginGuard } from './_guards';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { JwtInterceptor } from './service/jwt.interceptor';
import { LoadingService } from './service/loading.service';
@NgModule({
  declarations: [AppComponent, SelectModalComponent],
  // entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranModule,
    NgxUiLoaderModule,
    ModalModule.forRoot(),
    IonicSelectableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    LoadingService,
    AndroidPermissions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    StatusBar,
    SplashScreen,
    AppMinimize,
    FileChooser,
    Base64,
    FilePath,
    Media,
    File,
    InAppBrowser,
    Badge,
    NativeAudio,
    FileOpener,
    loginGuard,
    AppComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
