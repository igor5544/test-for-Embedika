import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})

export class CardPageComponent implements OnInit {
  data: any;
  actualData: any = {};
  loading = true;
  error: any;
  mediaId: any;
  extraKeys: any = ['id', 'title', 'bannerImage', 'description', '__typename'];

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.route.params.subscribe((params: any) => this.mediaId = params.id);
  }

  getActualData() {
    for (let key in this.data) {
      if (this.extraKeys.indexOf(key) === -1 && this.data[key] !== null) {
        this.actualData[key] = this.data[key];
      }
    }
  }

  fixTestCase(text: any) {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      i === 0 ? newText += text[i].toUpperCase() :
        text[i].charCodeAt(0) !== text[i].toUpperCase().charCodeAt(0) ?
          newText += text[i] : newText += ` ${text[i].toLowerCase()}`
    }

    return newText;
  }

  clearDiscription = (text: any) => text.replace(/<\/?[a-zA-Z]+>/gi,'');

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
        {
          Media (id: ${this.mediaId})  {
            id
            title {
              romaji
              native
            }
            bannerImage
            type
            status
            format
            season
            episodes
            duration
            chapters
            volumes
            countryOfOrigin
            description
          }
        }
      `
      })
      .valueChanges.subscribe((result: any) => {
        if (this.error) this.error = null;
        this.data = result?.data.Media;
        this.loading = result.loading;

        this.getActualData();
      }, (error) => {
        this.loading = error.loading;
        this.error = error;
      });
  }
}
