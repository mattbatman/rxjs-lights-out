// DOM references
let button = document.querySelector('button');
var body = document.querySelector('body');

// State
var lightsOn = true;

// Event listener
button.addEventListener('click', lightsClicked, false);

// Event handling function
function lightsClicked(e) {
  toggleLights(e, lightsOn);
  lightsOn = !lightsOn;
}

function toggleLights(e, isOn) {
  if (isOn) {
    flipClass({
      'el': body,
      'classToAdd': 'lights-out',
      'classToRemove': 'lights-on'
    })
  } else {
    flipClass({
      'el': body,
      'classToAdd': 'lights-on',
      'classToRemove': 'lights-out'
    })
  }
}

function flipClass(x) {
  addClass(x.el, x.classToAdd);
  removeClass(x.el, x.classToRemove);
}

// Helper functions to add or remove css classes
// Same as in app.js
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
