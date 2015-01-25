/* global $: true, document: false, window: false, location: false, navigator: false */

$(document).ready(function(){

  var $githubCount = $('.github-count'),
      $twitterCount = $('.twitter-count'),
      $googlePlusCount = $('.google-plus-count');

  if ($githubCount.length || $twitterCount.length || $googlePlusCount.length) {
    $.get('http://mobile-angular-ui-social.herokuapp.com/', function(data){
      if (data.github) { 
        $githubCount.text(''+data.github);
        $githubCount.addClass('loaded');
      }
      if (data.twitter) { 
        $twitterCount.text(''+data.twitter);
        $twitterCount.addClass('loaded');
      }
      if (data.google) { 
        $googlePlusCount.text(''+data.google);
        $googlePlusCount.addClass('loaded');
      }
    });
  }

  // Open each external links in a new window
  $('a').each(function() {
     var a = new RegExp('/' + window.location.host + '/');
     if (!a.test(this.href)) {
        $(this).attr('target','_blank');
     }
  });

  var $toc = $('#toc');
  if ($toc.length) {
    //
    // Affix
    //
    var $tocParent = $toc.parent(),
        $footer = $('.footer');

    $(window).resize(function() {
      $toc.width($tocParent.width());
    }).trigger('resize');

    $toc.affix({
      offset: {
        top: $toc.offset().top,
        bottom: function(){ return $footer.outerHeight(true); }
      }
    });

    //
    // ScroolSpy replacement
    //
    var isActive = function(elem) {
      elem = $(elem);
      if (!elem.length) {
        return false;
      }

      var scrollTop = $(window).scrollTop();
      var elemTop = elem.offset().top;
      if (elemTop < scrollTop + 100) {
        return true;
      }
      return false;
    };

    var scrollSpy = function() {
      // collect all toc items
      var items = [];
      $toc.find('a').each(function(){
        items.push({  tocItem: $(this), header: $(this.hash) });
      });

      // find last active toc item
      var found = null;

      for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];
        if (isActive(item.header)) {
          found = item.tocItem;
          break;
        }
      }

      $toc.find('li').removeClass('active');
      if (found) {
        found.parentsUntil('#toc', 'li').addClass('active');
      }
    };

    $(window).scroll(scrollSpy);
    $(window).resize(scrollSpy);

    // Init affix and scrollspy
    $(window).trigger('scroll');
  }

  // Smooth scroll
  $('a[href*=#]:not([href=#]):not([data-slide])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var href = this.href;
      var target = $(this.hash);
      target = target.length ? target : $('[name=\'' + this.hash.slice(1) +'\']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 500, function() {
          window.location.href = href;
        });
        return false;
      }
    }
  });

  // Auto make links from h2+

  $('#docs-contents, #page-contents').find('h2,h3,h4,h5,h6').each(function() {
    var $elem = $(this);
    var id = $elem.attr('id');
    if (id) {
      $elem.wrap('<a href="#' + id + '" class="doc-anchor"></a>');
    }
  });


  // var entityMap = {
  //   "&": "&amp;",
  //   "<": "&lt;",
  //   ">": "&gt;",
  //   '"': '&quot;',
  //   "'": '&#39;',
  //   "/": '&#x2F;'
  // };

  // var escapeHtml = function(string) {
  //   return String(string).replace(/[&<>"'\/]/g, function (s) {
  //     return entityMap[s];
  //   });
  // };

  // Examples
  var codeModalTemplate = function(manifest) {
    var i, tab, 
        modal = '<div class="modal modal-example-code">' +
                '  <div class="modal-dialog">' +
                '    <div class="modal-content">' +
                '      <div class="modal-header">' +
                '        <button class="close" ' +
                '          data-dismiss="modal">&times;</button>' +
                '        <h4 class="modal-title">' + manifest.title + '</h4>' +
                '      </div>' +
                '      <div class="modal-body">' +
                '        <ul class="nav nav-tabs" role="tablist">';
      
      for (i = 0; i < manifest.tabs.length; i++) {
        tab = manifest.tabs[i];
        modal += '<li class="' + (i === 0 ? 'active' : '') + '"><a data-toggle="tab" href="#modal-example-code-tab-' + i + '">' + tab.type.toUpperCase() + '</a></li>';
      }
      
      modal +=  '        </ul>' +
                '        <div class="tab-content">';
      
      for (i = 0; i < manifest.tabs.length; i++) {
        tab = manifest.tabs[i];
        modal += '<div role="tabpanel" class="tab-pane ' + (i === 0 ? 'active' : '') + '" id="modal-example-code-tab-' + i + '"><pre><code>' + tab.code + '</code></pre></div>';
      }

      modal +=  '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>';

      return modal;
  };
  
  var codeModal = function(manifest) {
    var modal = $(codeModalTemplate(manifest));
    $('body').append(modal);
    modal.find('.nav a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    modal.show();
    modal.modal();
    modal.on('hidden', function() {
      modal.remove();
    });
  };

  var showCode = function(manifestPath) {
    $.get(manifestPath, {}, function(manifest) {
      codeModal(manifest);
    }, 'json');
  };

  $('iframe.embedded-example').each(function() {
    var iframe = $(this);
    iframe.attr('height', '600px');
    iframe.attr('width', '400px');
    iframe.attr('seamless', '1');
    iframe.attr('frameborder', '0');
    iframe.wrap('<div class="embedded-example-container"></div>');
    var codeButton = $('<a href="#" class="btn btn-xs btn-default btn-show-code"><i class="fa fa-code"></i> Code</a>');
    codeButton.on('click', function(e) {        
      showCode(iframe.attr('src') + '.json');
      e.preventDefault();
      return false;
    });
    iframe.parent().append(codeButton);
  });

});

// IEMobile fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  );
  document.querySelector('head').appendChild(msViewportStyle);
}
