import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectedFarmService } from './selected-farm.service';
import { takeUntil } from 'rxjs/operators';
import { Farm } from './farm';
import {
  EditService,
  ToolbarService,
  SortService,
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'mt-sample-detail',
  templateUrl: './mt-sample-detail.component.html',
})
export class MtSampleDetailComponent {
  @Input() farmSelected: number;

  farm: Farm;

  constructor(private farmservice: SelectedFarmService) {}

  ngOnChanges() {
    this.GetFarm();
  }

  GetFarm() {
    if (this.farmSelected != undefined) {
      this.farmservice.GetFarm(this.farmSelected).subscribe(
        (res) => {
          this.farm = res[0];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
