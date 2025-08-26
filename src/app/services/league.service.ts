import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { League, LeaguesResponse } from '../models/league.model';
import { Season, SeasonsResponse } from '../models/season.model';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private readonly ALL_LEAGUES_URL =
    'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';
  private readonly SEASON_BADGES_URL =
    'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=';

  private leaguesCache: Observable<League[]> | null = null;
  private readonly seasonBadgesCache = new Map<string, Observable<Season[]>>();

  private readonly http = inject(HttpClient);

  getAllLeagues(): Observable<League[]> {
    this.leaguesCache ??= this.http
      .get<LeaguesResponse>(this.ALL_LEAGUES_URL)
      .pipe(
        map((response) => response.leagues),
        shareReplay(1)
      );
    return this.leaguesCache;
  }

  getAllLeaguesSignal() {
    return toSignal(this.getAllLeagues(), { initialValue: [] });
  }

  getSeasonBadges(leagueId: string): Observable<Season[]> {
    if (!this.seasonBadgesCache.has(leagueId)) {
      const seasonsObservable = this.http
        .get<SeasonsResponse>(this.SEASON_BADGES_URL + leagueId)
        .pipe(
          map((response) => response.seasons || []),
          shareReplay(1)
        );
      this.seasonBadgesCache.set(leagueId, seasonsObservable);
    }
    return this.seasonBadgesCache.get(leagueId)!;
  }

  getUniqueSports(): Observable<string[]> {
    return this.getAllLeagues().pipe(
      map((leagues) => {
        const sports = leagues.map((league) => league.strSport);
        return [...new Set(sports)].filter((sport) => sport).sort((a, b) => a.localeCompare(b));
      })
    );
  }

  getUniqueSportsSignal() {
    return toSignal(this.getUniqueSports(), { initialValue: [] });
  }
}
