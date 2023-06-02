console.log('background.js loaded');


// notifUpdate = {
// 	type: 'basic',
// 	title: 'WebMD Scorch Plugin',
// 	message: 'Extension updated to version ' + chrome.runtime.getManifest().version,
// 	iconUrl: '../img/scorch-icon.png',
// 	requireInteraction: false,
// 	buttons: [
// 		{
// 			title: 'View Changelog'
// 		}
// 	]
// };

// notifScorched = {
// 	type: 'basic',
// 	title: 'WebMD Scorch Plugin',
// 	message: 'Purge request sent.',
// 	iconUrl: '../img/scorch-icon.png',
// 	requireInteraction: false,
// };

apiEndpoint = 'https://scorchapi.portal.webmd.com/purge';

token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTUwMDU2OTIsInVzZXJfaWQiOiIxZGI2YmY4NS02NzA5LTQzMTEtOTNhMC0xYjk0NDcyOWZjYTUiLCJlbWFpbCI6InNjb2R5IiwiZ3JvdXBzIjpbIlBST0ZFU1NJT05BTCIsIkNPTlNVTUVSIiwiV0hTIl0sIndlYnNpdGUiOiIifQ.t8yhSbRFTyMaI7RPToto3ObaU3Nk9q3iOizHl4B28uA';

// getQueue = function(cb, truncate) {
// 	let queue = [];

// 	chrome.storage.local.get(['scorchQueue', 'scorchPath'], function(result) {
// 		if(result['scorchQueue'] || result['scorchPath']) {
// 			if(truncate) {
// 				if(result['scorchQueue']) {
// 						result['scorchQueue'].forEach(function(path) {
// 						var url = new URL(path);
// 						queue.push({
// 							host: url.hostname,
// 							filename: url.pathname.split('/')[url.pathname.split('/').length-1]
// 						})
// 					});
// 				}

// 				if(result['scorchPath']){
// 					var url = new URL(result['scorchPath']);
// 					var single = {
// 						host: url.hostname,
// 						filename: url.pathname.split('/')[url.pathname.split('/').length-1]
// 					}
// 				}

// 				cb({
// 					single: single ? single : false,
// 					queue: queue,
// 				})

// 			} else {
// 				if(result['scorchQueue'] || result['scorchPath']){
// 					cb({
// 						single: result['scorchPath'],
// 						queue: result['scorchQueue'] || [],
// 					})
// 				}
// 			}
// 		} else {
// 			cb({single: false, queue: []});
// 		}
// 	});
// };

// enqueueUrl = function(url, cb) {
// 	let queue = [];

// 	getQueue(function(res) {
// 		queue = res.queue;

// 		if (!queue.includes(url)) {
// 			queue.push(url);
// 			chrome.storage.local.set({scorchQueue: queue}, function() {
// 				cb();
// 			});
// 		} else {
// 			alert('This URL is already queued.');
// 			cb();
// 		}
// 	})
// };

// dequeueUrl = function(url, cb) {
// 	let queue = [];

// 	getQueue(function(res) {
// 		queue = res.queue;

// 		if (queue.includes(url)) {
// 			let index = queue.indexOf(url);
// 			queue.splice(index,1);
// 			chrome.storage.local.set({scorchQueue: queue}, function() {
// 				cb();
// 			});
// 		}
// 	})
// };

// clearQueue = function() {
// 	chrome.storage.local.remove(['scorchQueue']);
// 	updateContextMenu();
// };

// handleStorageChange = function() {

// 	getQueue(function(res) {
// 		if (res.queue.length > 0) {
// 			chrome.browserAction.setBadgeText({
// 				text: res.queue.length.toString()
// 			});

// 			chrome.browserAction.setBadgeBackgroundColor({
// 				color: '#b7b5b5'
// 			});

// 			chrome.browserAction.setTitle({
// 				title: res.queue.length.toString() + ' path(s) queued'
// 			})
// 		} else {
// 			chrome.browserAction.setBadgeText({
// 				text: ''
// 			});

// 			chrome.browserAction.setTitle({
// 				title: 'WebMD Scorch Plugin'
// 			})
// 		}
// 	});
// };

// updateContextMenu = function(add) {

// 	if(add) {
// 		chrome.contextMenus.update("1", {
// 			"title": "Remove this file from scorch queue", onclick: function (info) {
// 				let url = info.pageUrl;

// 				dequeueUrl(url, function () {
// 					updateContextMenu();
// 				});
// 			}
// 		});
// 	} else {
// 		chrome.contextMenus.update("1", {
// 			"title": "Add this file to scorch queue", onclick: function (info) {
// 				let url = info.pageUrl;

// 				enqueueUrl(url, function () {
// 					updateContextMenu(true);
// 				});
// 			}
// 		});
// 	}
// };

docPatterns = [
	'https://img.webmd.com/*',
	'https://img.preview.webmd.com/*',
	'https://img.staging.webmd.com/*',
	'https://css.webmd.com/*',
	'https://css.preview.webmd.com/*',
	'https://css.staging.webmd.com/*',
	'https://js.webmd.com/*',
	'https://js.preview.webmd.com/*',
	'https://js.staging.webmd.com/*',
	
	'https://img.lb.wbmdstatic.com/*',
	'https://img.preview.lb.wbmdstatic.com/*',
	'https://img.staging.lb.wbmdstatic.com/*',
	'https://css.lb.wbmdstatic.com/*',
	'https://css.preview.lb.wbmdstatic.com/*',
	'https://css.staging.lb.wbmdstatic.com/*',
	'https://js.lb.wbmdstatic.com/*',
	'https://js.preview.lb.wbmdstatic.com/*',
	'https://js.staging.lb.wbmdstatic.com/*',
];

// Context menu items
chrome.contextMenus.create({
	"title": "Scorch this file", documentUrlPatterns: docPatterns, onclick: function (info) {
		let url = info.pageUrl;

		scorch(url);
	}
});

chrome.contextMenus.create({
	"title": "Scorch this file", contexts: ['image'], targetUrlPatterns: docPatterns, onclick: function (info) {
		let url = info.srcUrl;

		scorch(url);
	}
});

// addAddMenu = function() {
// 	chrome.contextMenus.create({
// 		"title": "Add this file to scorch queue", "id": "1", documentUrlPatterns: docPatterns, onclick: function (info) {
// 			let url = info.pageUrl;

// 			enqueueUrl(url, function() {
// 				getQueue(function(results){
// 					urls = results.queue;

// 					//do clear for these urls
// 					updateContextMenu(true);
// 				});
// 			});
// 		}
// 	});
// };

// addRemoveMenu = function() {
// 	chrome.contextMenus.create({
// 		"title": "Remove this file from scorch queue", "id": "1", documentUrlPatterns: docPatterns, onclick: function (info) {
// 			let url = info.pageUrl;

// 			dequeueUrl(url, function () {
// 				updateContextMenu();
// 			});
// 		}
// 	});
// };

doRequest = function(req, from) {
	let ajax = new XMLHttpRequest();
	let event = new Event('done-' + from);
	let counter = 0;

	chrome.storage.local.get(['scorchUser'], (stg) => {
		req.email = stg.scorchUser;

		ajax.addEventListener('load', function(res){
			clearInterval(loading);
			handleStorageChange();
			// chrome.notifications.create('updateNotif',notifScorched, function(notifId) {
			// 	setTimeout(function() {
			// 		chrome.notifications.clear(notifId);
			// 	}, 3000);

			// 	if (from === 'queue') {
			// 		chrome.storage.local.remove(['scorchQueue']);
			// 	} else {
			// 		chrome.storage.local.remove(['scorchPath']);
			// 	}

			// 	window.dispatchEvent(event);
			// });
		});

		ajax.open('POST', apiEndpoint);
		ajax.setRequestHeader("Content-type", "application/json");
		ajax.setRequestHeader("Authorization", token);

		ajax.send(JSON.stringify(req));

		chrome.browserAction.setBadgeBackgroundColor({
			color: '#ff8d00'
		});
		var loading = setInterval(function() {
			if (counter === 0) {
				counter ++;
				chrome.browserAction.setBadgeText({
					text: '/--'
				});
			} else if (counter === 1) {
				counter++;
				chrome.browserAction.setBadgeText({
					text: '-/-'
				});
			} else {
				chrome.browserAction.setBadgeText({
					text: '--/'
				});
				counter = 0;
			}
		},300)
	});
};

// Scorch a single file
scorch = function(url) {
	const self = this;
	let ajax = new XMLHttpRequest();
	let path = new URL(url);
	let event = new Event('done');
	let req = {
		"domain": path.hostname,
		"resources": path.pathname
	};

	chrome.storage.local.set({scorchPath: url}, function() {
		self.doRequest(req, 'path');
	});
};

// Scorch all files in queue
// scorchAll = function() {
// 	let queue = [];
// 	let req = {
// 		domain: '',
// 		resources: []
// 	};
    
//     // Get queue from storage and build request object from it 
// 	chrome.storage.local.get(['scorchQueue'], (queue) => {
// 		queue['scorchQueue'].forEach((url) => {
// 			let path = new URL(url);

// 			if (req.domain === '') {
// 				req.domain = path.hostname;
// 			}

// 			req.resources.push(path.pathname);
// 		});

// 		req.resources = req.resources.join(',');

// 		this.doRequest(req, 'queue');
// 	});

// };

setUser = function() {
	let user = '';
	chrome.identity.getProfileUserInfo(function(user){
		chrome.storage.local.set({'scorchUser': user.email});
	});

};

// Update notification
chrome.runtime.onInstalled.addListener(function(details){
	handleStorageChange();
	setUser();

	if(details.reason === 'update') {
		chrome.notifications.create('updateNotif',notifUpdate);
		chrome.notifications.onButtonClicked.addListener(function(nId,button) {
			if(nId === 'updateNotif' && button === 0) {
				var newURL = "changelog.html";
				chrome.tabs.create({url: newURL});
			}
		})
	}
});

// Watch the queue change
chrome.storage.onChanged.addListener(handleStorageChange);

// Tab changes
// chrome.tabs.onActivated.addListener(function(activeInfo) {
// 	chrome.tabs.get(activeInfo.tabId, function(tab) {
// 		getQueue(function(res) {
// 			if (res.queue.includes(tab.url)) {
// 				updateContextMenu(true);
// 			} else {
// 				updateContextMenu();
// 			}
// 		})
// 	});
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 	chrome.tabs.get(tab.id, function(tab) {
// 		getQueue(function(res) {
// 			if (res.queue.includes(tab.url)) {
// 				updateContextMenu(true);
// 			} else {
// 				updateContextMenu();
// 			}
// 		})
// 	});
// });


// addAddMenu();