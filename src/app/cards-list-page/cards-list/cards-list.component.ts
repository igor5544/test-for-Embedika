import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})

export class CardsListComponent {
  @Input() loading: any;
  @Input() error: any;
  @Input() media: any;
  @Input() pageInfo: any;
  @Input() currentPage: any;
  @Input() getPrevPage: any;
  @Input() getNextPage: any;

  title: string = 'Media list';
}
