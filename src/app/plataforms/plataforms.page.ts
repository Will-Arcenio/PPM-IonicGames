import { Component, OnInit } from '@angular/core';
import { PlataformService } from './plataform.service';
import { Plataform } from './plataform.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plataforms',
  templateUrl: './plataforms.page.html',
  styleUrls: ['./plataforms.page.scss'],
})
export class PlataformsPage implements OnInit {
  platforms: Plataform[];
  loading = false;

  constructor(
    private alertController: AlertController,
    private platformsService: PlataformService
  ) { }

  ngOnInit() {
    this.platformsService.findAll();
  }

  loadPlatforms() {
    this.loading = true;
    this.platformsService.findAll().subscribe((platforms) => {
      console.log(platforms);
      this.loading = false;
      this.platforms = platforms;
    });
  }

  async add() {
    const alert = await this.alertController.create({
      header: 'Cadastro de Plataformas',
      inputs: [
        {
          name: 'description',
          placeholder: 'Nome',
        },
        {
          name: 'logo',
          placeholder: 'Logo',
        },
      ],
      buttons: [
        {
          text: 'Salvar',
          handler: (value) => {
            this.loading = true;
            this.platformsService.save(value).subscribe(() => this.loadPlatforms());
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    alert.present();

  }

}
