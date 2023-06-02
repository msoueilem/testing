console.log('popup.js loaded');

// register the service worker after checking if the browser support it first
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/background.js')
        .then((reg) => console.log("Service worker registered",reg))
        .catch((err) => console.log("Service worker NOT registered",err ));
}

getPaths = function() {
	debugger;
	// chrome.extension.getBackgroundPage().getQueue(function(res) {
	// 	debugger;
	// 	if (res.queue.length > 0) {
	// 		document.querySelector('.queue .total').innerHTML = `(${res.queue.length})`;
	// 		res.queue.forEach(function (path) {
	// 			html += `<li><span class="host">${path.host}</span>...<span class="filename">${path.filename}</span></li>`;
	// 		});

	// 		document.querySelector('.queue ul').innerHTML = html;
	// 	} else {
	// 		document.querySelectorAll('button').forEach((el) => {
	// 			el.setAttribute('disabled','disabled');
	// 		})
	// 	}

	// 	if(res.single) {
	// 	}
	// }, true)
	document.querySelector('.active ul').innerHTML = `<li><span class="host">${res.single.host}</span>...<span class="filename">${res.single.filename}</span><div class="loader"></div></li>`;
	document.querySelector('.active').style.display = 'block';
}();

chrome.extension.getBackgroundPage().addEventListener('done-path', function(e){
	document.querySelector('.active ul').classList.add('done');
	setTimeout(function() {
		document.querySelector('.active').style.display = 'none';
	}, 2000);
});

chrome.extension.getBackgroundPage().addEventListener('done-queue', function(e){
	setClearedState();
	chrome.extension.getBackgroundPage().updateContextMenu();
});

document.querySelector('.scorch-all').addEventListener('click', function(event) {
	document.querySelectorAll('button').forEach((el) => {
		el.setAttribute('disabled','disabled');
	});
	event.target.innerHTML = 'Scorch in progress';
	chrome.extension.getBackgroundPage().scorchAll();
});

document.querySelector('.clear').addEventListener('click', function(event) {
	chrome.extension.getBackgroundPage().clearQueue();
	setClearedState();
});

document.querySelector('.version span').innerHTML = `v${chrome.runtime.getManifest().version}`;

setClearedState = function() {
	document.querySelector('.queue ul').innerHTML = 'No paths queued to scorch';
	document.querySelector('.queue .total').innerHTML = '';
	document.querySelectorAll('button').forEach((el) => {
		el.setAttribute('disabled','disabled');
	});
};
