# FaceBot.Client

## Start
`npm i`

`npm run serve` for running debug environment

## Styles

Component styles should be named meaningfully, for example `.ticket-box` indicating that they are not for general use. 
If a style is a candidate for global styles like `.space-on-top` it should be marked in comments 
/*todo: a candidate for global style*/


## Loading indicator
Mostly it is enough to use `_restService.isLoading()` in views. 
Exception are login method.
There is another case coming on Account page where `_restService.isLoading()` will be hiding other elements on the page. 

##Error catching
General error catching is done  in `rest.service.ts`, additional errors can be caught in calling methods, see `loadAds` in `ad-list.component.ts` 

## Layout
When possible we use Angular Layout https://github.com/angular/flex-layout/wiki

Sometimes, when we use pages from PrimeNg, we can fall back to PrimeNg grid

## PrimeNg

Barcelona (Icons page) https://www.primefaces.org/barcelona-ng/#/utils




