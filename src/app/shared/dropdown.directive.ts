import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{

  @HostBinding('class.open') setClass = false;

  constructor( ) {}

  ngOnInit(): void {
  }

  @HostListener('click') onClick(): void {
    this.setClass = !this.setClass;
  }

}
