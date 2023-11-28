<h2 id="news">News</h2>

<ul>
{% for news in site.data.news.main limit:5 %}
<li>
    <strong>[{{ news.date | date: "%b. %Y" }}]</strong>
    <span>{{ news.headline }}</span>
</li>
{% endfor %}
</ul>

<div class="link-more">
    <a class="fancy" href="/news">See More</a>
</div>