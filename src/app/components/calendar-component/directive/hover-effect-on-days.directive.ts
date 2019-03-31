import { Directive, ElementRef,Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEffectOnDays]'
})
export class HoverEffectOnDaysDirective {

  constructor(private elRef:ElementRef,private renderer:Renderer2) { }

  @HostListener('mouseenter') mouseover(eventData:Event){
      if(!(this.elRef.nativeElement.classList.contains('disableDates')) )
        {
          this.renderer.addClass(this.elRef.nativeElement,'on_hover_on_day')
        }

      // if(this.elRef.nativeElement.classList.contains('disableDates') && (window.innerWidth>=601))
      //   this.renderer.setStyle(this.elRef.nativeElement,'cursor','not-allowed');
  }

  @HostListener('mouseleave') mouseleave(eventData:Event){

    if(!(this.elRef.nativeElement.classList.contains('disableDates')))
        {
        this.renderer.removeClass(this.elRef.nativeElement,'on_hover_on_day')
        }
          
  }

}
