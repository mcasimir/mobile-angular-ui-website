{% extends '../layout2col.swig' %}

{# paramName #}
{% macro paramName(param) -%}
{% if param.optional -%}<i><span class="text-muted">[</span>{{param.name}}{% if param.defaultvalue %}<span class="text-muted">=</span>{{param.defaultvalue}}{% endif %}<span class="text-muted">]</span></i>{% else %}{{param.name}}{% endif -%}
{% endmacro -%}

{# arglist #}
{% macro arglist(params) -%}
{% for param in stripOptionParams(params) -%}{{paramName(param)}}{% if !loop.last -%}, {% endif -%}{% endfor -%}
{% endmacro -%}

{# paramsTable #}
{% macro paramsTable(params) %}

<table class='table table-params'>
  <thead>
    <tr><th>Param</th><th>Type</th><th>Description</th></tr>
  </thead>
  <tbody>
    {% for param in params %}
    <tr><td><code>{{paramName(param)}}</code>
    </td><td><small class="mono">{{param.type}}</small></td><td>{{param.description | marked}}</td></tr>
    {% endfor %}
  </tbody>
</table>
{% endmacro %}

{% macro renderMethodSynopsis(klass, method, params, returns) %}
<pre class='synopsis'><code>{{klass}}.{{method}}({{arglist(params)}}){% if returns %} ⟶ {{returns.type}}{% endif %}</code></pre>
{% endmacro %}

{% macro renderMember(child) %}
<div class="doc-node doc-{{child.type}}">
  {% set childType = child.type === 'function' && child.ngdoc !== 'directive' ? 'method' : child.type %}
    <h4 id="{{child.parent.ngdoc || child.parent.type}}:{{ child.parent.slug }}/{{ child.type }}:{{ child.slug }}" class="doc-page-header">{{child.title}} <small>{{childType}} <small><i>in</i></small> {{child.parent.title}}</small></h4>
    {% if childType === 'method' %}
      {{renderMethodSynopsis(child.parent.title, child.title, child.params, child.returns)}}
    {% endif %}
    


  {{ child.contents | marked }}

  {% if child.params && child.params.length %}
    {{paramsTable(child.params)}}
  {% endif %}
</div>
{% endmacro %}

{# renderChild #}
{% macro renderChild(node) %}
  <div class="doc-node doc-{{node.ngdoc}}">
    <h3 id='{{node.ngdoc}}:{{node.slug}}' class='page-header doc-page-header'>{{node.title}} <small>{{node.ngdoc}}</small></h3>

    {{ node.contents | marked }}

    {% if node.params && node.params.length %}
      {{paramsTable(node.params)}}
    {% endif %}
    
    {% set childEvents = _.where(node.children, {type: 'event'}); %}
    {% set childMethods = _.where(node.children, {type: 'function'}); %}

    {% if childMethods.length %}
      <h4 id='{{node.ngdoc}}:{{node.slug}}~Methods' class="page-header">Methods</h4>
      {% for child in childMethods %}
        {{renderMember(child)}}
      {% endfor %}
    {% endif %}

    {% if childEvents.length %}
      <h4 id='{{node.ngdoc}}:{{node.slug}}~Events' class="page-header">Events</h4>
      {% for child in childEvents %}
        {{renderMember(child)}}
      {% endfor %}
    {% endif %}

  </div>
{% endmacro %}


{% block aside %}
{% include 'toc.swig' %}
{% endblock %}

{% block contents %}
<div id="docs-contents">
{{ node.contents | marked }}

{% if node.hasDescendants({type: 'module'}) %}
<h2 id='submodules' class="page-header">Submodules</h2>
<ul>
{% traverse child in node.children %}
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
{% else %}
  {% for child in node.children %}
      {% if child.ngdoc == 'service' %}
        {{renderChild(child)}}
      {% endif %}
  {% endfor %}

  {% for child in node.children %}
      {% if child.ngdoc == 'directive' %}
        {{renderChild(child)}}
      {% endif %}
  {% endfor %}
{% endif %}
</div>
{% endblock %}
