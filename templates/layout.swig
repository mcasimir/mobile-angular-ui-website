<!DOCTYPE HTML>
<html lang="en" itemscope itemtype="http://schema.org/Article">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Maurizio Casimirri (http://github.com/mcasimir)">
    <title>{{node.title}} | Mobile Angular UI</title>
    <link rel="publisher" href="https://plus.google.com/+MobileangularuiGp"/>
    <link href="/assets/css/main.css" rel="stylesheet" />
    <link rel="shortcut icon" href="/assets/img/favicon.png" />
    <!--[if lt IE 9]>
      <script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="//oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    {% include "./navbar.swig" %}

    <div {% if node.type == 'home' %}class="container"{%endif%}>
      <div class="row">
        <aside class="col-sm-3 sidebar-container" role="aside">
          <ul class="toc sidebar nav" id="toc">
          </ul>
        </aside>
        <div class="content col-sm-9" role="main">
          <ol class="breadcrumb">
            {% for ancestor in node.ancestors() | reverse %}
                <li><a href="{% pathfor ancestor %}">{{ancestor.title}}</a></li>
            {% endfor %}

            <li class="active">{{node.title}}</li>
          </ol>
          <div class="page-header">
            {% block heading %}{% endblock %}
            <h1>{{node.title}}<br><small>{{node.type}} {% if node.parent.fullname %}<small>in</small>{% endif %} <code>{{node.parent.fullname}}</code></small></h1>
          </div>
          {% block contents %}{% endblock %}
        </div>
      </div>
    </div>
    
    {% include "./footer.swig" %}
    {% include "./analytics.swig" %}

    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="/assets/js/main.js"></script>
  </body>
</html>