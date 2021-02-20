---
layout: page
title: How to update this site
permalink: /docs
---

## How to add or edit a page

We use GitHub to store all our pages. GitHub is a “version control system”, it tracks changes to a set of document, and allows them to be publically published when approved

The campfire site on GitHub is called a “repository” or “repo” for short

When anyone wants to makes a change to the Campfire site, they start by making a separate section to hold changes, we call this a “branch”. Multiple branches can exist at the same time. Each branch has a name defining why it exists. E.g. “add sausage recipe”

The public Campfire site is built from the ”main” branch

When all the changes on a branch have been completed, you can submit them for approval and publishing by making a “pull request”, or “PR” for short. This is a request to pull the changes into the main branch

Step 1: Open a GitHub account

Step 2: Start a branch

Step 3: Add new pages and images, or edit existing pages

For a new page, copy the text from the master recipe template, and navigate to your groups folder, and click “create new file”. Paste in the template, and edit the title etc, and add your recipe details

Choose a good set of tags and categories from these lists

If you think a new category or tags should be used, make a comment on your PR for the reason why?

Add you group name code from the author page template. If your Scout group is not already listed, please mention in the PR. No personal authors please, please do by Scout group or Scout office for long term maintainability

Step 4: Commit your changes. You can do this multiple times, as you make a significant part of a change, or if you come back latter to improve on what you have done earlier

Step 5: Submit a PR. Then sit back and await approval and publishing

---

## More Technical Stuff

[Theme we used](https://bootstrapstarter.com/bootstrap-templates/template-mediumish-bootstrap-jekyll/)

*Questions or bug reports?*

Head over to our [Github repository](https://github.com/Kaukapakapa-Scout-Group/campfire)

We use the [Kramdown](https://kramdown.gettalong.org/documentation.html) parser

And use the [github flavour of markdown](https://github.github.com/gfm/)

---

You can run jekyll locally and clone the site locally to make change and see how they look in the browser before you submit your PR. This is not required, or particular recommended

---

`gem install bundler` installs the bundler gem through RubyGems. You only need to install it once - not every time you create a new Jekyll project. Here are some additional details:

`bundler` is a gem that manages other Ruby gems. It makes sure your gems and gem versions are compatible, and that you have all necessary dependencies each gem requires.

The `Gemfile` and `Gemfile.lock` files inform `Bundler` about the gem requirements in your site. If your site doesn’t have these Gemfiles, you can omit `bundle exec` and just `run jekyll serve`.

When you run `bundle exec jekyll serve`, `Bundler` uses the gems and versions as specified in `Gemfile.lock` to ensure your Jekyll site builds with no compatibility or dependency conflicts.

For more information about how to use `Bundler` in your Jekyll project, this tutorial should provide answers to the most common questions and explain how to get up and running quickly.

---

There are lots of powerful things you can do with the Markdown editor. If you've gotten pretty comfortable with writing in Markdown, then you may enjoy some more advanced tips about the types of things you can do with Markdown!

As with the last post about the editor, you'll want to be actually editing this post as you read it so that you can see all the Markdown code we're using.

## Special formatting

As well as bold and italics, you can also use some other special formatting in Markdown when the need arises, for example:

+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*


## Writing code blocks

There are two types of code elements which can be inserted in Markdown, the first is inline, and the other is block. Inline code is formatted by wrapping any word or words in back-ticks, `like this`. Larger snippets of code can be displayed across multiple lines using triple back ticks:

```
.my-link {
    text-decoration: underline;
}
```

#### HTML

```html
<li class="ml-1 mr-1">
    <a target="_blank" href="#">
    <i class="fab fa-twitter"></i>
    </a>
</li>
```

#### CSS

```css
.highlight .c {
    color: #999988;
    font-style: italic; 
}
.highlight .err {
    color: #a61717;
    background-color: #e3d2d2; 
}
```

![walking]({{ site.baseurl }}/assets/images/avatar.webp)

¼ - quarter
½ - half
¾ - three quarters
§ - section
± - plus-minus
°C - degrees centigrade
² - squared
³ - cubed
