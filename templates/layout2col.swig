{% include 'partials/head.swig' %}
    <div class="container">
    <ol class="breadcrumb">
      {% for ancestor in node.ancestors() | reverse %}
          <li><a href="{{ ancestor.path }}">{{ancestor.title}}</a></li>
      {% endfor %}
      <li class="active">{{node.title}}</li>
    </ol>

      <div class="row">
        <aside class="col-sm-3 sidebar-container" role="aside">
          
          <ul class="toc sidebar nav" id="toc">
          </ul>
        </aside>
        <div class="content col-sm-9" role="main">
          <div class="page-header">
            {% include 'partials/heading.swig' %}
          </div>
          {% block contents %}{% endblock %}
        </div>
      </div>
    </div>
{% include "partials/footer.swig" %}