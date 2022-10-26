import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardStore } from '../../services/dashboard.store';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public modal: ModalService,
    private store: DashboardStore
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: '',
    });
  }

  ngOnInit(): void {}

  addBoard() {
    const value = this.form.value;
    this.submitted = true;
    this.store.addBoard(value).subscribe(
      () => {
        this.submitted = false;
        this.modal.close();
      },
      () => (this.submitted = false)
    );
  }
}
