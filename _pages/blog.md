---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

<div class="post blog-index">
  {%- comment -%}
    Blog index: the page title at the site's title size with a one-line description,
    links to each category, then one list in which pinned posts (featured: true) lead
    page 1 with a "Pinned" marker instead of sitting in a separate card above it.
  {%- endcomment -%}
  <header class="blog-index-header">
    <h1 class="post-title">{{ site.blog_name }}</h1>
    {% if site.blog_description %}
      <p class="blog-description">{{ site.blog_description }}</p>
    {% endif %}
    {% assign blog_categories = site.categories | sort %}
    {% if blog_categories.size > 0 %}
      <ul class="blog-categories" aria-label="Categories">
        <li><a href="{{ '/blog/' | relative_url }}" aria-current="page">All</a></li>
        {% for category in blog_categories %}
          <li><a href="{{ category[0] | slugify | prepend: '/blog/category/' | relative_url }}">{{ category[0] | capitalize }}</a></li>
        {% endfor %}
      </ul>
    {% endif %}
  </header>

{% assign posts_size = site.posts | size %}
{% if posts_size == 0 %}

<p><i>No available posts to display.</i></p>
{% endif %}

{% if page.pagination.enabled %}
{% assign postlist = paginator.posts %}
{% assign first_page = false %}
{% if paginator.page == 1 %}{% assign first_page = true %}{% endif %}
{% else %}
{% assign postlist = site.posts %}
{% assign first_page = true %}
{% endif %}
{% assign pinned_posts = site.posts | where: 'featured', true %}

  <ul class="blog-list">
    {% if first_page %}
      {% for post in pinned_posts %}
        {% include blog_list_item.liquid post=post pinned=true %}
      {% endfor %}
    {% endif %}
    {% for post in postlist %}
      {% unless post.featured %}
        {% include blog_list_item.liquid post=post %}
      {% endunless %}
    {% endfor %}
  </ul>

{% if page.pagination.enabled %}
{% include pagination.liquid %}
{% endif %}

</div>
