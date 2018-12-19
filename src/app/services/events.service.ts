import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageEvent } from '../beans/message-event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly messages: Subject<MessageEvent>;

  constructor() {
    this.messages = new Subject<MessageEvent>();
  }

  public publish(messageEvent: MessageEvent): void {
    this.messages.next(messageEvent);
  }

  public subscribe(): Observable<MessageEvent> {
    return this.messages.asObservable();
  }

}
