---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

{% include base_path %}

Here are a few of my featured works in AI and Data Science.

{% for post in site.projects %}
  {% include archive-single.html %}
{% endfor %}
