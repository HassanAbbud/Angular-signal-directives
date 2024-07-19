import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = "red";
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors ( value: ValidationErrors | undefined | null){
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = "Hello world";
  }

  setStyle(){
    if(!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(){
    if ( !this.htmlElement )return;

    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = '';
      return;
      }

    const errors = Object.keys(this._errors);
    console.log(errors)

      if ( errors.includes('required') )  {
        this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
        return;
      }
    }
    //TODO manage other errors

}
