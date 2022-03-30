import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesApiService } from '../games-api.service';
import { Genero } from '../games.model';
import { MessageService } from '../../services/message.service';

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
    private gamesApiService: GamesApiService,
    private messageService: MessageService
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
      this.findById(id);
    }
  }

  findById(id: number) {
    this.gamesApiService.findById(id).subscribe(
      (game) => {
        if(game) {
          this.form.patchValue({
            ...game,
          });
        }
    },
    () => this.messageService.showMessage(`Erro ao buscar o jogo '${id}'.`, () => this.findById(id))
    );
  }

  salvar() {
    // const nome = this.form.value.nome;
    const { nome } = this.form.value;

    this.gamesApiService.save(this.form.value).subscribe(
      () => this.router.navigate(['games-list']),
      () => this.messageService.showMessage(`Erro ao salvar o jogo '${nome}'.`, () => this.salvar())
    );
  }
}
