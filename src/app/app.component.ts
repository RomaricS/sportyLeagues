import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeaguesListComponent } from './components/leagues-list/leagues-list.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LeaguesListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sporty Leagues';
}
