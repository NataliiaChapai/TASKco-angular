import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // boards$ = [];
  // filter = {
  //   filterByName: '',
  //   sort: ''
  // };
  // isLoaded = false;

  constructor(public modal: ModalService) {
   }

  ngOnInit(): void {
  }

}
