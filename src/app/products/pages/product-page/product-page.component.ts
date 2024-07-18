import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  public myForm: FormGroup;
  //private fb = inject(FormBuilder) -> Another way of injecting
  public color: string;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6), Validators.email]],
    });

    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }

  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));;
  }

}
