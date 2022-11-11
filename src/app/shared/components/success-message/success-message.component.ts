import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  showMessages = false;

  success$: Observable<string[]>;

  constructor(public messages: MessagesService) { }

  ngOnInit(): void {
    this.success$ = this.messages.success$
    .pipe(tap(() => {
      this.showMessages = true;
      this.hideMessage();
    }))
    this.hideMessage();
  }

  hideMessage() {
    setTimeout(() => {
      this.showMessages = false;
    }, 5000);
  }
}
