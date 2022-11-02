import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.interface';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() tasks: Task[] | null = [];
  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';
  @Input() done?: boolean = false;
  @Input() oldType: string;

  constructor(
    private store: BoardStore
  ) { }

  ngOnInit(): void {
  }

  saveChanges(changes: Partial<Task>, id: string) {
    if (!changes.name) {
      return;
    }
    this.store.saveChanges(id, changes).subscribe();
  }

  deleteTask(id: string) {
    this.store.deleteTask(id).subscribe();
  }

  archiveTask(id: string) {
    this.store.changeStatus(id, 'Archive').subscribe();
  }

  addComment(id: string, comment: any) {
    if (!comment.comment) {
      return;
    }
    this.store.addComment(id, comment).subscribe();
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
