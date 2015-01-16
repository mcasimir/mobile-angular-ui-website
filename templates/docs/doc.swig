{% extends '../layout2col.swig' %}

{% block aside %}
{% include 'toc.swig' %}
{% endblock %}

{% block contents %}
<div id="docs-contents">
{{ node.contents | marked }}
</div>
{% endblock %}
