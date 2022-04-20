import { Pipe, PipeTransform } from '@angular/core';
import { Genero } from '../../games/games.model';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: Genero): string {

    switch (value) {
      case Genero.ACAO:
        return 'Ação';
      case Genero.ARCADE:
        return 'Arcade';
      case Genero.ESPORTES:
        return 'Esportes';
      case Genero.FPS:
        return 'Fps';
      case Genero.PUZZLE:
        return 'Puzzle';
      case Genero.RPG:
        return 'Rpg';
      case Genero.TABULEIRO:
        return 'Tabuleiro';
      default:
        break;
    }
  }

}
