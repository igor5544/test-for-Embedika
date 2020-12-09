import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: any;
  @Input() pageInfo: any;
  @Input() getPrevPage: any;
  @Input() getNextPage: any;
}
