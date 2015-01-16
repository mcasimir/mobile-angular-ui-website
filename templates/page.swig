{% extends 'layout.swig' %}

{% block contents %}
<div id="page-contents">
  {{ node.contents | marked }}
</div>
{% endblock %}
