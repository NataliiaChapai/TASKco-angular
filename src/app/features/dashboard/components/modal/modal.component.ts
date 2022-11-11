import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Board } from '../../models/board.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {

  @Input() description = false;
  @Input() submitted = false;
  @Input() title: string;
  @Input() action: string;
  @Output() showModal = new EventEmitter<boolean>();
  @Output() formData = new EventEmitter<Partial<Board>>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: '',
    });
  }

  ngOnInit(): void {}

  passFormData() {
    const data = this.form.value;
    this.formData.emit(data);
  }

  closeModal() {
    this.showModal.emit(false);
  }

}
