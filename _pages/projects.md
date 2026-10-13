---
layout: page
title: Projects
permalink: /projects/
description: Research projects, and tools I build on the side.
nav: true
nav_order: 3
---

{%- comment -%}
Two groups, set by each project's `kind`: research projects (with a paper) first,
then side projects. Each group is ordered by `importance`.
{%- endcomment -%}
{% assign sorted_projects = site.projects | sort: "importance" %}
{% assign research_projects = sorted_projects | where: "kind", "research" %}
{% assign side_projects = sorted_projects | where: "kind", "side" %}

<section class="project-group" aria-labelledby="research-heading">
  <h2 id="research-heading">Research</h2>
  <div class="project-list">
    {% for project in research_projects %}
      {% include project_card.liquid %}
    {% endfor %}
  </div>
</section>

<section class="project-group" aria-labelledby="side-heading">
  <h2 id="side-heading">Side projects</h2>
  <div class="project-list">
    {% for project in side_projects %}
      {% include project_card.liquid %}
    {% endfor %}
  </div>
</section>
