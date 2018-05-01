import { Directive, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appResizeGreed]'
})
export class ResizeGreedDirective implements OnInit {
  private area = '1/1/2/9';
  constructor(private elem: ElementRef, private route: Router,private ref: ChangeDetectorRef) { 
    console.log(this.route.url);

    if(this.route.url === '/')
      this.elem.nativeElement.style.gridArea = "1/1/2/9";
    else 
      this.elem.nativeElement.style.gridArea = "1/2/2/8";
    
  }
  
  ngOnInit(): void {
  
  }
}
