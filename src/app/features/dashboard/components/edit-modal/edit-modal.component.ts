import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Board } from '../../models/board.interface';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  name = '';
  showEditModal = false;

  @Output() onUpdate: EventEmitter<Board> = new EventEmitter<Board>();

  constructor(private fb: FormBuilder, public modal: ModalService) {
    this.form = fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  editBoard() {
    const name = this.form.value;
    this.submitted = true;
    this.onUpdate.emit(name);
  }
}
