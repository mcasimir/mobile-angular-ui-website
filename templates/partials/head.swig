<!DOCTYPE HTML>
<html lang="en" itemscope itemtype="http://schema.org/Article">
  <head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Maurizio Casimirri (http://github.com/mcasimir)">
  {% if node.type === 'home' %}
  <title>{{ config.title }} - {{ config.tagline }}</title>
  <meta itemprop="name" name="twitter:title" property="og:title" content="{{ config.title }} - {{ config.tagline }}" />
  {% else %}
  <title>{{node.title}} | {{ config.title }}</title>
  {% endif %}
  {% if node.description %}
  <meta itemprop="description" name="description" property="og:description" content="{{node.description}}" />
  <meta name="twitter:description" content="{{node.description}}" />
  {% endif %}
  {% if node.keywords %}<meta name="keywords" content="{{ node.keywords }}" />{% endif %}
  {% if node.type === 'post' %}<link rel="author" href="https://plus.google.com/+MaurizioCasimirri/posts"/>{% endif %}
  <link rel="publisher" href="https://plus.google.com/+MobileangularuiGp"/>
  {% if node.image %}
  <meta name="twitter:image:src" itemprop="image" property="og:image" content="{{node.image}}" />
  {% else %}
  <meta name="twitter:image:src" itemprop="image" property="og:image" content="/assets/img/og-logo.png" />
  {% endif %}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@mobileangularui" />
  <meta name="twitter:creator" content="@mauriziocas" />
  <meta property="og:site_name" content="{{ config.title }}" />
  {% if node.type === 'home' %}
  <meta property="og:type" content="website" />
  {% else %}
  <meta property="og:type" content="article" />
  {% endif %}
  <meta property="og:url"   content="{{ config.host }}{{ node.path.substring(1) }}" />
  <link href="/assets/css/main.css" rel="stylesheet" />
  <link rel="shortcut icon" href="/assets/img/favicon.png" />
  <!--[if lt IE 9]>
    <script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="//oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
  <![endif]-->
  </head>
  <body>
    {% include "./navbar.swig" %}
