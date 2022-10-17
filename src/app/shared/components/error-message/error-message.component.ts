import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;

  constructor(public messages: MessagesService) { }

  ngOnInit(): void {
    this.errors$ = this.messages.errors$
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
