import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import { AlertController} from '@ionic/angular';
import {TranslateConfigService} from '../service/translate-config.service';

import { Observable, fromEvent, merge, of} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: "root" })
export class JwtInterceptor implements HttpInterceptor {
    cancel:any;
    public appIsOnline$!: Observable<boolean>;
    constructor(public alertCtrl: AlertController,private translate: TranslateConfigService ){
        this.translate.getparam('cancel').then((v:any)=>this.cancel=v)
        this.initConnectivityMonitoring()
    }

    private initConnectivityMonitoring() {

        if (!window || !navigator || !('onLine' in navigator)) return;
    
        this.appIsOnline$ = merge(
          of(null),
          fromEvent(window, 'online'),
          fromEvent(window, 'offline')
        ).pipe(map(() => navigator.onLine))
    
      }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let u:any = request.url
        if(u){
            u = u.split('api/')
            
            console.log(u)
            if(u.length==2){
                u = u[1].split('/')
                if(u.length==2){
                    u = u[0]
                }
            }
        }
        return next.handle(request)
        .pipe(tap ((r:any)=>{
            r = r['body']
            try {
                if(r['status'] !== undefined){
                    if(!r['status']){
                        if(u!='getteacherflashmessage' ){
                            this.getmsg(r)
                        }
                        
                    }
                }
            } catch (error) {
                try {
                    if(r['STATUS'] != undefined){
                        if(!r['STATUS']){
                            if(u!='getteacherflashmessage'){
                                this.getmsg(r)
                            }
                        }
                    }
                } catch (error) {
                    
                }
            }
            
            
            // if(result['body'] != undefined){
            //     if(result['body']['statusCode'] != undefined){
            //         if(result['body']['statusCode']!=200 && result['body']['statusCode']!=100){
            //             if(result['body']['message']!=undefined){
                           
            //             }
            //         }
            //     }
            // }
        },(error:any)=>{
            console.log(error)
            if(error['statusText']=='Unknown Error'){
             this.appIsOnline$.subscribe(res=>{
                 if(!res){
                     this.show('Please Check Your Internet Connection')
                 }else{
                     this.show("Contact Support Team")
                 }
             })
            }else{
             this.show("Contact Support Team")
            }
            
             // if(error['error']['message']=='Token error: jwt expired' || error['error']['message']=='Unauthorized' ){
             //     sessionStorage.clear()
             //     location.reload();
             // }
             //console.log(error) 
        }),finalize(()=>{
           
        }));
    }

    getmsg(r:any){
        if(r['message'] != undefined){
          
                this.show(r['message'])
            
        }
        if(r['MESSAGE'] != undefined){
        
                this.show(r['MESSAGE'])
            
        }
     }
    
        async show(msg:any)
        {
          let alert = await this.alertCtrl.create({
            header:msg,
            buttons: [
              {
                text: this.cancel,
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              }]
          })
          await alert.present();
        }

    
}