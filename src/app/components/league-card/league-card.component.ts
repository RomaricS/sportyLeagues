import { Component, input, output } from '@angular/core';
import { League } from '../../models/league.model';

@Component({
  selector: 'app-league-card',
  imports: [],
  templateUrl: './league-card.component.html',
  styleUrl: './league-card.component.scss'
})
export class LeagueCardComponent {
  league = input.required<League>();
  leagueClick = output<string>();

  onLeagueClick(): void {
    this.leagueClick.emit(this.league().idLeague);
  }
}
