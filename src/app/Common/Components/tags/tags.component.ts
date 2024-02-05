import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../Utilities/Data';

interface ICustomOption {
  totalTagsVisible: number;
  disableShowMore: boolean;
  tagsData: Tag[];
  clickable:boolean
}

interface ITagEmit {
  tag: Tag;
  operationType: 'remove' | 'add';
}

@Component({
  selector: 'app-tags',
  //  templateUrl: './tags.component.html',
  template: `
    <div class="flex flex-wrap">
      @for (tag of CustomOption.tagsData.slice(0, CustomOption.totalTagsVisible
      === 0 ? CustomOption.tagsData.length : CustomOption.totalTagsVisible );
      let index = $index; track index) {

      <button
        (click)="emitTag(tag, index)"
        [ngClass]="tag.selected && CustomOption.clickable ? 'border-4 border-indigo-500/100' : null"
        class="py-2 my-1 px-4 shadow-md no-underline rounded-full bg-gray-50 font-sans font-semibold text-xs border-blue btn-primary focus:outline-none active:shadow-none mr-2"
        [ngStyle]="{ color: tag.color }"
      >
        {{ tag.lang }}
      </button>

      } @if(CustomOption.totalTagsVisible!==0&&(CustomOption.tagsData.length -
      CustomOption.totalTagsVisible>0)){

      <button
        [disabled]="CustomOption.disableShowMore"
        (click)="
          CustomOption.disableShowMore = false;
          CustomOption.totalTagsVisible = 0
        "
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

  @Output('emitSelectedtag')
  emitSelectedtag = new EventEmitter<ITagEmit>();

  emitTag(tag: Tag, index: number) {
    let tagData: ITagEmit = {
      tag: tag,
      operationType: this.CustomOption.tagsData[index].selected
        ? 'remove'
        : 'add',
    };
    this.CustomOption.tagsData[index].selected =
      !this.CustomOption.tagsData[index].selected;

    this.emitSelectedtag.emit(tagData);
  }
}
