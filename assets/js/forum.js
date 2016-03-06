/* jshint browser: true */
/* global $ */

'use strict';
$(document).ready(function() {
  if ($('#forum').length) {
    document.getElementById('loading-forum-txt').appendChild(document.createTextNode('Loading Forum ...'));
    var hideLoading = function() {
      var loadingEl = document.getElementById('loading');
      loadingEl.parentNode.removeChild(loadingEl);
    };
    document.getElementById('forum_embed').onload = hideLoading;
    document.getElementById('forum_embed').src =
       'https://groups.google.com/forum/embed/?place=forum/mobile-angular-ui-forum' +
       '&showsearch=true&showpopout=true&showtabs=false&hideforumtitle=true&hidesubject=true' +
       '&parenturl=' + encodeURIComponent(window.location.href);
  }
});
