import { Component, Input } from '@angular/core';
import { Tag } from '../../Utilities/Data';

interface ICustomOption {
  totalTagsVisible: number;
  disableShowMore: boolean;
  tagsData: Tag[];
}

@Component({
  selector: 'app-tags',
  //  templateUrl: './tags.component.html',
  template: `
    <div class="flex flex-wrap">
      @for (tag of CustomOption.tagsData.slice(0, CustomOption.totalTagsVisible
      === 0 ? CustomOption.tagsData.length : CustomOption.totalTagsVisible );
      track $index) {
      <button
        class="py-2 my-1 px-4 shadow-md no-underline rounded-full bg-gray-50 font-sans font-semibold text-xs border-blue btn-primary focus:outline-none active:shadow-none mr-2"
        [ngStyle]="{ color: tag.color }"
      >
        {{ tag.lang }}
      </button>

      } @if(CustomOption.totalTagsVisible!==0&&(CustomOption.tagsData.length -
      CustomOption.totalTagsVisible>0)){
 
      <button [disabled]="CustomOption.disableShowMore" (click)="CustomOption.disableShowMore = false;CustomOption.totalTagsVisible = 0 "
        class="py-2 my-1 px-4 shadow-md no-underline rounded-full bg-gray-50 font-sans  text-md font-bold border-blue btn-primary focus:outline-none active:shadow-none mr-2"
      >
        + {{ CustomOption.tagsData.length - CustomOption.totalTagsVisible }}
      </button>

      }
    </div>
  `,
  // styleUrl: './tags.component.css'
  styles: [],
})
export class TagsComponent {
  @Input('CustomOption')
  CustomOption!: ICustomOption;
}
