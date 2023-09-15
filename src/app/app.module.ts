import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TranModule } from './tran.module';

//service
import { CommonModule } from '@angular/common';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Media } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { JwtInterceptor } from './service/jwt.interceptor';
import { LoadingService } from './service/loading.service';

@NgModule({
  declarations: [AppComponent],
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
  ],
  exports: [],
  providers: [
    LoadingService,
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
  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
// @Component({
//   standalone: true,
//   imports: [IonicSelectableComponent],
// })
export class AppModule {}
