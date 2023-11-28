---
layout: navipage
---

# News

{% for news in site.data.news.main %}
<div class="news-item">
<h2>{{ news.headline }}</h2>
<p class="news-date">{{ news.date | date: "%B %d, %Y" }}</p>

{% if news.image %}
<img src="{{ news.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
{% endif %}
{% if news.description %}
<p>{{ news.description | markdownify }}</p>
{% endif %}
</div>
{% endfor %}

[TOP](#news)