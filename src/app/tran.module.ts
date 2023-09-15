import { NgModule } from '@angular/core';

import { HttpClientModule,HttpClient  } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './service/translate-config.service';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}






@NgModule({

  imports: [HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],exports:[
    TranslateModule
  ],
  providers: [TranslateConfigService],
 
})
export class TranModule { }
