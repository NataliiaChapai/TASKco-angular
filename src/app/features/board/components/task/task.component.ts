import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Task } from '../../models/task.interface';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {

  @Input() tasks: Task[] | null = [];
  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';
  @Input() done?: boolean = false;
  @Input() oldType: string;
  @Input() model: string;
  @Input() taskType: string = '';
  
  editForm: FormGroup;
  commentForm: FormGroup;
  taskId = '';
  toConfirm = false;

  constructor(
    private store: BoardStore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      content: [null],
    });
    this.commentForm = this.fb.group({
      content: [null],
    });
  }

  saveChanges(id: string) {
    const {content} = this.editForm.value;
    if (!content) {
      return;
    }
    this.store.saveChanges(id, {name: content}).subscribe();
    this.editForm.reset();
  }

  toDelete(id: string) {
    this.toConfirm = true;
    this.taskId = id;
  }

  deleteTask(confirmation: boolean) {
    if (confirmation) {
      this.store.deleteTask(this.taskId).subscribe();
    }
    this.toConfirm = false;    
    this.taskId = ''
  }

  archiveTask(id: string) {
    this.store.changeStatus(id, 'Archive').subscribe();
  }

  addComment(id: string) {
    const {content} = this.commentForm.value;
    if (!content) {
      return;
    }
    this.store.addComment(id, {comment: content}).subscribe();
    this.commentForm.reset();
  }

  deleteComment(id: string) {
    this.store.deleteComment(id).subscribe();
  }

  drag(ev: DragEvent, id: string) {
    ev.dataTransfer?.setData("text", id);
    const container = ev.target as HTMLElement;
    this.oldType = container.dataset['type'] as string;
  }

}
