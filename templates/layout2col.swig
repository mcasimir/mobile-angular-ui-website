{% include 'partials/head.swig' %}

{% include 'partials/heading.swig' %}
    <div class="container">
      <div class="row">
        <div class="sidebar-container col-sm-2" role="aside">
          {% block toc %}{% endblock %}
          <hr class='visible-xs-block'>
        </div>
        <div class="content col-sm-10 col-md-8" role="main">
          {% block contents %}{% endblock %}
        </div>
        <aside class="col-md-2" role="aside">
          <hr class='visible-xs-block'>
          {% block aside %}{% endblock %}
        </aside>
      </div>
    </div>
{% include "partials/footer.swig" %}