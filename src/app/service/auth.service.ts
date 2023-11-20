import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl: any = environment.apiBaseUrl;
  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private http: HttpClient,
    private storage: StorageService
  ) {}

  post(url: any, data: any) {
    if (url != 'userLogin') {
      url = url + '/' + this.storage.getjson('teachersDetail')[0]['dbname'];
    }
    console.log('data', data);
    return this.http.post(`${this.apiBaseUrl}${url}`, data, {});
  }

  get(url: any) {
    url = url + '/' + this.storage.getjson('teachersDetail')[0]['dbname'];
    return this.http.get(`${this.apiBaseUrl}${url}`, {});
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  classids() {
    let c = this.storage.getjson('classlist');
    let l = [];
    for (let i = 0; i < c.length; i++) {
      l.push(c[i]['id']);
    }

    return l.join(',');
  }

  pdfto64(pdf: any) {
    let promise = new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders().set('type', 'application/pdf');
      let options = {
        headers: httpHeaders,
      };
      this.http
        .get(pdf, options)
        .toPromise()
        .then(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    });
    return promise;
  }

  isiso() {
    if (this.platform.is('ios')) {
      return true;
    } else {
      return false;
    }
  }

  open(url: any) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
    };
    const browser = this.iab.create(url, '_system', options);
    browser.on('loadstart');
  }

  urlify(text: any) {
    var urlRegex =
      /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    return text.replace(urlRegex, function (url: any) {
      let u = url;
      if (u.indexOf('http') == -1) {
        u = 'http://' + u;
      }
      return '<a href="' + u + '">' + url + '</a>';
    });
  }
}
