import { Component } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  template: `
    <div class="flex  flex-wrap justify-center items-center ">
      <img src="./assets/notfound.jpeg" alt="" height="200" width="200" />
    </div>
  `,
  styles: '',
})
export class NoData {}
