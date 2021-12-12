const staticCache = "Static-cache-v1";
const dynamicCache = "Dynamic-cache-v";

const assets = [
    "/",
    "/index.html",
    "/pages/fallback.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/app.css",
    "/img/download.jfif",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

//Cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        cache.keys().then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener("install", function (event) {
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.open(staticCache).then(function (cache){
            console.log("SW: Precaching App shell");
            cache.addAll(assets);
        // cache.add("/js/app.js");
        })
    );
});

self.addEventListener("activate", function (event) {
    // console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.keys().then((keys) => {
        // console.log(keys);
        return Promise.all(
            keys
                .filter((key) => key !== staticCache && key !== dynamicCache)
                .map((key) => caches.delete(key))
        );
    })
  );
});


self.addEventListener("fetch", function (event) {
    //fires whenever the app requests a resource (file or data)
    //console.log(`SW: Fetching ${event.request.url}`);
    //next, go get the requested resource from the network
    event.respondWith(
        caches
            .match(event.request)
            .then((response) =>  {
                return (
                    response || 
                    fetch(event.request).then((fetchRes) => {
                        return caches.open(dynamicCache).then((cache) => {
                            cache.put(event.request.url, fetchRes.clone());
                            limitCacheSize(dynamicCache, 3);
                            return fetchRes;
                        });
                    })
                );
            })
            .catch(() => caches.match("/pages/fallback.html"))
    );
 });
