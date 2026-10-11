---
layout: page
title: Projects
permalink: /projects/
description: Tools I build and share.
nav: true
nav_order: 3
---

{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="project-list">
  {% for project in sorted_projects %}
    {% include project_card.liquid %}
  {% endfor %}
</div>
