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

var precacheConfig = [["/404.html","e4fe3a350fcfab052198ffca52f0be66"],["/about/index.html","a19e38ef285399348ec3830a05e88831"],["/assets/assets/img/dogs.jpg","7ff7c92b9e7cdf7097bcf5b024a696b0"],["/assets/assets/img/leo.jpg","8333b24bd786475e8e0b30ed38acdba8"],["/assets/assets/img/mishka.jpg","fc115b0a7c401fe85c41c29f0177eed8"],["/assets/assets/img/posts_bkp/leo.jpg","8333b24bd786475e8e0b30ed38acdba8"],["/assets/assets/img/posts_bkp/leocrop.jpg","69c908ba5598932215f9a3c7650d8d21"],["/assets/assets/img/posts_bkp/leocrop_thumb.jpg","69c908ba5598932215f9a3c7650d8d21"],["/assets/assets/img/posts_bkp/leocrop_thumb@2x.jpg","69c908ba5598932215f9a3c7650d8d21"],["/assets/assets/img/posts_bkp/mishka.jpg","fc115b0a7c401fe85c41c29f0177eed8"],["/assets/assets/img/posts_bkp/mishka_thumb.jpg","fc115b0a7c401fe85c41c29f0177eed8"],["/assets/assets/img/posts_bkp/mishka_thumb@2x.jpg","fc115b0a7c401fe85c41c29f0177eed8"],["/assets/css/main.css","ece10e1ac7d9e87242a8df741a3016dd"],["/assets/img/dogs.jpg","439e73133c04eb47fcdb6b9f1af170b1"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/dogs.jpg","439e73133c04eb47fcdb6b9f1af170b1"],["/assets/img/posts/dogs_lg.jpg","e215d1cfc758e6d7f38c626face900c4"],["/assets/img/posts/dogs_md.jpg","748416c47254c91a8da348fb93c7bbae"],["/assets/img/posts/dogs_placehold.jpg","e348b6d28bd0c51afb6404222ad522ee"],["/assets/img/posts/dogs_sm.jpg","9b10b0a478fb0a8d63cd880df55991ea"],["/assets/img/posts/dogs_thumb.jpg","71b394d63ef75143ce8a2042db51e9e0"],["/assets/img/posts/dogs_thumb@2x.jpg","d0586a6ff0cb60deb1a24385a325475e"],["/assets/img/posts/dogs_xs.jpg","36263a7d6253a77bbb2ff14eb96fdfa3"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/leo.jpg","800458fb77ca2231b0bb1474ad4858bd"],["/assets/img/posts/leo_lg.jpg","c612b12e71621778b1d1911911dd40f4"],["/assets/img/posts/leo_md.jpg","5c0c9a749a2457469d50ae91e38be3fd"],["/assets/img/posts/leo_placehold.jpg","0ad8eea0d7ce7e76355efd3d5b89bc2f"],["/assets/img/posts/leo_sm.jpg","e5da18c18d4f9aa9e8c01093e81ed2a7"],["/assets/img/posts/leo_thumb.jpg","38310b8e3b35c9ebb05e207be8c6678e"],["/assets/img/posts/leo_thumb@2x.jpg","79b549c1a509dcf828769cf66d92305f"],["/assets/img/posts/leo_xs.jpg","70ab8b9c462fe63db58e0918d60f36b5"],["/assets/img/posts/leocrop.jpg","7fe6d68d70846bccc840d412f754fecc"],["/assets/img/posts/leocrop_lg.jpg","daac79936e1d321a73cd9c058357cbd4"],["/assets/img/posts/leocrop_md.jpg","d6222079a473c69bb89b09f0cc5a77bc"],["/assets/img/posts/leocrop_placehold.jpg","281d23deec86fbb5bb89c8b499e54840"],["/assets/img/posts/leocrop_sm.jpg","8aceccc1ff098b4ae89d54ef71f6725f"],["/assets/img/posts/leocrop_thumb.jpg","a3ebbefe816a717f2db22af542458cd3"],["/assets/img/posts/leocrop_thumb@2x.jpg","fb5200218098500426ce67ee6400d473"],["/assets/img/posts/leocrop_xs.jpg","fadb4f4cb03875425a979acaaea6d110"],["/assets/img/posts/mishka.jpg","b9ad0b9e657e7e788d1c9d60d613733e"],["/assets/img/posts/mishka_lg.jpg","0cba7eac09950eb1d33a7a4b1cf2d69e"],["/assets/img/posts/mishka_md.jpg","5b06c076ebe9e30d8bfc1212ece61ca2"],["/assets/img/posts/mishka_placehold.jpg","d900f67304775f949b2dc62213f1070a"],["/assets/img/posts/mishka_sm.jpg","167dca6624c1e8f9e9fa1bc86315a3fa"],["/assets/img/posts/mishka_thumb.jpg","c4fe44314e14263eb233112bb479814f"],["/assets/img/posts/mishka_thumb@2x.jpg","e289f8c5fe1f0126aac0cf2b5d1d0241"],["/assets/img/posts/mishka_xs.jpg","781af556a564635817faa821c3b5359a"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/categories/index.html","fdde2d5c07ba9ce69846b307456da4b0"],["/contact/index.html","b86b9b55fc5bf70c30cc245bb95c1596"],["/events/index.html","d1ba776c2beea507abb15173eb4fdb52"],["/getting-started/index.html","021583c7b3d583646a92622de83e134c"],["/index.html","a626d6944ee76edcc8a5468932d4f5cf"],["/markdown-cheatsheet/index.html","db5804bff3976d2c453ac6ad1281bb4e"],["/mission/index.html","ee6722bae40b5ed058495424c0d35a32"],["/shop/canine-cookbook.html","57ec7d5b0baea5c66f27708583e73a68"],["/shop/chapstick.html","1f47b6738ea75425fd995daa497d6d44"],["/shop/dog-treats.html","99b9ee80dc39f6185ddaa4908e115344"],["/shop/index.html","ac8ac0a06f17a32f47d6f2ac8f6d0170"],["/shop/snuffle-mat.html","ab79832b33b0ef3ea4a4ec6f89637f81"],["/super-long-article/index.html","ae6a440ce37ab28b7f69164fcdbfee48"],["/sw.js","e2b6494bc497801bdc95c9e45f9a4b5b"],["/team/index.html","a4ebb18de67652c8181e29c88b48c612"],["/training/behavior.html","1bced2f8e2772ecdb5b8ca6e9f4e6b25"],["/training/index.html","3dc88bb516afac900f8794f637f05f7f"],["/training/obedience.html","ad5b52d6a556d88814b86a461e8c248e"]];
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







