import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[appWithoutSpace]'
})

export class WithoutSpaceDirective{
    key;
    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent){
        this.key = event.keyCode;
        console.log(this.key);
        if (this.key == 32)
        {
            event.preventDefault(); //method cancels the event
        }
    }
}