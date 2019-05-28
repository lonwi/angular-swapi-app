import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, retry, tap, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private timeOut = 15000;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  get(url: string, options?: any): Promise<any> {
    const http = this.http.get(url, options).pipe(
      retry(3),
      timeout(this.timeOut),
      tap(data => console.log('server data', data)),
      catchError((e) => {
        this.presentErrorToast();
        return throwError(e.error || 'Backend server error');
      }),
      finalize(() => console.log('loading bar finish')),
    );
    return http.toPromise();
  }

  async getEndpoint(url: string, endpoint: string, apiKey?: string): Promise<string> {
    try {
      const apiUrl = await `${url}${endpoint}${apiKey ? `?api_key=${apiKey}` : ''}`;
      return apiUrl;
    } catch (e) {
      console.log('error', e);
    }
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Not able to connect to the API.',
      position: 'middle',
      showCloseButton: true
    });
    toast.present();
  }
}
