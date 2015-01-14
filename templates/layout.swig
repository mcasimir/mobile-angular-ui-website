{% include 'partials/head.swig' %}
<div class="container">
  <div class="content" role="main">
    <ol class="breadcrumb">
      {% for ancestor in node.ancestors() | reverse %}
        <li><a href="{{ ancestor.path }}">{{ancestor.title}}</a></li>
      {% endfor %}
      <li class="active">{{node.title}}</li>
    </ol>
    <div class="page-header">
      {% include 'partials/heading.swig' %}
    </div>
    {% block contents %}{% endblock %}
  </div>
</div>
{% include "partials/footer.swig" %}