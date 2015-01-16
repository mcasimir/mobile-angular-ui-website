{% include 'partials/head.swig' %}

{% include 'partials/heading.swig' %}
<div class="container">
  <div class="content" role="main">
    {% block contents %}{% endblock %}
  </div>
</div>
{% include "partials/footer.swig" %}