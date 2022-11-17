import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() title: string;
  @Output() showModal = new EventEmitter<boolean>();
  @Output() confirmation = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {}

  toAgree() {
    this.confirmation.emit(true);
  }

  toCancel() {
    this.confirmation.emit(false);
  }

  closeModal() {
    this.showModal.emit(false);
  }
}
