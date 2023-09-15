import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx";
import {AuthService} from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class FilesService {
  
    constructor(private file: File,private platform: Platform,private auth: AuthService) {
        this.platform.ready().then(() => {
   
            this.checkdir()
        })
     }
    

     checkdir(){
        try {
          console.log(this.file.externalDataDirectory+'schooltree')
          this.file.checkDir(this.file.externalDataDirectory, 'schooltree').then((response:any) => {
            console.log('Directory exists'+response);
          }).catch((err:any) => {
            console.log('Directory doesn\'t exist'+JSON.stringify(err));
            this.file.createDir(this.file.externalDataDirectory, 'schooltree', false).then((response:any) => {
              console.log('Directory create'+JSON.stringify(response));
            }).catch((err:any) => {
              console.log('Directory no create'+JSON.stringify(err));
            }); 
          });
        } catch (error) {
            console.log(error)
        }
      }

      checkfile(filename:any){
        return this.file.checkFile(this.file.externalDataDirectory,'schooltree/'+filename)
      }

      filecopy(p1:any,f1:any){
        console.log(p1,f1)
        return this.file.copyFile(p1,f1,this.file.externalDataDirectory+'schooltree/',f1)
      }

      filepath(){
        return (this.file.externalDataDirectory+'schooltree/').replace(/file:\/\//g, '')
      }

      resolveLocalFilesystemUrl(img:any){
        return this.file.resolveLocalFilesystemUrl(img)
      }
      
      
      read(file:any){
        return this.file.readAsDataURL(this.file.externalDataDirectory, 'schooltree/'+file)
      }

      removefile(file:any){
        try {
          this.file.removeFile(this.file.externalDataDirectory, 'schooltree/'+file).then((res:any)=>{
            console.log(res)
          },(err:any)=>{
            console.log(err)
          })
        } catch (error) {
          
        }
      }

      download(filename:any,imag:any) {
      
        /// contentType = image/png
       //let imag = `base64`
   
       let realData = imag.split(",")[1];
       let contentType = imag.split(",")[0].replace(';base64','');
       contentType = contentType.replace('data:','');
       let blob = this.b64toBlob(realData, contentType);
       try {
        return this.file.writeFile(this.file.externalDataDirectory, 'schooltree/'+filename,blob)
       } catch (error) {
        return false
       }
       
       
     }
   
    
   
     b64toBlob(b64Data:any, contentType:any) {
       contentType = contentType || '';
       var sliceSize = 512;
       var byteCharacters = atob(b64Data);
       var byteArrays = [];
   
       for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         var slice = byteCharacters.slice(offset, offset + sliceSize);
   
         var byteNumbers = new Array(slice.length);
         for (var i = 0; i < slice.length; i++) {
           byteNumbers[i] = slice.charCodeAt(i);
         }
   
         var byteArray = new Uint8Array(byteNumbers);
   
         byteArrays.push(byteArray);
       }
   
       var blob = new Blob(byteArrays, {type: contentType});
       return blob;
     }


}