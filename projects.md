---
layout: navipage
---

# Projects

{% for project in site.data.projects.main %}
<div class="project-item">
<h2>{{ project.title }}</h2>
<p class="project-date">{{ project.year }}</p>

{% if project.image %}
<img src="{{ project.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
{% endif %}
{% if project.description %}
<p>{{ project.description | markdownify }}</p>
{% endif %}
<div class="links">
{% if project.page %}
<p><a href="{{ project.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a></p>
{% endif %}
{% if project.pdf %}
<p><a href="{{ project.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a></p>
{% endif %}
{% if project.video %}
<p><a href="{{ project.video }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Video</a></p>
{% endif %}
{% if project.code %}
<p><a href="{{ project.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a></p>
{% endif %}
{% if project.others %}
<p>{{ project.others }}</p>
{% endif %}
</div>
</div>
{% endfor %}

[TOP](#projects)