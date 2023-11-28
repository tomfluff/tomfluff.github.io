<h2 id="news">News</h2>

<ul>
{% for news in site.data.news.main limit:5 %}
<li>
    <strong>[{{ news.date | date: "%b. %Y" }}]</strong>
    <span>{{ news.headline }}</span>
</li>
{% endfor %}
</ul>

<div style="flex: 1 1 auto; text-align: right; margin-top: 1em;margin-bottom:1em;">
    <a class="fancy-button" href="/news">See More</a>
</div>