---
title: "Learning Scala in 2021" date: 2021-03-23
---

# Learning Scala in 2021

Last fall I needed to learn Scala ASAP. Coming from an object-oriented
background in Python, Javascript, and Java, it wasn't the easiest transition (I
still consider it ongoing). It seems like there are plenty of options for
developers picking up Scala these days, so I wanted to share my thoughts on the
ones that I used.

## 1. [Functional Programming in Scala Specialization](https://www.coursera.org/specializations/scala#about)

<div style="text-align:center"><img height=100px src="https://www.dropbox.com/s/v84rcqx6g4mt2s3/coursera-logo-full-rgb.png?raw=1" /></div>

Cost: free

This offering by Coursera is taught by none other than Martin Odersky, which is
a good enough reason to at least give it consideration. His
explanations are always succinct and articulate, and it's a cool opportunity to
be able to learn the language from its creator. The material is definitely
accessible for developers without a deep foundation in academic computer
science, but Odersky's treatment of the subject leans academic. For example, the
practice problems tend to be fairly algorithmic (i.e. one assingment is to
implement a binary tree representation of a Huffman code).

I will admit that I only finished the 1st course and half of the 2nd course
before I diverted my attention to another resource. The content was good, but in
my situation I needed a quick booster shot instead of 2 semesters worth of
material. In the future I would like to revisit the rest of the 2nd course and
the 3rd course.

## 2. [Essential Scala](https://underscore.io/books/essential-scala/)

<div style="text-align:center"><img height=100px src="https://www.dropbox.com/s/8d25pg5v8jp48yd/underscore.png?raw=1" /></div>

Cost: free

I love this book. In fact I love all of the underscore books that I've read.
Essential Slick is great and although there are several chapters of Essential
Play that are out of date, it's equally solid. I'm hoping I'll have time to dig
into Advanced Scala with Cats later this year.

As you would expect, Essential Scala starts out with a basic overview of the
language features and syntax. Then in Chapter 4, things get interesting. The
authors tackle abstract and notoriously difficult to explain concepts like
generic types, algebraic data types, folds, and monads with the best
explanations that I've seen so far. These topics are all so inter-connected, and
I felt like the way that the author's structured the content really demonstrated
how each one of these concepts extends or connects to the previous one.

Overall, I've really enjoyed working through this text. I have a feeling that
Essential Scala would be a great fit for someone interested in a resource that
teaches functional programming with Scala in a digestible format. Personally, I
found it easier and more engaging to work through than Odersky's lectures.

## 3. [Scala for the Impatient](https://horstmann.com/scala/)

<div style="text-align:center"><img height=250px src="https://www.dropbox.com/s/jgnq53ozzm65tx0/scalafortheimpatient.jpg?raw=1" /></div>

Cost: not free (the first few chapters might be freely available somewhere)

Scala for the Impatient is written by the venerable Java and C++ author Cay
Horstmann. If I had to choose 1 word to describe the book, I would choose
"efficient." The book delivers the most efficient introduction to the Scala
language that I've seen. It's laser focused on providing a brief explanation for
all of the language's prominent features and syntax. You won't find any content
on functional programming or structuring your programs, because that's not the
book's purpose. Reading this book was like hopping on one of those double decker
tour buses that hits all the tourist attractions in 1 day. You're not going to
read it cover to cover and know how to write good Scala, but you will at least
know what you don't know.

In my first few weeks as a Scala developer, this book sat on my desk, and I
referenced it daily. Whenever I forgot the syntax for a pattern match or what
the apply method of an object does, this was the book I went to for a quick
recap. Sure I could've just hit StackOverflow, but I found it nice to have a
physical book. Plus I started adding a sticky note to any section that I
revisited more than twice, which made it super quick to find the things that I
had commonly forgotten... I swear I read the section on self types about 15
times.

If you've never written a line of Scala and you need to start contributing to a
production code base tomorrow, this book is for you. Given Horstmann's
background, it's probably unsurprising that I think it's particularly useful for
Java or C++ developers. Horstmann makes ample comparisons to both languages
throughout the book.

## 4. [Hands-on Scala Programming](https://www.handsonscala.com/)

<div style="text-align:center"><img height=250px src="https://www.dropbox.com/s/9x78vbsmppyw4pc/handsonscala.jpg?raw=1" /></div>

Cost: not free

You can't help but respect Li Haoyi. He's like the Leonardo Da Vinci of Scala
libraries. He built an entire Scala ecosystem. You could write a non-trivial app
using only the libraries he created. When I saw that he was writing a book, I
was pumped.

Hands on Scala aims to teach readers how to get things done in Scala. The goal
isn't mastering all of the available syntax or the functional programming
paradigm. This is a book for people who want to learn by building real projects.
All of the content is delivered via mini-projects. For the most part, I thought
the projects were interesting and well selected.

In theory, I love this book. I had fun working on the projects and very much
identify with the frustration that Haoyi felt with the Scala ecosystem. A lot of
the libraries in the ecosystem are unnecessarily confusing or focused on
experimental syntax / approaches instead of getting things done. The problem is
that these libraries are often industry standards.

The deeper I got into Hands on Scala, the more I realized that it didn't align
with my goals. I was reading this book in order to be more productive at work,
so it really didn't benefit me to learn Haoyi's ecosystem of libraries. I'm
already familiar with the concept of JSON serialization, so learning uPickle
didn't really make it easier to learn Play JSON. For whatever reason, picking up
Play JSON was like hitting a brick wall. The same situation repeated itself for
almost every library he introduced. Mill is a pretty straightforward build
tool... we use SBT at work. Requests-scala is super intuitive for anyone coming
from Python... we use Play WS at work. The final straw for me was when he
introduced his own actor library. I'm sure it's easier to use than Akka, but
Akka is the industry standard. And guess what? We use Akka at work.

I think Hands On Scala is an ideal resource if you're learning Scala in order to
build stuff for fun. However, it's hard to recommend this book resource if
you're learning Scala for a day job as a Scala developer. The tough thing about
writing a book about getting things done is that it requires a lot of libraries.
As a result, a lot of the content is about learning to use the tools to do a
thing. If your team isn't using the same tools, you'll need to invest further
time to translate from library to the other.

## Conclusion

If I had to start over tomorrow, I would probably pick up a paperback copy of
Scala for the Impatient for reference and start reading through the free online
copy of Essential Scala. That being said, you really can't go wrong with any of
these four resources. Just grab the one that sounded most appealing and get
started!
