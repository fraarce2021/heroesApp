import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import  {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class HeroComponent implements OnInit {

  hero!: Hero;

  constructor(private activatedRoute:ActivatedRoute, private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id})=> this.heroesService.getHero(id))
    )
    .subscribe(hero=>this.hero=hero)
  }

  goBack():void{
    this.router.navigate(['/heroes/list']);
  }

}
