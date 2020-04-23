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

var precacheConfig = [["/404.html","13cdb632e4f12d2fd0a6826c6c4302f8"],["/about/ellen/index.html","cca9991d2bd27f742d69df118d4633cc"],["/about/index.html","6b5c1692e2358386ae29d61e4f670e07"],["/about/megan/index.html","ba497ada5beca70a495333335be2f98d"],["/about/oliver/index.html","9c5cfc427f654237bf62af9f665f7446"],["/about/savannah/index.html","2f244361fab78f21a5c397d17df36a3d"],["/assets/css/main.css","ea96f7ca7d628a088c992e2fe5b6b6df"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","e3cde3e4cf11ce808368a379bc1298ef"],["/assets/img/icons/android-chrome-256x256.png","d7668806b435c84758ca63338ec882e7"],["/assets/img/icons/apple-touch-icon.png","b9d179623db56157737ab1e916593cec"],["/assets/img/icons/favicon-16x16.png","f2e2918fa2e734c66701707b738386ab"],["/assets/img/icons/favicon-32x32.png","6bc7d0fb99f6214337cb092be8ecd349"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/pages/anko-smile.jpg","2914b262ea66512e3df7d98018e2d86d"],["/assets/img/pages/anko-snow.jpg","1ee932e3b2731fa0f01d929d423f8bf0"],["/assets/img/pages/bed.jpg","83dc17370124637860a5da357c6ab4e8"],["/assets/img/pages/blog.jpg","4fd4ed0bf613c038e0dc299b05b2db5c"],["/assets/img/pages/dogs.jpg","cc857ddca15bdde32702afc787df24d6"],["/assets/img/pages/leo-crop.jpg","b465ac6f325f4caa2251270f9837ba6b"],["/assets/img/pages/leo-wk.jpg","c10cab734e5091915f173e1eb49493d5"],["/assets/img/pages/leo.jpg","c10cab734e5091915f173e1eb49493d5"],["/assets/img/pages/mishka-anko-bed.jpg","3071e3fd05af032bc1c723ac318fceea"],["/assets/img/pages/mishka-chair.jpg","b9ad0b9e657e7e788d1c9d60d613733e"],["/assets/img/pages/mishka-couch.jpg","4fd4ed0bf613c038e0dc299b05b2db5c"],["/assets/img/pages/mishka-snow.jpg","2928b6ec5d7365d12b306436a332442f"],["/assets/img/pages/mishka.jpg","b9ad0b9e657e7e788d1c9d60d613733e"],["/assets/img/posts/adversive-effects-of-adversive-tools.jpg","847170a0db010065a52dcebd2c738dd9"],["/assets/img/posts/adversive-effects-of-adversive-tools_placehold.jpg","c2ba012bb762af4467f000f6dcf32217"],["/assets/img/posts/adversive-effects-of-adversive-tools_thumb.jpg","aee2c7e0a80a5c0107b3804e893602ad"],["/assets/img/posts/adversive-effects-of-adversive-tools_thumb@2x.jpg","6cf728c09d7910e1a33873ac4cc471b5"],["/assets/img/posts/become-a-dog-detective.jpg","d6942c31ff275ea7edb884b05a443f79"],["/assets/img/posts/become-a-dog-detective_placehold.jpg","693092e86f92e1fa1d9aacfa6c115c96"],["/assets/img/posts/become-a-dog-detective_thumb.jpg","5e5c01037310d91f8716815aa4c5dca6"],["/assets/img/posts/become-a-dog-detective_thumb@2x.jpg","b9826214c3c2048f4e0d6be7143a76c3"],["/assets/img/posts/choosing-a-dog-training-method.jpg","7b57e1d3207a3f0ec90dcf4fca85fa11"],["/assets/img/posts/choosing-a-dog-training-method_placehold.jpg","9250bd2957544db472b63468c670e3c4"],["/assets/img/posts/choosing-a-dog-training-method_thumb.jpg","9250bd2957544db472b63468c670e3c4"],["/assets/img/posts/choosing-a-dog-training-method_thumb@2x.jpg","9250bd2957544db472b63468c670e3c4"],["/assets/img/posts/dog-wont-take-treats.jpg","1a83c3a9a575377f3fdad16ad84dd86a"],["/assets/img/posts/dog-wont-take-treats_placehold.jpg","0297cd1c95f97b42cf8cbb5f64886c47"],["/assets/img/posts/dog-wont-take-treats_thumb.jpg","0297cd1c95f97b42cf8cbb5f64886c47"],["/assets/img/posts/dog-wont-take-treats_thumb@2x.jpg","0297cd1c95f97b42cf8cbb5f64886c47"],["/assets/img/posts/find-good-dog-trainer.jpg","c74f33b6481d4ddee759c7ded7ea9c7c"],["/assets/img/posts/find-good-dog-trainer_placehold.jpg","d629be5ca8592f69b4fa1bfbcb5f582b"],["/assets/img/posts/find-good-dog-trainer_thumb.jpg","d629be5ca8592f69b4fa1bfbcb5f582b"],["/assets/img/posts/find-good-dog-trainer_thumb@2x.jpg","d629be5ca8592f69b4fa1bfbcb5f582b"],["/assets/img/posts/finding-a-reputable-breeder.jpg","33ff6fec82d85fc0219a64d3951e24bb"],["/assets/img/posts/finding-a-reputable-breeder_placehold.jpg","d76ca0ec3cef5121774a4f646053fadc"],["/assets/img/posts/finding-a-reputable-breeder_thumb.jpg","d76ca0ec3cef5121774a4f646053fadc"],["/assets/img/posts/finding-a-reputable-breeder_thumb@2x.jpg","d76ca0ec3cef5121774a4f646053fadc"],["/assets/img/posts/new-fad-board-train.jpg","0e69c58cd8f415d97c164c4c295d55c3"],["/assets/img/posts/new-fad-board-train_placehold.jpg","097cd92cf958ac75c27500e4ffd973e2"],["/assets/img/posts/new-fad-board-train_thumb.jpg","550560a5e89c8d6646fb0908d84dfb0b"],["/assets/img/posts/new-fad-board-train_thumb@2x.jpg","4f31de693189440877b13226ae2dcb82"],["/assets/img/posts/program-updates-happy-4th-of-july.jpg","7ff1efcbdcc37128bf79e79d5cbe09e6"],["/assets/img/posts/program-updates-happy-4th-of-july_placehold.jpg","b3cc64a39309f25f85339f8e1c7ad7f1"],["/assets/img/posts/program-updates-happy-4th-of-july_thumb.jpg","42e49225310e7150be364d16c9d5279e"],["/assets/img/posts/program-updates-happy-4th-of-july_thumb@2x.jpg","b3cc64a39309f25f85339f8e1c7ad7f1"],["/assets/img/posts/puppies-blank-slates.jpg","c4385e882e202f4c4dd833e0ab26a2ab"],["/assets/img/posts/puppies-blank-slates_placehold.jpg","697696871106fabe28f006b1220bc130"],["/assets/img/posts/puppies-blank-slates_thumb.jpg","697696871106fabe28f006b1220bc130"],["/assets/img/posts/puppies-blank-slates_thumb@2x.jpg","697696871106fabe28f006b1220bc130"],["/assets/img/posts/questions-to-ask-dog-trainer.jpg","41f6448db601f08bd6fc081489b9ff0d"],["/assets/img/posts/questions-to-ask-dog-trainer_placehold.jpg","674182d2e07fe712b11cc2c34a89c6e9"],["/assets/img/posts/questions-to-ask-dog-trainer_thumb.jpg","e992cb326d00648c339edf7feecf59ab"],["/assets/img/posts/questions-to-ask-dog-trainer_thumb@2x.jpg","b19aa69cc121e438ff9f48fd294da463"],["/assets/img/posts/reactivity-in-dogs.jpg","a7143796ee652eed30626847f18ab6c5"],["/assets/img/posts/reactivity-in-dogs_placehold.jpg","70038d744950678232667bca89a41d54"],["/assets/img/posts/reactivity-in-dogs_thumb.jpg","ce8e1cbeb347f583b1c6b532a99874f4"],["/assets/img/posts/reactivity-in-dogs_thumb@2x.jpg","70038d744950678232667bca89a41d54"],["/assets/img/posts/story_of_a_brumby_stallion.jpg","7c7b1440e71a0ba20e1c1d01791d8a6e"],["/assets/img/posts/story_of_a_brumby_stallion_placehold.jpg","2aaf8b75082a2bf9a670c72db05d74de"],["/assets/img/posts/story_of_a_brumby_stallion_thumb.jpg","2aaf8b75082a2bf9a670c72db05d74de"],["/assets/img/posts/story_of_a_brumby_stallion_thumb@2x.jpg","2aaf8b75082a2bf9a670c72db05d74de"],["/assets/img/posts/training-vs-behavioral-adjustment.jpg","97c7dec7651fcbe7955704c04c37be15"],["/assets/img/posts/training-vs-behavioral-adjustment_placehold.jpg","58d00c206e2a10ea408838d435b91f44"],["/assets/img/posts/training-vs-behavioral-adjustment_thumb.jpg","53725c77c5e9bde1c4737953924363db"],["/assets/img/posts/training-vs-behavioral-adjustment_thumb@2x.jpg","a60ae9cc118d105e724f1f05f65c28b6"],["/assets/img/posts/traveling_with_your_pets.jpg","59dd3e682616e59ada6768be2a32f52e"],["/assets/img/posts/traveling_with_your_pets_placehold.jpg","dcbb69322329d8c936a9f0492c045da6"],["/assets/img/posts/traveling_with_your_pets_thumb.jpg","ac666899c95b3f1b48374425cae92c43"],["/assets/img/posts/traveling_with_your_pets_thumb@2x.jpg","dcbb69322329d8c936a9f0492c045da6"],["/assets/img/posts/understanding-fear.jpg","ad159ebcac9e5911b0a8ff6718462c42"],["/assets/img/posts/understanding-fear_placehold.jpg","4c26b7192fa1e0c2d71d1734edf74672"],["/assets/img/posts/understanding-fear_thumb.jpg","4c26b7192fa1e0c2d71d1734edf74672"],["/assets/img/posts/understanding-fear_thumb@2x.jpg","4c26b7192fa1e0c2d71d1734edf74672"],["/assets/img/shop/chapstick.jpg","88e49210c9a076aa1c28cc726e965922"],["/assets/img/shop/chapstick_cart.jpg","3bae038970ac4b2ac7d7269e39fcdec6"],["/assets/img/shop/chapstick_thumb.jpg","b2f91dafed44f379a3dc13075c46e55c"],["/assets/img/shop/cookbook.jpg","4bd066394725a1941a870e188dd0d0df"],["/assets/img/shop/cookbook_cart.jpg","87d4564c7c0076e0a04a5f526d796cd7"],["/assets/img/shop/cookbook_thumb.jpg","4518cfc2c2327509963403b2346a5a11"],["/assets/img/shop/dogtreats.jpg","234cf01ce9f95d805e2f2ccbd5d32943"],["/assets/img/shop/dogtreats_cart.jpg","208228a24956776d32a6f5b719c3eceb"],["/assets/img/shop/dogtreats_thumb.jpg","381fa2243701b4094c913512848914b9"],["/assets/img/shop/donation.jpg","f1f7354c6b9ad72cac117e034fdb1b99"],["/assets/img/shop/donation_cart.jpg","f686b6d5597bb96003e11ea318d7c754"],["/assets/img/shop/donation_thumb.jpg","111d81b62682d6d3c553dbbb68a6af8b"],["/assets/img/shop/note.jpg","5df1693ad6f463459cc08e476d86d94c"],["/assets/img/shop/note_cart.jpg","dfd89761b6e3da4b87c6b1c194ce83f6"],["/assets/img/shop/note_thumb.jpg","ca0a930410345e95bcd4c661aba4c877"],["/assets/img/shop/paracord.jpg","e6f404080871f270fb11a01efe8de4ee"],["/assets/img/shop/paracord_cart.jpg","b77a77a4f2ea75db2f8508d67958716b"],["/assets/img/shop/paracord_thumb.jpg","01dd3a1ec5d20a25e7ea1a1004c99e8b"],["/assets/img/shop/pawbalm.jpg","18dae11447a1042bfd2dca01465b8aee"],["/assets/img/shop/pawbalm_cart.jpg","d74bd9f1f149625443d82e45ae3da49f"],["/assets/img/shop/pawbalm_thumb.jpg","b317b62bb365a987a4bf1d7db8938c67"],["/assets/img/shop/snufflemat.jpg","c29cb259a3bde98a25ab545a346d9f70"],["/assets/img/shop/snufflemat_cart.jpg","624400429815595b2c9bc43246103004"],["/assets/img/shop/snufflemat_thumb.jpg","9b2072e9e65eab51d02c716665447167"],["/assets/js/bundle.js","21c5b90af8df64b0f5f44198527dc9d8"],["/blog/adversive-effects-of-adversive-tools/index.html","c44cad99e5d078132180de4fec2d3ad4"],["/blog/are-puppies-blank-slates/index.html","1dfe503bf00aba10b80eb12669fed917"],["/blog/choosing-a-dog-training-method/index.html","ae34dc36b3ec4edde80da253e1d7d776"],["/blog/dog-wont-take-treats/index.html","fc6f23d256aff4aa51e27936309250bc"],["/blog/event-become-a-dog-detective/index.html","d3e138b00971f8ab3c5e965e10f8d8b0"],["/blog/finding-a-reputable-breeder/index.html","c862ee56ef6847aaa394181f7ba45e76"],["/blog/how-do-I-find-a-good-dog-trainer/index.html","0522d291c926487f2ec8bde0430455e6"],["/blog/index.html","adb257a4dd0426a49f32e163dd3e5af5"],["/blog/new-fad-board-train/index.html","bf71084e7359a4b265ac716a9e2270f8"],["/blog/olivers-new-post/index.html","41473f6bc2d59644489a8760e1214d75"],["/blog/program-updates-happy-4th-of-july/index.html","0eef3a678bdc2c644ce87dd5f36151c1"],["/blog/questions-to-ask-your-dog-trainer/index.html","38d1400c55068a93aca930a61622d334"],["/blog/reactivity-in-dogs/index.html","51fa154c827d993695a436f01f1e34d6"],["/blog/story-of-a-brumby-stallion/index.html","446603e4ab252f2c551762cce866e960"],["/blog/training-vs-behavioral-adjustment/index.html","96ff33a35e4198e255addc6855e707f5"],["/blog/traveling-with-your-pets/index.html","2ce80a8c0e46e6fe0468a6eb596d67fa"],["/blog/understanding-fear/index.html","2a2907abc963d081adef1143dc95e81b"],["/cart/checkout/index.html","63334a47b9655e95ed0e621ceccedb87"],["/cart/index.html","d8cd5753f2cc77fb151d7734d50f1d74"],["/categories/index.html","d5a2bb0163ab3e8bebb4838f76b561b0"],["/contact/index.html","c4a9486335dcf4590d45c407d6cd4021"],["/events/event-name-2/index.html","f1adbc322365ffa3a59f69ac86b35edf"],["/events/event-name/index.html","f1adbc322365ffa3a59f69ac86b35edf"],["/events/index.html","4929c099afe99b6f49e803abf339a214"],["/index.html","4a906841305f6abebcb27ce0a3d331a1"],["/mission/index.html","17b1aa1274fd5d4f9082bde9d79383b5"],["/shop/index.html","bbf0a125ba1e07c85f4ac702f88415e3"],["/sw.js","0b12dc2ff704e28de2fa6d38d458c033"],["/training/behavior/index.html","99d22ea846653fea99d7d8b1de5f996c"],["/training/index.html","f7384f04b0c4bd610601205e80cc24a6"],["/training/obedience/index.html","48e383b6aa8e86ae9a9877b95c9d44c4"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
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

var createCacheKey = function (originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function (originalUrl,
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







