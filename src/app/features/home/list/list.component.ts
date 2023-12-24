import { Component, Input } from '@angular/core';
import { ListSchema } from 'src/app/data/models/list/listschema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] 
})
export class ListComponent {
  @Input() list!: ListSchema;
  constructor() { }

  ngOnInit(): void {
  }
}
