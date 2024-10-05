import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit , OnDestroy
{

  public inter:ReturnType<typeof setInterval > | undefined;

  ngOnDestroy(): void {
    clearInterval(this.inter)
  }

  ngOnInit(): void {

    this.inter = setInterval(() => {
      console.log('first')
    }, 1000);
  }

  public counter = signal(10);

  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  })

  public fullName = computed(()=>`${this.user().first_name} ${this.user().last_name}`)

  //no es diferente a una propiedad computada, se ejecuta la primera
  //vez cuando se crea y después cuando sea usada
  //a diferencia solo se tiene un callback y es lo que se ejecutara
  public userChangedEffect = effect(()=>{
    //dependencias entiéndanse como signals dentro
    //y solo cambiara por las dependencias que estén dentro
    console.log(`${this.user().first_name} - ${this.counter()}`)
    //hay limpieza automática
  });

  increaseBy(value:number){
    //dispara el efecto debido a que counter esta dentro
    this.counter.update(current=> current + value);
  }

  onFieldUpdated(field:keyof User, value:string){

    //! potencialmente peligroso usar el field
    // this.user.set({
    //   ...this.user(),
    //   [field]:value
    // })

    //return implícito con ()
    // this.user.update(current => ({
    //   ...current,
    //   [field]:value
    // }))

    //* usando update con signal podemos obtener el valor
    //* anterior al contrario de set que solo seteamos lo
    //* deseado, después dependiendo de la key del input
    //* establecemos el nuevo valor sin modificar los demás
    ///* campos y retornamos de una forma mas segura
    this.user.update(current => {

      //* al modificar directamente las propiedades del objeto
      //* observable no se detectan cambios con el computed por
      //* mobx-state-tree, por lo que mejor hay que
      //* retornar un nuevo objeto con los valores

      const newUser = structuredClone(current)

      switch(field){
        case 'email':
          newUser.email = value;
          break;
        case 'first_name':
          newUser.first_name = value;
          break;
        case 'last_name':
          newUser.last_name =value;
          break;
        case 'avatar':
          newUser.avatar = value;
          break
        case 'id':
          newUser.id = Number(value);

      }

      return newUser;
    })

  }


}
