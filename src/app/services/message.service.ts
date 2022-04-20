import { Injectable } from '@angular/core';
import { ToastButton, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

  async success(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'success',
      position: 'top',
      duration: 5000,
    });

    toast.present();
  }

  // É o onFail() do professor
  async showMessage(msg: string, handler?: () => void) {
    let buttons: ToastButton[] = [{ side: 'end', icon: 'close-outline' }];

    if(handler){
      buttons = [
        ...buttons,
        {
          icon: 'refresh-outline',
          side: 'start',
          handler: () => handler(),
        }
      ]
    }

    const toast = await this.toastController.create({
      message : msg,
      color: 'danger',
      position: 'top',
      buttons,
    });
    toast.present();
  }
}
