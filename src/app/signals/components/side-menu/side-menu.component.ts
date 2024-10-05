import { Component, signal } from '@angular/core';


interface MenuItem{
  title:string;
  router:string;
}


@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  //signals en angular
  public menuItems = signal<MenuItem[]>([
    {title:'Contador', router:'counter'},
    {title:'Usuario', router:'user-info'},
    {title:'Mutaciones', router:'properties'},
  ]);

  // public menuItems: MenuItem[] = [
  //   {title:'Contador', router:'counter'},
  //   {title:'Usuario', router:'user-info'},
  //   {title:'Mutaciones', router:'properties'},
  // ];

}
