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
      this.htmlElement.nativeElement.innerText = 'Ready to submit!';
      return;
      }

    const errors = Object.keys(this._errors);
    console.log(errors)

    switch (true) {
      case errors.includes('required'):
        this.htmlElement.nativeElement.innerText = 'This field is required.';
        break;

      case errors.includes('minlength'):
        const min = this._errors!['minlength']['requiredLength'];
        const current = this._errors!['minlength']['actualLength'];

        this.htmlElement.nativeElement.innerText = `Minimum ${current}/${min} characters.`;
        break;

      case errors.includes('email'):
        this.htmlElement.nativeElement.innerText = 'The email is incorrect.';
        break;

      default:
        break;
    }

    // if ( errors.includes('required') )  {
    //   this.htmlElement.nativeElement.innerText = 'This field is required.';
    //   return;
    // }

    // if ( errors.includes('minlength') )  {
    //   const min = this._errors!['minlength']['requiredLength'];
    //   const current = this._errors!['minlength']['actualLength'];

    //   this.htmlElement.nativeElement.innerText = `Minimum ${current}/${ min } caracteres.`;
    //   return;
    // }

    // if ( errors.includes('email') )  {
    //   this.htmlElement.nativeElement.innerText = 'The email is incorrect.';
    //   return;
    // }

    // switch (errors.includes('error')) {
    //   case ('required'):
    //     this.htmlElement.nativeElement.innerText = 'This field is required.';
    // }
  }
}
