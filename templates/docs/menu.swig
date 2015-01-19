<div class="doc-menu">
  <div class="h5">Basics</div>

  <ul class="nav">
    <li><a {% if node.path == '/docs' %}class='active'{% endif %}
    href="/docs">Start to Learn</a></li>
    <li><a {% if node.path == '/docs/getting-started' %}class='active'{% endif %}
    href="/docs/getting-started">Getting Started</a></li>
  </ul>

  <div class="h5">Components</div>

  <ul class="nav">
  {% for child in node.root.find('/docs').children %}
    {% if child.type == 'component' %}
    <li>
    <a 
      {% if node.path == child.path %}class='active'{% endif %} 
      href="{{child.path}}">{{child.title | title}}</a>
    </li>
    {% endif %}
  {% endfor %}
  </ul>

  <div class="h5">API Docs</div>

  <ul class="nav">
    {% traverse child in node.root.find('/docs') %}
        {% if child.type == 'module' %}
          <li>
          <a {% if node.path == child.path %}class='active'{% endif %}
              href="{{child.path}}">{{child.title}}</a>
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
</div>