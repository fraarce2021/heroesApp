import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroImage',
  // pure: false
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): unknown {

    if(!hero.id){
      return 'assets/no-image.png';
    }
    if(hero.alt_img){
      return hero.alt_img;
    }
    return `assets/heroes/${hero.id}.jpg`;
  }

}
