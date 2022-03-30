import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';

import { GamesApiService } from '../games-api.service';
import { Genero } from '../games.model';

@Component({
  selector: 'app-games-register',
  templateUrl: './games-register.page.html',
  styleUrls: ['./games-register.page.scss'],
})
export class GamesRegisterPage implements OnInit{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gamesApiService: GamesApiService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: ['', Validators.required],
      lancamento: [''],
      genero: [Genero.ACAO, Validators.required],
      foto: ['', Validators.required],
    });

    const id = +this.activatedRoute.snapshot.params.id;
    if (id) {
      this.gamesApiService.findById(id).subscribe((game) => {
        if(game) {
          this.form.patchValue({
            ...game,
          });
        }
      });
    }
  }

  salvar() {
    this.gamesApiService.save(this.form.value).subscribe(
      () => this.router.navigate(['games-list'])
    );
  }
}
