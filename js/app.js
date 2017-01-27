import { Observable } from 'rxjs/Observable';
import './rxjs-operators';

// DOM references
let button = document.querySelector('button');
let body = document.querySelector('body');

// state
let lightsOn = true;

// Observable
// http://stackoverflow.com/questions/34533158/create-a-toggle-button-with-rxjs
let button$ = Observable.fromEvent(button, 'click')
  .scan ((state, event) => {
    return !state;
  }, lightsOn);

let on$ = button$
  .filter(x => x)
  .mapTo(body);

let out$ = button$
  .filter(x => !x)
  .mapTo(body);

// Observers
let lightsOnObs = {
  next: (x) => {
    addClass(x, 'lights-on');
    removeClass(x, 'lights-out');
  },
  error: (err) => { console.error(err); },
  complete: () => { console.log('stream complete'); }
};

let lightsOutObs = {
  next: (x) => {
    addClass(x, 'lights-out');
    removeClass(x, 'lights-on');
  },
  error: (err) => { console.error(err); },
  complete: () => { console.log('stream complete'); }
};

// Subscription
let onSub = on$.subscribe(lightsOnObs);
let outSub = out$.subscribe(lightsOutObs);

// helper functions
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
