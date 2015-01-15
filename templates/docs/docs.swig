{% extends '../layout2col.swig' %}

{% block aside %}
{% include 'toc.swig' %}
{% endblock %}

{% block contents %}

<h2>Guides</h2>

<ul>
{% for child in node.descendants({type: 'guide'}) %}
  <li><a href="{{child.path}}">{{child.title}}</a></li>
{% endfor %}
</ul>

<h2>Tutorials</h2>

<ul>
{% for child in node.descendants({type: 'tutorial'}) %}
  <li><a href="{{child.path}}">{{child.title}}</a></li>
{% endfor %}
</ul>

<h2>API Docs</h2>

<ul>
{% traverse child in node.children -%}
  {% if child.type == 'module' %}
    <li><a href="{{child.path}}">{{child.title}}</a>
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

{% endblock %}
