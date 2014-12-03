$(document).ready(function(){

  var $githubCount = $(".github-count"),
      $twitterCount = $(".twitter-count"),
      $googlePlusCount = $(".google-plus-count");

  if ($githubCount.length || $twitterCount.length || $googlePlusCount.length) {
    $.get('http://mobile-angular-ui-social.herokuapp.com/', function(data){
      if (data.github) { 
        $githubCount.text(""+data.github);
        $githubCount.addClass('loaded');
      }
      if (data.twitter) { 
        $twitterCount.text(""+data.twitter);
        $twitterCount.addClass('loaded');
      }
      if (data.google) { 
        $googlePlusCount.text(""+data.google);
        $googlePlusCount.addClass('loaded');
      }
    });
  }

  // Open each external links in a new window
  $('a').each(function() {
     var a = new RegExp('/' + window.location.host + '/');
     if (!a.test(this.href)) {
        $(this).attr("target","_blank");
     }
  });

  var $toc = $("#toc");
  if ($toc.length) {
    //
    // Affix
    //
    var $tocParent = $toc.parent(),
        $navbar = $('.navbar');
        $footer = $('.footer');

    $(window).resize(function() {
      $toc.width($tocParent.width());
    }).trigger("resize");

    $toc.affix({
      offset: {
        top: 0,
        bottom: function(){ return $footer.outerHeight(true); }
      }
    });

    //
    // ScroolSpy replacement
    //
    var isActive = function(elem) {
      var scrollTop = $(window).scrollTop();
      var elemTop = elem.offset().top;
      if (elemTop < scrollTop + 400) {
        return true;
      };
      return false;
    }

    var scrollSpy = function(evt) {
      // collect all toc items
      var items = []
      $toc.find("a").each(function(){
        items.push({  tocItem: $(this), header: $(this.hash) });
      });

      // find last active toc item
      found = null;

      for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];
        if (isActive(item.header)) {
          found = item.tocItem;
          break;
        };
      };

      $toc.find("li").removeClass('active');
      if (found) {
        found.parentsUntil('#toc', 'li').addClass('active');
      };
    };

    $(window).scroll(scrollSpy);
    $(window).resize(scrollSpy);

    // Init affix and scrollspy
    $(window).trigger("scroll");
  }

  // Smooth scroll
  $('a[href*=#]:not([href=#]):not([data-slide])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 500);
        return false;
      }
    }
  });


  //
  // D3.js
  //
  if (d3 && $('#modules-overview-graph').length) {
    var width = 600, height = 300;
    var tree = d3.layout.tree()
        .size([300, 300]);
    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });
    var svg = d3.select("#modules-overview-graph").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(120,0)");
    var data = {
     "name": "Mobile Angular UI",
     "children": [
        { name: 'Core', children: [
        { name:'fastclick', children: [] },
        { name:'activeLinks', children: [] },
        { name:'capture', children: [] },
        { name:'outerClick', children: [] },
        { name:'sharedState', children: [] },
        { name:'ui', children: [] }
      ] },
      { name: 'Components', children: [
        {name: 'modals', children: [] },
        {name: 'sidebars', children: [] },
        {name: 'navbars', children: [] },
        {name: 'scrollable', children: [] },
        {name: 'switch', children: [] }
      ] },
      { name: 'Gestures', children: [
        { name: 'drag', children: [] },
        { name: 'swipe', children: [] },
        { name: 'transform', children: [] }
      ] }
     ]
    };

    var nodes = tree.nodes(data),
        links = tree.links(nodes);

    var link = svg.selectAll("path.link")
        .data(links)
      .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = svg.selectAll("g.node")
        .data(nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    node.append("circle")
        .attr("r", 4.5);
    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; });

    d3.select(self.frameElement).style("height", height + "px");    
  }

});

// IEMobile fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle);
}
