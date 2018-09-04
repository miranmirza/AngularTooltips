import { Component, Directive, Inject, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '.tooltip-container'
})
export class TooltipContainerDirective {
}

@Component({
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
    @ViewChild('tooltipId') tooltipId: ElementRef;
    top: string;
    arrowDirection: string;
    arrowLocation: string;

    constructor(@Inject('tooltipConfig') private config) {
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.updateTooltipPosition();
    }

    ngOnInit() {
        this.updateTooltipPosition();
    }

    private updateTooltipPosition() {
        const height = this.config.host.clientHeight;
        const docTop = document.documentElement.clientTop;
        const toolTipMaxHeight = 30;
        let rectTop = this.config.host.getBoundingClientRect().top + window.pageYOffset - docTop;
        // Display the tooltip at the bottom
        if (window.pageYOffset > rectTop - toolTipMaxHeight) {
            this.top = `${rectTop + height}px`;
            this.arrowDirection = `rotateX(180deg)`;
            this.arrowLocation = `0`;
        } else {
            // Display the tooltip on top
            this.top = `${rectTop - height}px`;
            this.arrowDirection = `rotateX(0deg)`;
            this.arrowLocation = `initial`;
        }
    }
}