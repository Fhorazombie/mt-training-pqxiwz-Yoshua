import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farm } from './farm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SelectedFarmService {
  constructor(private http: HttpClient) {}

  getFarms(): Observable<Farm[]> {
    return this.http.get<Farm[]>('assets/json/mock-data.json').pipe(
      map((farms: Farm[]) => {
        farms.map((farm) => (farm.ActiveDate = new Date(farm.ActiveDate)));
        return farms;
      })
    );
  }

  filterByDate(): Observable<Farm[]> {
    return this.http.get<Farm[]>('assets/json/mock-data.json').pipe(
      map((farms: Farm[]) => {
        farms = farms.filter((farm) => {
          let date = new Date(farm.ActiveDate);
          if (date.getFullYear() == 2020) {
            return true;
          } else {
            return false;
          }
        });
        return farms;
      })
    );
  }

  filterByNo(): Observable<Farm[]> {
    return this.http.get<Farm[]>('assets/json/mock-data.json').pipe(
      map((farms: Farm[]) => {
        farms = farms.filter((farm) => {
          let no = farm.FarmNo;
          if (no.startsWith('100')) {
            return true;
          } else {
            return false;
          }
        });
        return farms;
      })
    );
  }

  GetFarm(id): Observable<Farm[]> {
    return this.http.get<Farm[]>('assets/json/mock-data.json').pipe(
      map((farms: Farm[]) => {
        farms = farms.filter((farm) => {
          let no = farm.Id;
          if (no == id) {
            return true;
          } else {
            return false;
          }
        });
        return farms;
      })
    );
  }

  error() {
    return this.http.get<Farm[]>('assets/json/mocks-data.json');
  }
}
