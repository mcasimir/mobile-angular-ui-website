{% extends '../layout.swig' %}

{% block contents %}

<div class="alert">
  Made an app with mobile angular UI? Let everyone know!
  <button class="btn btn-primary pull-right btn-submit-your-app" data-toggle="modal" data-target="#myModal">
    Submit your App <i class="fa fa-chevron-right"></i>
  </button>
</div>

<div class="row text-center">
  {% for child in node.children.value() %}
    <div class="col-sm-3">
      <a href="{{ child.path }}" class="app-icon">
      <img src="{{child.icon}}" alt="{{child.title}}" class="app-icon-img">
      <h3 class="app-icon-title">{{child.title}}</h3>
      </a>
    </div>
  {% endfor %}
</div>


<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">Made an app with Mobile Angular Ui? Let everyone know!</h4>
      </div>
      <div class="modal-body">
{% marked %}
Send an email to <a href="mailto:mobileangularui@gmail.com">mobileangularui@gmail.com</a> indicating:

Required:
- App name
- App description
- App icon 144x144
- Some screenshots
- Platforms (android, ios, ms, website...)
- Where to find your app (website, app store, play store...)

Optional:
- Product/company/developer website
- Whatever you wish to add to your app page

{% endmarked %}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <a href="mailto:mobileangularui@gmail.com" class="btn btn-primary">Send the email</a>
      </div>
    </div>
  </div>
</div>

{% endblock %}

