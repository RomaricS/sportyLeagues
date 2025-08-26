import { Component, inject, input, output, signal, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeagueService } from '../../services/league.service';
import { Season } from '../../models/season.model';

@Component({
  selector: 'app-season-badge',
  imports: [],
  templateUrl: './season-badge.component.html',
  styleUrl: './season-badge.component.scss',
  host: {
    '(document:keydown.escape)': 'close.emit()',
    '[attr.role]': '"dialog"',
    '[attr.aria-modal]': 'true',
    '[attr.aria-label]': '"Season badges modal"'
  }
})
export class SeasonBadgeComponent implements OnInit {
  leagueId = input.required<string>();
  close = output();

  private readonly leagueService = inject(LeagueService);
  private readonly destroyRef = inject(DestroyRef);
  
  seasons = signal<Season[]>([]);

  ngOnInit() {
    this.leagueService.getSeasonBadges(this.leagueId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(seasons => {
        this.seasons.set(seasons);
      });
  }
}
