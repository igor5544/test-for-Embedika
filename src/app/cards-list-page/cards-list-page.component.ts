import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-cards-list-page',
  templateUrl: './cards-list-page.component.html',
  styleUrls: ['./cards-list-page.component.scss']
})

export class CardsListPageComponent implements OnInit {
  title = 'AniList';
  media: any;
  pageInfo: any;
  loading = true;
  error: any;
  timer: any;
  status: string[] = [];
  variables = {
    page: 1,
    perPage: 5,
    search: '',
    status: this.status,
    type: '',
  }

  getPrevPage() {
    this.variables.page -= 1;
    this.getPage();
  }

  getNextPage() {
    this.variables.page += 1;
    this.getPage();
  }

  getBySearch(evt: any) {
    this.variables.search = evt.target.value;
    this.getPageWithDebounce()
  }

  getByType(evt: any) {
    this.variables.type = evt.target.value;
    this.getPageWithDebounce()
  }

  getByStatus(evt: any) {
    const value: string = evt.target.value;
    const statusList = this.variables.status;

    console.log(evt.target.checked);
    if (evt.target.checked) {
      statusList.push(value);
    } else {
      const index = statusList.indexOf(value);
      statusList.splice(index, 1);
    }

    this.getPageWithDebounce();
  }

  get page() {
    return this.variables.page;
  }

  constructor(private apollo: Apollo) {
  }

  getPageWithDebounce() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.variables.page = 1;
      this.getPage();

      localStorage.setItem('variables', JSON.stringify(this.variables));
    }, 1000);
  }

  getPage() {
    if (!this.loading) this.loading = true;

    const media = this.variables.search.length > 0 ? 'search: "' + this.variables.search + '" ' : '';
    const status = this.variables.status.length > 0 ? 'status_in: [' + this.variables.status.join() + '] ' : '';
    const type = this.variables.type.length > 0 ? 'type: ' + this.variables.type + ' ' : '';

    let mediaVariables = "(" + media + status + type + ")";
    mediaVariables = mediaVariables.length > 2 ? mediaVariables : '';

    this.apollo
      .watchQuery({
        query: gql`
      {
        Page (page: ${this.variables.page}, perPage: ${this.variables.perPage}) {
        pageInfo {
          currentPage
          hasNextPage
          perPage
          total
        }
        media ${mediaVariables} {
          id
          title {
            romaji
          }
          type
          status
        }
      }
      }
      `
      })
      .valueChanges.subscribe((result: any) => {
        if (this.error) this.error = null;
        this.media = result?.data.Page.media;
        this.pageInfo = result?.data.Page.pageInfo;
        this.loading = result.loading;
      }, (error) => {
        this.loading = error.loading;
        this.error = error;
      });
  }

 ngOnInit() {
    if (localStorage.getItem('variables')) {
      const data: any = localStorage.getItem('variables');
      this.variables = JSON.parse(data);
    }

    this.getPage();
  }

  ngOnDestroy() {
    localStorage.setItem('variables', JSON.stringify(this.variables));
  }
}
