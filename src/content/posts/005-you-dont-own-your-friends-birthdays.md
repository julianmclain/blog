---
title: "You don't own your friends' birthdays"
date: 2020-06-24
---

In 2019, Facebook decided to quietly remove the ability to export the date of
your friends' birthdays. Personally, I feel divided about this decision.

On one hand, I fully support it. Your date of birth is personal information that
you should be able to protect. If I decide tomorrow that I no longer want to
share my birthday on Facebook, it's problematic if all of my Facebook friends
have already exported that data. The export ability undermines any privacy
controls Facebook provides for birthdays. Additionally, people's social media
accounts are hacked all the time. If I were in the business of hacking Facebook
accounts, the first thing I would do is download whatever data can be exported.

On the other hand, as a user of the Internet, I believe you have to expect that
any information you share publicly will be downloaded, analyzed, distributed,
and generally used for nefarious purposes. Once you voluntarily add your date of
birth to your Facebook Profile and set it to visible, you've already given up
control over that information. Removing the export feature isn't going to stop
anyone motivated enough to write a script to scrape that exact same data from
the web HTML. It stops well-meaning friends who want to use the data in a way
that doesn't support Facebook's revenue model.

## Focus vs. Friendship

I ran head-on into this dilemma thanks to COVID-19. Normally, I like to run my
phone and laptop like a 15th century convent. Almost all notifications are
disabled, my phone uses grayscale, my desktop and lockscreen are minimally
adorned, etc... This approach is great for productivity, but unfortunately not
great for keeping in touch with friends and family. It's turned me into the
social equivalent of Cousin Eddie from National Lampoon's Christmas Vacation:
unheard from in months and then suddenly dropping in for a good time. With the
current state of isolation, I've been trying to re-adjust some of those
distraction-reducing controls and find a balance between keeping in touch and
keeping in focus.

One thing I'm trying is to call and / or text people on their birthday. It's
great except it requires going into Facebook and navigating the UI soup while
praying that my 15 second mission doesn't get derailed by the latest quarantine
dance video my buddy and his girlfriend posted (it was hilarious, I should check
their Timeline to see if they have more...). I felt like there had to be a way
to get this info without running the Facebook UI gauntlet, which sent me in
search of the Facebook birthday export feature.

## fb2cal

After a bit of searching on Github, I proved part of my theory about sharing
information on the Internet. If you share it, it will be downloaded. A
Pythonista named Mo Beigi wrote [fb2cal](https://github.com/mobeigi/fb2cal), a
script to scrape your friend's Facebook profiles and write the birthdays to a
file on your machine.

fb2cal is a solution to the "Facebook UI gauntlet" problem, but it's less than
ideal for a bunch of reasons. The biggest one is that it requires your Facebook
credentials, the Internet equivalent of giving a stranger a copy of your house
keys. There's nothing to stop fb2cal from logging in and changing your password,
saving your password, or saving a copy of all your data elsewhere for its own
purposes. That sounds terrible, but it's offset by the fact that all of the code
is sitting there in Github and you can audit it for yourself. It's not much
code, and if you've done some webscraping it will look pretty familiar.

I'm still undecided on the ethicality of the export birthdays feature, but I
made my decision. If you have any thoughts or better alternatives than fb2cal,
shoot me a note.
