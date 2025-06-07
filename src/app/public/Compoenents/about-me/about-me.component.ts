import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
  standalone: true,

})
export class AboutMeComponent {
  Projects:any[]=[]

  constructor(){
  window.scrollTo(0, 0);

}

showDetails(project:any){

}

loadMore(){
  
}

}
