import { Component, inject, signal, computed, effect } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { League } from '../../models/league.model';
import { LeagueCardComponent } from '../league-card/league-card.component';
import { SeasonBadgeComponent } from '../season-badge/season-badge.component';

@Component({
  selector: 'app-leagues-list',
  imports: [LeagueCardComponent, SeasonBadgeComponent],
  templateUrl: './leagues-list.component.html',
  styleUrl: './leagues-list.component.scss'
})
export class LeaguesListComponent {
  private readonly leagueService = inject(LeagueService);

  // Signal-based state
  searchTerm = signal('');
  selectedSport = signal('');
  selectedLeagueId = signal<string | null>(null);
  showSeasonBadge = signal(false);

  // Data signals
  leagues = this.leagueService.getAllLeaguesSignal();
  sports = this.leagueService.getUniqueSportsSignal();

  // Computed filtered leagues
  filteredLeagues = computed(() => {
    const leagues = this.leagues();
    const search = this.searchTerm().toLowerCase();
    const sport = this.selectedSport();

    return leagues.filter(league => {
      const matchesSearch = !search ||
        league.strLeague.toLowerCase().includes(search) ||
        (league.strLeagueAlternate && league.strLeagueAlternate.toLowerCase().includes(search));

      const matchesSport = !sport || league.strSport === sport;

      return matchesSearch && matchesSport;
    });
  });

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  onSportChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedSport.set(value);
  }

  onLeagueClick(leagueId: string): void {
    this.selectedLeagueId.set(leagueId);
    this.showSeasonBadge.set(true);
  }

  onCloseSeasonBadge(): void {
    this.showSeasonBadge.set(false);
    this.selectedLeagueId.set(null);
  }
}
