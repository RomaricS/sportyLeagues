import { Component, inject, input, output, signal, effect } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { Season } from '../../models/season.model';

@Component({
  selector: 'app-season-badge',
  imports: [],
  templateUrl: './season-badge.component.html',
  styleUrl: './season-badge.component.scss'
})
export class SeasonBadgeComponent {
  leagueId = input.required<string>();
  close = output();

  private readonly leagueService = inject(LeagueService);

  seasons = signal<Season[]>([]);

  constructor() {
    effect(() => {
      const id = this.leagueId();
      this.leagueService.getSeasonBadges(id).subscribe(seasons => {
        this.seasons.set(seasons);
      });
    });
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  trackLeague(season: Season, index: number): string {
    return `${season.strSeason}-${index}`;
  }
}
