{% include "../partials/head.swig" %}
<div class='home'>
  {% include "./hero.swig" %}
<div class="container">
  <div class="home-body">
  <div class="lead">
    Mobile Angular UI is a mobile UI framework just like Sencha Touch or jQuery Mobile. If you know Angular JS and Twitter Bootstrap you already know it!
  </div>

  <section class="feature row"><div class="col-sm-4 feature-figure"><img src="/assets/img/features/sec-mobile-fig.png"></div><div class="col-sm-8 feature-text"><h2 id="awesome-mobile-components">Awesome Mobile Components</h2>
  <p>Mobile Angular UI provides essential mobile components that are missing in Bootstrap 3: switches, overlays, sidebars, scrollable areas, absolute positioned top and bottom navbars that don't bounce on scroll.</p>
  <p>It relies on robust libraries like fastclick.js and overthrow.js to achieve the better mobile experience.</p>
  </div></section>
  <section class="feature row"><div class="col-sm-4 col-sm-push-8 feature-figure"><img src="/assets/img/features/sec-angular-fig.png"></div><div class="col-sm-8 col-sm-pull-4 feature-text"><h2 id="angular-js-everywhere">Angular JS Everywhere</h2>
  <p>No jQuery dependencies, no fat bootstrap js. Just a few angular.js directives super easy to learn to put things together.</p>
  </div></section>
  <section class="feature row"><div class="col-sm-4 feature-figure"><img src="/assets/img/features/sec-desktop-fig.png"></div><div class="col-sm-8 feature-text"><h2 id="from-desktop-to-mobile-and-back-with-the-smallest-effort-possible">From Desktop to Mobile and back with the smallest effort possible</h2>
  <p>Mobile Angular UI retains most of the Bootstrap 3 syntax. This way it’s trivial to bring an existing desktop web app to mobile.</p>
  <p>Also a super-small css file is provided to do the opposite. Just include it and you’ll get a fully responsive and touch enabled interface that can be used everywhere.</p>
  </div></section>
  <section class="feature row"><div class="col-sm-4 col-sm-push-8 feature-figure"><img src="/assets/img/features/sec-bootstrap-fig.png"></div><div class="col-sm-8 col-sm-pull-4 feature-text"><h2 id="bootstrap-tailored-for-your-needs">Bootstrap tailored for your needs</h2>
  <p>Original Bootstrap 3 is stripped out of responsive media queries that are put apart in separate files (just include what you need).</p>
  <p>FontAwesome Icons are included by default in place of Glyphicons.</p>
  </div></section></div>
</div>
  

  {% include "./carousel.swig" %}
<div class="container">
  <div class="home-body">
    <section class="text-center">
      <h2>
        Help Mobile Angular UI to grow!
      </h2>
      <p>
        Mobile Angular UI it’s an Open Source project. So it needs you! You can support its development and community in many ways.
      </p>
      <br/>

      <div class="btn-group">
        <a class="btn btn-default btn-lg" href='https://github.com/mcasimir/mobile-angular-ui/issues?state=open'>
          <i class="fa fa-github"></i>
          Report Issues
        </a>
        <a class="btn btn-default btn-lg" href='/forum'>
          <i class="fa fa-comment"></i>
          Discuss
        </a>
        <a class="btn btn-default btn-lg" href='https://pledgie.com/campaigns/24868'>
          <i class="fa fa-heart"></i>
          Donate
        </a>
      </div>

    </section>
  </div>
</div>
</div>
{% include "../partials/footer.swig" %}