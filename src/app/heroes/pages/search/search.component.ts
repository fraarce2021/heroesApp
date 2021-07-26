import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent  {

  term:string='';
  heroes: Hero[] = [];
  selectedHero!: Hero;

  constructor(private heroesService:HeroesService) { }

  searching():void{
      this.heroesService.getSuggestion(this.term)
      .subscribe(heroes => this.heroes = heroes);
  }

  selectedOption(event: MatAutocompleteSelectedEvent):void{
    const hero: Hero = event.option.value;
    this.term = hero.superhero;

    this.heroesService.getHero(hero.id!)
    .subscribe(hero => this.selectedHero = hero);
  }
}
