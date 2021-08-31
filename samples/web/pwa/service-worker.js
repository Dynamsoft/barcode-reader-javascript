self.addEventListener('fetch', event => {
 
    // abandon non-GET requests
    if (event.request.method !== 'GET') return;
 
    // do nothing now
    return;
});
