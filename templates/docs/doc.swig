{% extends '../layout2col.swig' %}

{% block aside %}
{% include 'toc.swig' %}
{% endblock %}

{% block contents %}
{{ node.contents | marked }}
{% endblock %}
