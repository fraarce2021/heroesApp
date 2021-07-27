import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marve - Comics',
    },
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  save() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    if (this.hero.id) {
      this.heroesService
        .updateHero(this.hero)
        .subscribe((hero) => this.showSnackbar('Hero Update!'));
    } else {
      this.heroesService.addHero(this.hero).subscribe((hero) => {
        this.router.navigate([`/heroes/edit`, hero.id]);
        this.showSnackbar('Hero Created!');
      });
    }
  }

  delete(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.hero },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(this.hero.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  showSnackbar(message: string): void {
    this._snackBar.open(message, 'Okey!', {
      duration: 2500,
    });
  }
}
