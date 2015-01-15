{% extends '../layout.swig' %}

{% block contents %}

{% if node.hasDescendants({type: 'module'}) %}
<h2 class='h4'>Submodules of <code>{{node.fullname}}</code></h2>
<ul>
{% traverse child in node.children -%}
  {% if child.type == 'module' %}
    <li><a href="#">{{child.name}}</a>
      {% if child.hasDescendants({type: 'module'}) -%}
        <ul>
      {% endif -%}
  {% endif -%}
{% postvisit -%}
  {% if child.type == 'module' %}
    {% if child.hasDescendants({type: 'module'}) %}
      </ul>
    {% endif %}
    </li>
  {% endif -%}
{% endtraverse -%}
</ul>
{% endif %}
{% endblock %}
