{% extends '../layout2col.swig' %}

{% block aside %}
{% include 'toc.swig' %}
{% endblock %}

{% block contents %}
<div id="docs-contents">
  {{node.contents | marked}}

<h2 class="page-header">
  What's next?
</h2>

  <h3>Guides</h3>

  <ul>
  {% for child in node.descendants({type: 'guide'}) %}
    <li><a href="{{child.path}}">{{child.title}}</a></li>
  {% endfor %}
  </ul>

  <h3>Tutorials</h3>

  <ul>
  {% traverse child in node.root -%}
    {% if child.type === 'tutorial' || child.as === 'tutorial' %}
      <li><a href="{{child.path}}">{{child.title}}</a></li>
    {% endif %}
  {% endtraverse -%}
  </ul>

  <h3>API Docs</h3>

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

</div>
{% endblock %}
