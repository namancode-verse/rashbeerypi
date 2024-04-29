import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import $ from 'jquery';

@Injectable({
     providedIn: 'root'
})
export class SpinnerService {
     constructor(private _elemRef: ElementRef) {}

     public show(spinnerId: any) {
          let id = '#' + spinnerId;
          $(this._elemRef.nativeElement).find(id).show();
          $(this._elemRef.nativeElement).find('.mouse-event-block').show();
     }

     public hide(spinnerId: any) {
          let id = '#' + spinnerId;
          $(this._elemRef.nativeElement).find(id).hide();
          $(this._elemRef.nativeElement).find('.mouse-event-block').hide();
     }

     public onblockEvent() {
          $(this._elemRef.nativeElement).find('.mouse-event-block').show();
     }

     public offblockEvent() {
          $(this._elemRef.nativeElement).find('.mouse-event-block').hide();
     }
}
