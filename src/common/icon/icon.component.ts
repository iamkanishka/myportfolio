import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconType } from './icontypes';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  standalone: true,
})
export class IconComponent {
  iconUrl: string = '';

  private sizeMap = {
    sm: 8,
    xmd: 10,
    md: 16,
    slg: 20,
    lg: 24,
    xl: 32,
    mxl: 36,
    xxl: 40,
  };

  @Input() class: string = '';
  @Input() name?: IconType;
  @Input() size: 'sm' | 'xmd' | 'md' | 'slg' | 'lg' | 'xl' | 'mxl' | 'xxl' =
    'md';
  @Input() withAdjustableSize?: boolean = true;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['size']) {
      if (!this.name) {
        return;
      }
      this.iconUrl = `icons/${this.name}.svg`;
      this.loadSVG(this.iconUrl);
    }
  }

  private async loadSVG(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load SVG: ${url}`);
      const svgText = await response.text();
      const parser = new DOMParser();
      const svgElement = parser
        .parseFromString(svgText, 'image/svg+xml')
        .querySelector('svg');

      if (svgElement) {
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');

        this.renderer.setStyle(svgElement, 'width', `${this.iconSize}px`);
        this.renderer.setStyle(svgElement, 'height', `${this.iconSize}px`);
        this.renderer.setStyle(svgElement, 'display', 'block');

        const container = this.el.nativeElement.querySelector('.icon');
        if (container) {
          container.innerHTML = '';
          this.renderer.appendChild(container, svgElement);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  get iconSize(): number {
    let sizeDivider = 1;

    if (window.innerWidth > 1025 && window.innerWidth < 1300) {
      sizeDivider = 1.15;
    } else if (window.innerWidth > 991 && window.innerWidth < 1026) {
      sizeDivider = 1.35;
    } else if (window.innerWidth > 601 && window.innerWidth < 992) {
      sizeDivider = 1.3;
    } else if (window.innerWidth < 600) {
      sizeDivider = 1.5;
    }

    if (!this.withAdjustableSize) {
      sizeDivider = 1;
    }

    return (this.sizeMap[this.size] || 16) / sizeDivider;
  }
}
