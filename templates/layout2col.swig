{% include 'partials/head.swig' %}

{% include 'partials/heading.swig' %}
    <div class="container">
      <div class="row">
        <aside class="col-sm-3 sidebar-container" role="aside">
          {% block aside %}{% endblock %}
        </aside>
        <div class="content col-sm-9" role="main">
          {% block contents %}{% endblock %}
        </div>
      </div>
    </div>
{% include "partials/footer.swig" %}