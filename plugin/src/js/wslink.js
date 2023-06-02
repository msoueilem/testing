console.log('wslink.js loaded');

(function() {
	document.querySelector('.ws-link').setAttribute('href','https://chrome.google.com/webstore/detail/' + chrome.runtime.id);
}())
