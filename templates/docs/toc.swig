<ul class="nav nav-toc">
  {% traverse child in node.root.find('/docs') %}
      {% if child.type == 'module' %}
        <li class='toc{{level}}'><a href="{{child.path}}">{{child.title}}</a>
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
  {% endtraverse %}
</ul>