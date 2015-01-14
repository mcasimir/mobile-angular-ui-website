{% if node.src %}
<a href="https://github.com/mcasimir/mobile-angular-ui/blob/master/{{node.src}}" target='blank' class="btn btn-default pull-right"><i class="fa fa-pencil"></i> Source</a>
{% endif %}
<h1>{{node.title}}
{% if node.type === 'module' || node.ngdoc %}
<br><small>{{node.type}}</small>
{% endif %}
</h1>



