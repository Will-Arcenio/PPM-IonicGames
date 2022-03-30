import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

  // É o onFail() do professor
  async showMessage(msg: string, handler: () => void) {
    const toast = await this.toastController.create({
      message : msg,
      color: "danger",
      duration: 4000,
      buttons: [
        {
          icon: "refresh-outline",
          side: "start",
          handler: () => handler(),
        },
        {
          side: "end",
          icon: "close-outline"
        }
      ]
    });
    toast.present();
  }
}
