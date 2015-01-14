{% extends '../layout.swig' %}

{% block contents %}
{{ node.contents | marked }}

{% include '../partials/comments.swig' %}
{% endblock %}
