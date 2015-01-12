{% extends './layout.swig' %}

{% block heading %}
<a href="https://github.com/mcasimir/mobile-angular-ui/blob/master/{{node.src}}" target='blank' class="btn btn-default pull-right"><i class="fa fa-pencil"></i> Source</a>
{% endblock %}

{% block contents %}
{{ node.description | marked }}

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
