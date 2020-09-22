import { HostListener } from '@angular/core';
import {Directive} from "@angular/core"

@Directive({
    selector: '[appCnic]'
})

export class CnicDirective{
    key;
    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        this.key = event.keyCode;
        console.log(this.key);
        if ((this.key >= 15 && this.key <= 36) || (this.key >=41 && this.key <= 47) || (this.key >= 58 && this.key <= 95) || (this.key >= 106)) {
          event.preventDefault();  //method cancels the event
        }
      }
    public mask = {
        guide: true,
        showMask: true,
        mask: [/\d/,/\d/,/\d/,/\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
      };
}