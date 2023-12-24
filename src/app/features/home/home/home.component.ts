import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { ListSchema } from 'src/app/data/models/list/listschema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today: number = Date.now();
  lists: ListSchema[];

  constructor(private apiService: ApiService) {
    this.lists = [];
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => this.lists = response['list'],
      error => console.log('Ups! we have an error: ', error)
    );
  }
}
