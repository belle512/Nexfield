# Nexfield Africa Business Consultancy Website

This is the Jekyll-based website for Nexfield Africa Business Consultancy. The site is designed to showcase our services and provide valuable insights through our blog.

## Features

- Responsive design
- Blog with Markdown support
- SEO optimized
- Contact form
- Testimonials section

## Local Development

### Prerequisites

- Ruby version 2.5.0 or higher
- RubyGems
- GCC and Make

### Installation

\`\`\`
# Install Jekyll and Bundler
gem install jekyll bundler

# Clone the repository
git clone https://github.com/yourusername/nexfield-africa.git
cd nexfield-africa

# Install dependencies
bundle install

# Start the local server
bundle exec jekyll serve
\`\`\`

The site will be available at `http://localhost:4000`.

## Adding Blog Posts

To add a new blog post, create a new Markdown file in the `_posts` directory with the following naming convention:

\`\`\`
YYYY-MM-DD-title-of-the-post.md
\`\`\`

Include the following front matter at the top of the file:

\`\`\`yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
author: "Author Name"
image: "/assets/images/your-image.jpg"
description: "A brief description of your post for SEO purposes."
---
\`\`\`

Then write your post content in Markdown format.

## Deployment

This site is configured to be automatically built and deployed by GitHub Pages. Simply push your changes to the main branch, and GitHub will handle the rest.

## Customization

- Site settings can be modified in `_config.yml`
- Styles can be changed in `assets/css/styles.css`
- Layout templates are in the `_layouts` directory
