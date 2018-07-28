---
layout: page-hero
title: About Underdog's Triumph
summary: Learn about Underdog's Triumph and who's behind it
featured-img: mishka-chair
---

# Mission

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

[Learn more]({{ "/mission" | relative_url }})

<hr>

# Team

{% assign people = site.people | sort: 'order' %}
<div class="post-list" itemscope="" itemtype="http://schema.org/Blog">
    {% for person in people %}
        {% include card-person.html %}
    {% endfor %}
</div>