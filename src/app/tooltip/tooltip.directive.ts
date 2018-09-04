import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, 
  HostListener, Input, ReflectiveInjector, 
  Renderer2, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';


@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input('tooltip') content: string;
  private componentRef: ComponentRef<TooltipComponent>;
  constructor(private element: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef) {
  }

  @HostListener('click')
  click() {
    this.destroy();
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.element.nativeElement
        }
      }
    ]);
    this.componentRef = this.vcr.createComponent(factory, 0, injector, this.generateNgContent());
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.destroy();
    }
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.componentRef) {
      const clickedOutside = !this.element.nativeElement.contains(targetElement);
      const clickedTooltip = this.componentRef.instance.tooltipId.nativeElement.contains(targetElement);
      // If we click outside of the button and we didn't click on the tooltip then clear the tooltips
      if (clickedOutside && !clickedTooltip) {
        this.destroy();
      }
    }
  }

  generateNgContent() {
    const element = this.renderer.createText(this.content);
    return [[element]];
  }

  destroy() {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  ngOnDestroy() {
    this.destroy();
  }

}
