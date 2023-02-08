---
_id: JT25mgDZyxUcyfTTAWmy1f
# _id: FuJyiSPoBy5dqTgGcHUZOI # Development ID
title: What the Git? My Git workflow
description: To merge or to rebase? This is how I approach Git.
slug: what-the-git
og:
  hue: 130
  title: What the Git?
  gradient: 5
# If you can find an author with this title, do it. Else fallback to main. You can change it easily in the CMS.
author: Main
hero:
  demo:
  image: /media/image/2023/02/what-the-git/banner.png
  alt: An editor window showing the code for a Git alias named "yeet".
  attribution:
tags:
  - Git
publishedAt: 2023-02-03
updatedAt: 2023-02-03
---
Believe it or not. There was a time before Git. A time when people used other version control systems. In fact, some people would even FTP things straight to the server. Wild. I started my front-end career in 2012 (That seems like forever ago). I remember having to get my head around Git as the team I was on transitioned from another system. It could have been Subversion. I remember using Tortoise SVN at some point.

Anyway. This isn't a history lesson. There was a recent kerfuffle on social media about whether to "rebase" or "merge". And it got me thinking, "For real? Do you know what this was like before?". Commit message history was the least of people's worries ha. I've worked in a lot of different setups and seen it done in all sorts of ways. There's no one workflow to rule them all. That's the price of Git being feature rich.

In case you wondered, I'm team rebase for what it's worth.

## GUI vs. CLI

To be honest, I haven't used a GUI app for Git in years. Nothing says that another machine is going to have your GUI app available. This exact scenario pushed me the CLI way when I had to start SSH'ing into remote machines for a role. The deep end will skill you up quicker than anything haha. That said, you can’t take your Git aliases with you.

## Aliases
Creating [Git aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) can save you a lot of time. Pushing something up? `gpu` is quicker to type than `git push`. Over time, it adds up.

How do you write an alias? That depends on how you're set up. You could write them into your `.gitconfig`. I like to set them up with the command line shell. I use ZSH and these are my current aliases. I do use `yolo` a bunch as part of the forking workflow.

``` shell
#
# Git aliases
#
alias gs="git status"
alias gba="git branch -av"
alias gch="git checkout"
alias gca="git commit -a -m"
alias gaa="git add --all"
alias gau="git remote add upstream"
alias gfu="git fetch upstream"
alias gpl="git pull"
alias gpu="git push"
alias yolo="git push --force"
alias yolos="git push --force && say That was sneaky!"
alias gps="git push && say You are awesome!"
alias gcl="git clone"
alias glg="git log"
alias gst="git shortlog -sn"
alias gsl="git stash list"
alias gsc="git stash clear"

function gsb() {
  git checkout -b $1 upstream/main
}
function gdb() {
  git branch -d $1
  git push origin :$1
}
function gas() {
  git stash apply stash@\{$1\}
}
function grb() {
  git rebase -i HEAD~$1
}
```

ZSH supports functions and they're great for creating aliases that handle parameters. I have a rebase alias that allows me to do things like start an interactive rebase of the last 3 commits. Instead of `git rebase -i HEAD~3`, it's `grb 3`. Easy.

## Workflow

Rebase or merge? Whatever you prefer. The goal is to get code into a code base. I can't remember where seeing a merge commit in a Git log has been an issue. That said, I prefer not seeing them in there. It's easier to read depending on the amount of traffic.

Where possible, I try to follow the "[Forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)". To me, that feels the most risk-averse. Contributors can only break their own yard.

Powered by my aliases, I'll likely do something like this:

```shell
# Clone my fork
gcl https://github.com/dev/awesome-project.git
cd awesome-project
# Add an upstream remote
gau https://github.com/official/awesome-project.git
# Fetch the upstream
gfu
# Start a new branch for what I'm doing
gsb FEAT-123/new-component
```
And then I'll crack on with a feature or something. I'll likely make a bunch of changes along the way. And I'll write myself messages in the commits:

```shell
gca "update"
gca "try different looping method"
gca "pre lunch commit"
gca "check in before the refactor storm"
```

The idea is that these atomic messages help me out. If I needed to roll back to some point in time, I could. I'll tidy them up before I push. No one needs to know about the commit I made before lunch.

When everything looks good and I'm ready to push, I'll do an [interactive rebase](https://docs.gitlab.com/ee/topics/git/git_rebase.html). I'll squash all the meta-commits making it easier for others to read the commit history. If it feels like there are useful checkpoints, I'll leave them in. But, this kinda leans towards the ideal practice of keeping things atomic. If you start creating a bunch of checkpoints, they could likely all be pull requests. And it's easier for someone to review smaller changes.

```shell
# interactive rebase last 4 commits
grb 4
# push those changes
yolo
```
You can use the "Squash and merge" button on GitHub. I recommend it. Thing is. This habit started for me way before that feature was available. It's not a bad habit to have. I'll squash my commits, make sure I'm up to date with the official repo, and push.

----------

That's it. At the end of the day, find a workflow that's comfortable for you and be mindful of others. Keep things atomic. I mean, as long as the code gets into the repo, that's the main thing. That's the goal. Heck, write an alias that acts like FTP if you want (_Maybe don't do this_).

```shell
function ftp() {
  git commit -a -m "FTP"
  git push --force
}
```

__Stay Awesome!__

<Signature></Signature>

## Further Reading

- [Git aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases): Git
- [Forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow): Atlassian
- [Rebase and push](https://docs.gitlab.com/ee/topics/git/git_rebase.html): GitLab
- [ZSH Functions](https://zsh.sourceforge.io/Doc/Release/Functions.html): ZSH Sourceforge
- [Oh My ZSH](https://ohmyz.sh/): Oh My ZSH
