import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { catchError, finalize} from 'rxjs/operators';

import { DashboardService } from '../../services/dashboard.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, public modal: ModalService, private dashboard: DashboardService) { 
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: '',
    });
   }

  ngOnInit(): void {
  }

    addBoard() {
      const value = this.form.value;
      this.submitted = true;
      this.dashboard.addBoard(value)
      .subscribe(
        () => {
          this.submitted = false;
          this.modal.close();
        },
        () => (this.submitted = false)
      );
  }

}
