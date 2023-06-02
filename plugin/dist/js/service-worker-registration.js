// register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js') // Path from the root
    .then(function(registration) {
        console.log('Service worker registration successful', registration);
    })
    .catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/src/service-worker.js') // Path from the root
    .then(function(registration) {
        console.log('Service worker registration successful', registration);
    })
    .catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js') // Path from the root
    .then(function(registration) {
        console.log('Service worker registration successful', registration);
    })
    .catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js') // Path from the root
    .then(function(registration) {
        console.log('Service worker registration successful', registration);
    })
    .catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}
