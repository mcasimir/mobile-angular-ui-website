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
    <h3 data-toc-title="{{child.shortTitle || child.title}}"
      class="h4 doc-page-header">
      {{child.title}}<br>
      <small>{{child.type}} 
        <small><i>in</i></small> 
        {{child.parent.title}}
      </small>
    </h3>
    {% if child.type === 'method' %}
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
    <h2 data-toc-title='{{node.shortTitle || node.title}}' class='page-header doc-page-header'>{{node.title}} <small>{{node.ngdoc}}</small></h2>

    {{ node.contents | marked }}

    {% if node.params && node.params.length %}
      {{paramsTable(node.params)}}
    {% endif %}
    
    {% set childEvents = _.where(node.children, {type: 'event'}); %}
    {% set childMethods = _.where(node.children, {type: 'method'}); %}

    {% if childMethods.length %}
    <div>
      <h3 data-toc-type='section' class="page-header">Methods</h3>
      {% for child in childMethods %}
        {{renderMember(child)}}
      {% endfor %}      
    </div>
    {% endif %}

    {% if childEvents.length %}
    <div>
      <h3 data-toc-type='section' class="page-header">Events</h3>
      {% for child in childEvents %}
        {{renderMember(child)}}
      {% endfor %}
    </div>
    {% endif %}

  </div>
{% endmacro %}


{% block aside %}
{% include 'menu.swig' %}
{% endblock %}

{% block toc %}
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

{% set childServices   = _.where(node.children, {ngdoc: 'service'}); %}
{% set childDirectives = _.where(node.children, {ngdoc: 'directive'}); %}

  {% if childServices.length %}
  <h2 data-toc-type='section'>Services</h2>
  {% for child in node.children %}
      {% if child.ngdoc == 'service' %}
        {{renderChild(child)}}
      {% endif %}
  {% endfor %}  
  {% endif %}

  {% if childDirectives.length %}
  <h2 data-toc-type='section'>Directives</h2>
  {% for child in node.children %}
      {% if child.ngdoc == 'directive' %}
        {{renderChild(child)}}
      {% endif %}
  {% endfor %}
  {% endif %}
  
{% endif %}
</div>
{% endblock %}
