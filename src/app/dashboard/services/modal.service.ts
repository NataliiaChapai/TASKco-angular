import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal = false;
  showEditModal = false;

  constructor() { }

  show() {
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  showEdit() {
    this.showEditModal = true;
  }

  closeEdit() {
    this.showEditModal = false;
  }
}
