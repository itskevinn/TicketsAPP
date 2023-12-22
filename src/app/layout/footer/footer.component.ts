import { Component, OnInit } from '@angular/core';
import {LayoutService} from "../service/layout.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public layoutService:LayoutService) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }

}
