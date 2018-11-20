/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","7d75f7dbd9f4884a827a54a6f05f274a"],["/about/ellen.html","5251da851a6fa39f327ad81d9232a165"],["/about/index.html","c1d04cc3afdaecf07efe031a0b2eea14"],["/about/megan.html","71048d4dbc80426bdb7cc580e4be9977"],["/about/oliver.html","46ebccf05f25b758a3f021637d15be4e"],["/about/savannah.html","fa7de727de136dd28aecfd307da60171"],["/assets/css/main.css","ece10e1ac7d9e87242a8df741a3016dd"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/pages/anko-smile.jpg","2914b262ea66512e3df7d98018e2d86d"],["/assets/img/pages/anko-snow.jpg","1ee932e3b2731fa0f01d929d423f8bf0"],["/assets/img/pages/bed.jpg","83dc17370124637860a5da357c6ab4e8"],["/assets/img/pages/blog.jpg","4fd4ed0bf613c038e0dc299b05b2db5c"],["/assets/img/pages/dogs.jpg","cc857ddca15bdde32702afc787df24d6"],["/assets/img/pages/leo-crop.jpg","b465ac6f325f4caa2251270f9837ba6b"],["/assets/img/pages/leo-wk.jpg","c10cab734e5091915f173e1eb49493d5"],["/assets/img/pages/leo.jpg","c10cab734e5091915f173e1eb49493d5"],["/assets/img/pages/mishka-anko-bed.jpg","3071e3fd05af032bc1c723ac318fceea"],["/assets/img/pages/mishka-chair.jpg","b9ad0b9e657e7e788d1c9d60d613733e"],["/assets/img/pages/mishka-couch.jpg","4fd4ed0bf613c038e0dc299b05b2db5c"],["/assets/img/pages/mishka-snow.jpg","2928b6ec5d7365d12b306436a332442f"],["/assets/img/pages/mishka.jpg","b9ad0b9e657e7e788d1c9d60d613733e"],["/assets/img/posts/adversive-effects-of-adversive-tools.jpg","847170a0db010065a52dcebd2c738dd9"],["/assets/img/posts/adversive-effects-of-adversive-tools_lg.jpg","847170a0db010065a52dcebd2c738dd9"],["/assets/img/posts/adversive-effects-of-adversive-tools_md.jpg","0a9747fbbe4fffdd8fed4aeefb715a3b"],["/assets/img/posts/adversive-effects-of-adversive-tools_placehold.jpg","8d95f1c9d9092c9189486207ca11b06c"],["/assets/img/posts/adversive-effects-of-adversive-tools_sm.jpg","8d66dc34f064ed8cb9486980d581daf3"],["/assets/img/posts/adversive-effects-of-adversive-tools_thumb.jpg","f46f23eae2659edb4e570b3895e52553"],["/assets/img/posts/adversive-effects-of-adversive-tools_thumb@2x.jpg","6ff97d9d970b742b4f44d821b5d9b646"],["/assets/img/posts/adversive-effects-of-adversive-tools_xs.jpg","5f362549df4db4571969f33a53ea4846"],["/assets/img/posts/finding-a-reputable-breeder.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_lg.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_md.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_placehold.jpg","7eb478ce6299b9c05335bc662e3591e5"],["/assets/img/posts/finding-a-reputable-breeder_sm.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_thumb.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_thumb@2x.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_xs.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/new-fad-board-train.jpg","0e69c58cd8f415d97c164c4c295d55c3"],["/assets/img/posts/new-fad-board-train_lg.jpg","0e69c58cd8f415d97c164c4c295d55c3"],["/assets/img/posts/new-fad-board-train_md.jpg","0e69c58cd8f415d97c164c4c295d55c3"],["/assets/img/posts/new-fad-board-train_placehold.jpg","42c3a8d3ff81e97ff6de8e531043587f"],["/assets/img/posts/new-fad-board-train_sm.jpg","73bf17708607c91c0c8b50409dbf44fc"],["/assets/img/posts/new-fad-board-train_thumb.jpg","83f3ed7bfacfab45528239571c94567b"],["/assets/img/posts/new-fad-board-train_thumb@2x.jpg","0e69c58cd8f415d97c164c4c295d55c3"],["/assets/img/posts/new-fad-board-train_xs.jpg","f2fa1e6915e98f6432819da1943f78d3"],["/assets/img/posts/program-updates-happy-4th-of-july.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_lg.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_md.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_placehold.jpg","8b23d282cdd41f36dcad037aa828b5f4"],["/assets/img/posts/program-updates-happy-4th-of-july_sm.jpg","abd7cced27778e6ca5e40f97c238236e"],["/assets/img/posts/program-updates-happy-4th-of-july_thumb.jpg","cab23db01784f9362a4300d86b9c5877"],["/assets/img/posts/program-updates-happy-4th-of-july_thumb@2x.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_xs.jpg","02ef5852726a0747f61b2a83f5920e39"],["/assets/img/posts/reactivity-in-dogs.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_lg.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_md.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_placehold.jpg","0b6166d58af10d71e7bf2ba5656aaa79"],["/assets/img/posts/reactivity-in-dogs_sm.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_thumb.jpg","9ee04d0bd5d8ea4b19db47fa4e4fe13c"],["/assets/img/posts/reactivity-in-dogs_thumb@2x.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_xs.jpg","6e885a810e75483cf1d62f7229383831"],["/assets/img/posts/training-vs-behavioral-adjustment.jpg","97c7dec7651fcbe7955704c04c37be15"],["/assets/img/posts/training-vs-behavioral-adjustment_lg.jpg","97c7dec7651fcbe7955704c04c37be15"],["/assets/img/posts/training-vs-behavioral-adjustment_md.jpg","97c7dec7651fcbe7955704c04c37be15"],["/assets/img/posts/training-vs-behavioral-adjustment_placehold.jpg","f740df71ef3e1867870feedb2322c392"],["/assets/img/posts/training-vs-behavioral-adjustment_sm.jpg","fe499e8be7c04bb05313558379bb9750"],["/assets/img/posts/training-vs-behavioral-adjustment_thumb.jpg","e393973afb8b23063d429b4b6d851104"],["/assets/img/posts/training-vs-behavioral-adjustment_thumb@2x.jpg","97c7dec7651fcbe7955704c04c37be15"],["/assets/img/posts/training-vs-behavioral-adjustment_xs.jpg","3eba45883262d188b07a0b42a013ebf4"],["/assets/img/posts/understanding-fear.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_lg.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_md.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_placehold.jpg","4dc3059e95e39f7a383d97d6d9ecb185"],["/assets/img/posts/understanding-fear_sm.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_thumb.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_thumb@2x.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_xs.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/js/bundle.js","dc255796f3ec24fe9fdb025499dc1421"],["/blog/adversive-effects-of-adversive-tools.html","118a08a04b62a8da8ab5c17b5065264a"],["/blog/finding-a-reputable-breeder.html","6108b764c47daab4271c995464764a1d"],["/blog/index.html","44cfecb2ac8fee754fdc23ff7845acf6"],["/blog/new-fad-board-train.html","b5fe556d5d22635945b42fe8237c48b0"],["/blog/program-updates-happy-4th-of-july.html","a06acf012916622bd6019a2b30dd407d"],["/blog/questions-to-ask-your-dog-trainer.html","fca51d5cf1fe5eff77afc8d779295b87"],["/blog/reactivity-in-dogs.html","9c7a9c4430c6486d5a8f931fe0bac751"],["/blog/training-vs-behavioral-adjustment.html","5f870f9b6786de290e73d483dea0d426"],["/blog/understanding-fear.html","f81bda0e222ab7147554a7e51700a9b8"],["/categories/index.html","ce5ffcb05457cd6221994ea0b52692ad"],["/contact/index.html","e760e19961bfe77854e75c27e62a236f"],["/events/event-name-2.html","f1adbc322365ffa3a59f69ac86b35edf"],["/events/event-name.html","f1adbc322365ffa3a59f69ac86b35edf"],["/events/index.html","9e95c9cd1a4642a4a92eca140942d5dc"],["/index.html","a2cb236d0f10ce88ce35e69c0f0d4aed"],["/mission/index.html","1eb40eded156005762a869483785f79f"],["/shop/canine-cookbook.html","c65dba5529da265c4d73d82580c50c6d"],["/shop/chapstick.html","8901aa82fd7be32c98570845554f14f3"],["/shop/dog-treats.html","404866b3249c600b795df33d359ebaf1"],["/shop/extra-donation.html","4f182551d9796663bd58176572bf42f4"],["/shop/index.html","d52964ce814bacdebde5f3671bc9ff1f"],["/shop/paracord-leash.html","12a7c994d2aa0f6569a493c647a982ed"],["/shop/paw-balm.html","c2788839f0aa2601f33b9230071b82c6"],["/shop/snuffle-mat.html","91be0f3213908334d1aa3f0d78a101dd"],["/shop/specialized-note.html","a381e1e735a216ae52aa43dd426dc38e"],["/sw.js","d7f77df1463d9c980db0779f8d937ede"],["/training/behavior.html","babdf6d5a0a87df803fb656965dcda30"],["/training/index.html","77ae79df643cf0fee68622de693ee64c"],["/training/obedience.html","4171f9e13a82bb675ea31de0590fbbb5"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







