---
title: "The Great Gatsby" date: 2020-05-30
---

I've been watching the Gatsby snowball rolling downhill and accumulating mass
over the last year or two. Pre-COVID-19 when commuting was still a thing, it seemed
like every week I would listen to a podcast either adding more fuel to
the Gatsby hype machine or debating it's merits. Regardless of who history will
prove right, it's impossible to deny that Gatsby is making a big splash. With
their recently announced [\$28M Series
B](https://www.gatsbyjs.org/blog/2020-05-27-announcing-series-b-funding/) from
Index Ventures, they're making an ambitious attempt to steer the direction of
modern web development.

## Why I chose Gatsby for this blog

Once I decided to launch this blog, I did a bunch of research on how I wanted to
host it. Ultimately, I chose Gatsby and wanted to share my reasons (roughly in
order of importance).

### 1. Cost

All-in, with AWS hosting I can run this website for an expected ~\$19.48 per
year. Here's the cost breakdown:

| Item            | Estimated Annual cost | Notes                                                                                  |
| --------------- | --------------------- | -------------------------------------------------------------------------------------- |
| S3 file storage | \$0.28                | \$0.023 per GB per month [^1]                                                          |
| Cloudfront CDN  | \$1.20                | \$0.010 per 10,000 HTTPS requests and \$0.085 for 10TB of data transfer per month [^2] |
| Route53 DNS     | \$18                  | .com TLDs are \$12 per year and hosted zones are \$0.50 per month [^3]                 |

### 2. Curiosity

Given the hype, I had to find out if Gatsby could help streamline the often
frustrating process of web development. Additionally, I've been wanting to learn
more React and check out Graphql. A blog seems like a good, low-complexity
project to tinker with both of those technologies as well.

### 3. Ownership

When I started talking about the idea of launching this blog, a few people
recommended throwing something up on WordPress or another hosted platform.
That way, I could focus on writing and wouldn't get sidetracked building
features or troubleshotting issues. While I wholly agree with trying to stay
focused, I think the time spent developing the site myself is worth the having
100% ownership and control. I'm not advocating a Henry Thoreau style of complete
digital self-reliance, but I'll always prefer self-hosted options if the time
and monetary cost is low.

As much as I like to think that companies offering free services typically "do
the right thing," businesses don't exist to provide services for free. Your
usage is being monetized somehow, and in most cases there's nothing to stop a
company from suddenly changing the terms of service, selling / sharing user
data, or not doing enough to protect user data. I know a lot of Medium bloggers
were surprised when their content was suddenly put behind a login wall.

### 4. Perceived ease of use

For a simple blog, React and Graphql are probably overkill, but I was still sold
on the perceived simplicity of the how the site would ultimately be served.
After using Gatsby to run your production build, you're just left with just HTML,
CSS, and JS files. More interactive web apps are going to need to figure out user
authentication and an API layer, but I won't need any of that. Plus, I already
take a ton of notes in markdown files, so I'm used to the workflow.

## The verdict

I think what has impressed me most about Gatsby is the documentation and
community around the project. You can tell they're putting that good VC money to
work in those areas. I followed the getting started tutorial and had a working
blog plus basic knowledge of the framework's fundamentals in about 1 hour. I
spent another 30 minutes surfing community themes until I found [The Plain
Gatsby](https://github.com/wangonya/the-plain-gatsby) by
[@wagonya](https://github.com/wangonya). Setting up static site hosting in AWS s3 is
always a tedious trek through the support docs, but after another 1 or 2 hours that was
ready to go too. Overall, not a bad upfront cost.

Now I'm off to the races! The process of writing markdown files, previewing the
content live on the development server, and deploying the production build has
been silky smooth. It's still early, but this jury is deliberating in favor of
finding Gatsby innocent on all charges of being just another over-engineered JS
framework.

[^1]: [AWS s3 pricing](https://aws.amazon.com/s3/pricing/)
[^2]: [AWS Cloudfront pricing](https://aws.amazon.com/cloudfront/pricing/?nc=sn&loc=3)
[^3]: [AWS Route53 pricing](https://aws.amazon.com/route53/pricing/)
