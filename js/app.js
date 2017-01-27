import { Observable } from 'rxjs/Observable';
import './rxjs-operators';

// DOM references
let button = document.querySelector('button');
let body = document.querySelector('body');

// State
let lightsOn = true;

// Observable
// Streams of values, transformed with RxJS operators:
// scan, filter, mapTo
// http://stackoverflow.com/questions/34533158/create-a-toggle-button-with-rxjs
let button$ = Observable.fromEvent(button, 'click')
  .scan ((state, event) => {
    return !state;
  }, lightsOn);

let on$ = button$
  .filter(x => x)
  .mapTo({
    'el': body,
    'classToAdd': 'lights-on',
    'classToRemove': 'lights-out'
  });

let out$ = button$
  .filter(x => !x)
  .mapTo({
    'el': body,
    'classToAdd': 'lights-out',
    'classToRemove': 'lights-on'
  });

// Observable
// What to do with the streams
let lightsObservable = {
  next: (x) => {
    addClass(x.el, x.classToAdd);
    removeClass(x.el, x.classToRemove);
  },
  error: (err) => { console.error(err); },
  complete: () => { console.log('stream complete'); }
};

// Subscription
// Connection between observer and observables
let onSub = on$.subscribe(lightsObservable);
let outSub = out$.subscribe(lightsObservable);

// Helper functions to add or remove css classes
// http://youmightnotneedjquery.com/
function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' +
    className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
