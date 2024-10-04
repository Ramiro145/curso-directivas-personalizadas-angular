import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

//tenemos acceso al host (elemento donde esta colocado)
@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{


  private htmlElement?: ElementRef<HTMLElement>

  private _color:string = 'red';

  private _errors?: ValidationErrors | null;


  @Input()
  //propiedad para establecer
   set color(value:string){
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined){
    this._errors = value;
    console.log(value)
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    // console.log('constructor de la directiva')
    // console.log(el)
    this.htmlElement = el;
  }

  ngOnInit(): void {
    // console.log('directiva - oninit')
    this.setStyle()
  }

  setStyle(){
    if(!this.htmlElement)return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void{
    if(!this.htmlElement) return;
    if(!this._errors){
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if(errors.includes('minlength')){
      this.htmlElement.nativeElement.innerText = `Debes ingresar al menos ${this._errors['minlength'].requiredLength} caracteres, tienes ${this._errors['minlength'].actualLength} caracteres`;
      return;
    }

    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = `El valor debe ser un email`;
      return;
    }

  }

}
