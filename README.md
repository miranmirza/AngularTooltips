# FrontEndProjectMiran

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Install npm modules using `npm install` and then you can use `npm start` which will run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Explanations of the App

The app has one default route /dashboard which contains some Lorem Ipsum text and two buttons. The Lorem Ipsum text was included to ensure that we can test out scroll behaviour.

The app was built using Angular CLI and uses SASS and Bootstrap SASS styling (as instructed). For accessibility HTML5 semantic markup such as the button tag was used. I also decided to use the role attribute on tooltips to ensure they are indentified correctly by screen readers.

Upon pressing a button a tooltip will appear on top and will move to the bottom if scrolled down. Pressing outside of the tooltip or using the escape key will close it. Moreover, when pressing the second button the first tooltip will dissapear leaving only one tooltip visible at time (as instructed).

The tooltips were styled using Bootstrap.

## Notes

This app depends on Angular CLI
