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

var precacheConfig = [["/404.html","919da3248776e9e3e8440103e2f4f32f"],["/about/ellen.html","73b7064542c485e52a71b89f46d67abd"],["/about/index.html","08243d9156279fd046597d2be92494fd"],["/about/megan.html","a3abd0e22f1332567fa550d15361144a"],["/about/oliver.html","9b38118b34d5bb3c6f16c821546c266c"],["/about/savannah.html","adec73ac05e91c166f8e200753e4b00a"],["/assets/css/main.css","ece10e1ac7d9e87242a8df741a3016dd"],["/assets/img/anko-smile.jpg","564cc4983d09f74a72a9ffa094d415f8"],["/assets/img/blog.jpg","7daab68be177cad5f48c25c5ee68c81b"],["/assets/img/dogs.jpg","a05e83a4c4fc3459cf56cc54c55d3589"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/leo-crop.jpg","b851bd19121febba5fd05b5f1c6f33b9"],["/assets/img/leo-wk.jpg","33c9d696b8bd000b70642d212a46ba44"],["/assets/img/leo.jpg","33c9d696b8bd000b70642d212a46ba44"],["/assets/img/mishka-anko-bed.jpg","80f233717e0ebde3c97fd6471c273bb6"],["/assets/img/mishka-chair.jpg","fc115b0a7c401fe85c41c29f0177eed8"],["/assets/img/mishka-couch.jpg","7daab68be177cad5f48c25c5ee68c81b"],["/assets/img/mishka.jpg","fc115b0a7c401fe85c41c29f0177eed8"],["/assets/img/posts/adversive-effects-of-adversive-tools.jpg","847170a0db010065a52dcebd2c738dd9"],["/assets/img/posts/adversive-effects-of-adversive-tools_lg.jpg","847170a0db010065a52dcebd2c738dd9"],["/assets/img/posts/adversive-effects-of-adversive-tools_md.jpg","0a9747fbbe4fffdd8fed4aeefb715a3b"],["/assets/img/posts/adversive-effects-of-adversive-tools_placehold.jpg","8d95f1c9d9092c9189486207ca11b06c"],["/assets/img/posts/adversive-effects-of-adversive-tools_sm.jpg","8d66dc34f064ed8cb9486980d581daf3"],["/assets/img/posts/adversive-effects-of-adversive-tools_thumb.jpg","f46f23eae2659edb4e570b3895e52553"],["/assets/img/posts/adversive-effects-of-adversive-tools_thumb@2x.jpg","6ff97d9d970b742b4f44d821b5d9b646"],["/assets/img/posts/adversive-effects-of-adversive-tools_xs.jpg","5f362549df4db4571969f33a53ea4846"],["/assets/img/posts/program-updates-happy-4th-of-july.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_lg.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_md.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_placehold.jpg","8b23d282cdd41f36dcad037aa828b5f4"],["/assets/img/posts/program-updates-happy-4th-of-july_sm.jpg","abd7cced27778e6ca5e40f97c238236e"],["/assets/img/posts/program-updates-happy-4th-of-july_thumb.jpg","cab23db01784f9362a4300d86b9c5877"],["/assets/img/posts/program-updates-happy-4th-of-july_thumb@2x.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_xs.jpg","02ef5852726a0747f61b2a83f5920e39"],["/assets/img/posts/reactivity-in-dogs.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_lg.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_md.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_placehold.jpg","0b6166d58af10d71e7bf2ba5656aaa79"],["/assets/img/posts/reactivity-in-dogs_sm.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_thumb.jpg","9ee04d0bd5d8ea4b19db47fa4e4fe13c"],["/assets/img/posts/reactivity-in-dogs_thumb@2x.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_xs.jpg","6e885a810e75483cf1d62f7229383831"],["/assets/img/posts/understanding-fear.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_lg.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_md.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_placehold.jpg","4dc3059e95e39f7a383d97d6d9ecb185"],["/assets/img/posts/understanding-fear_sm.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_thumb.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_thumb@2x.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_xs.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/blog/adversive-effects-of-adversive-tools.html","f0d74ffce9ad142215b877cf5c4318e1"],["/blog/index.html","8ab9be61c58e71e564ef1b95a394219c"],["/blog/program-updates-happy-4th-of-july.html","accbb950bb8ba5015641cb4469573297"],["/blog/reactivity-in-dogs.html","24895c299fd855ab411fd871f0177815"],["/blog/understanding-fear.html","62ca7c2028b765e7d2b73b1006f82283"],["/categories/index.html","d9150d3bca41309264d8bb74bbe7eb7f"],["/contact/index.html","2332d8cf827974f5e371e73888827c28"],["/events/event-name-2.html","f1adbc322365ffa3a59f69ac86b35edf"],["/events/event-name.html","f1adbc322365ffa3a59f69ac86b35edf"],["/events/index.html","414683aa87f22a540d5c7d3733db7cb4"],["/index.html","a7b0ab430f150d67ae135869e4cccb8c"],["/mission/index.html","9ac2dd30b0908efcce072cb5f4dca03a"],["/shop/canine-cookbook.html","319cd90fa562a2dd26293cb6569abcd7"],["/shop/chapstick.html","58564c2c1434778984ce7401554dd76e"],["/shop/dog-treats.html","a2768a2250562af16e8580ca44019e8e"],["/shop/extra-donation.html","4cba83fcc4012e50fcbdf15d54399a92"],["/shop/index.html","71fdc23e58a39c335c1768e0892ec768"],["/shop/paracord-leash.html","ad8e3c175ab326abfa980dbf60bb9ee8"],["/shop/paw-balm.html","609b0664105516a7a4a446642ace0456"],["/shop/snuffle-mat.html","d7601308c42983ba6fd939914f529a39"],["/shop/specialized-note.html","56b57a82e89948a0b5d5a4ec122c6a1b"],["/sw.js","18f9540e7ae5ac2ff9030b0ed032c23d"],["/training/behavior.html","9d2434984a2135d078a967ea5f44b3a8"],["/training/index.html","b72d82718625235f22edbfe6998a1a4f"],["/training/obedience.html","ceef426f002eb9b4ff5d19ddb1777cc3"]];
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







