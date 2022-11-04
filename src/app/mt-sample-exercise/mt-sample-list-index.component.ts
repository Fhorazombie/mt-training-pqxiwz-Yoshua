import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { SelectedFarmService } from './selected-farm.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Farm } from './farm';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'mt-sample-list',
  templateUrl: './mt-sample-list-index.component.html',
})
export class MtSampleListIndexComponent {
  @Output() farmSelected = new EventEmitter<{ id: number }>();

  constructor(private farmservice: SelectedFarmService) {}

  ngOnInit(): void {
    this.getFarms();
  }

  dataSource: Farm[];
  selectDisable: boolean = false;
  alerterror: boolean = false;
  rowSelectedId: number;
  errormessage: string;

  FilterByDate() {
    this.farmservice.filterByDate().subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res;
        this.selectDisable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  FilterByNo() {
    this.farmservice.filterByNo().subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res;
        this.selectDisable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFarms() {
    this.farmservice.getFarms().subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res;
        this.selectDisable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectonChange(value) {
    this.selectDisable = true;
    switch (value) {
      case 'date':
        this.FilterByDate();
        break;
      case 'no':
        this.FilterByNo();
        break;
      case 'all':
        this.getFarms();
        break;
    }
  }

  rowSelected(event) {
    this.rowSelectedId = event.data.Id;
    this.farmSelected.emit({ id: this.rowSelectedId });
  }

  error() {
    this.farmservice.error().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err, 'errores');
        this.alerterror = true;
        this.errormessage = err.message;
        setTimeout(() => {
          this.alerterror = false;
        }, 10000);
      }
    );
  }
}
