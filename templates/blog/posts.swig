{% extends '../layout.swig' %}

{% block contents %}


<ul class="list-unstyled">
  
{% for post in node.children.value() %}

<li>
  <article>

    <h3><a href="{{post.path}}">{{post.title}}</a></h3>
    <p>
      <small><i>{{post.created_at | date('F j, Y') }}</i></small><br>
      {{post.description}} <a href="{{post.path}}">... Read</a>
    </p>
    <br/>
  </article>
</li>


{% endfor %}

</ul>
{% endblock %}
