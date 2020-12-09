import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnChanges {
  @Input() getBySearch: any;
  @Input() getByStatus: any;
  @Input() getByType: any;
  @Input() searchVariables: any;
  title: string = 'Фильтры';
  showMultiple: boolean = false;
  multipleBtnText: string = '';

  toggleMultiple() {
    this.showMultiple = !this.showMultiple;
  }

  ngOnChanges() {
    switch (this.searchVariables.status.length) {
      case 0:
        this.multipleBtnText = '';
        break;
      case 1:
        this.multipleBtnText = this.searchVariables.status[0];
        break;
      default:
        this.multipleBtnText = 'Выбраны ' + this.searchVariables.status.length;
        break;
    }
  }

}
