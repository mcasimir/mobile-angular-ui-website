<div class="heading">
  <div class="container">
    <h1>{{node.title}}</h1>
    <div class="heading-description">
      {% if node.type === 'module' || node.ngdoc %}
        {{node.type}}
      {% else %}
        {{node.description}}
      {% endif %}
    </div>
  </div>
</div>
<div class="banner banner-crumbs">
  <div class="container">
    {% if node.src %}
    <a href="https://github.com/mcasimir/mobile-angular-ui/blob/master/{{node.src}}" target='blank' class="pull-right"><small><i class="fa fa-pencil"></i> Source</small></a>
    {% endif %}


    <ol class="breadcrumb">
      {% for ancestor in node.ancestors() | reverse %}
        <li><a href="{{ ancestor.path }}">{{ancestor.title}}</a></li>
      {% endfor %}
      <li class="active">{{node.title}}</li>
    </ol>    
  </div>
</div>


