{% extends 'layout.swig' %}

{% block contents %}
{{ node.contents | marked }}
{% endblock %}
