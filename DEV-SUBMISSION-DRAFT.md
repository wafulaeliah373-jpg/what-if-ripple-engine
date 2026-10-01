---
title: "I built a small machine for imagining impossible futures"
published: false
tags: devchallenge, sanitychallenge, sanity, ai
---

*This is a submission for the [Sanity Challenge, Path Two: Vibe-Code Something Strange](https://dev.to/challenges/sanity-2026-09-16)*

## What I Built

**WHAT IF** is a small playground for impossible questions. Its stories live as structured documents in Sanity and appear on a Nuxt site. Open a story and the Ripple Engine lets you follow the idea through three horizons: the first day, one year later, and generations later. Editors can write a specific consequence for each horizon in Sanity; when they have not, the engine gives readers a prompt to imagine one.

## Demo

<!-- TODO before submitting: deploy the Nuxt app and paste its public URL here. -->

## Code

<!-- TODO before submitting: publish the project in a public Git repository and paste the URL here. -->

## My Build Process

I built this project with help from Codex, an AI coding assistant, and used Sanity CLI and the Nuxt CLI to create the starter projects. I chose Nuxt for the public site and Sanity for editing the questions and stories.

Getting the local setup working took a few tries. PowerShell blocked the `npm.ps1` script, so I ran npm through `npm.cmd`. The Sanity CLI's optional agent-skills setup could not clone its repository because Git was not installed; I continued with the Nuxt setup instead. I also had to connect the Nuxt app to the existing Sanity project. Once that was in place, the question board and individual story pages could read the published documents.

The first version was a simple story list and detail page. I then added the Ripple Engine as an interaction that gives each structured story a time-based way to branch into consequences. The new `ripples` field lets an editor replace the default prompts with authored, story-specific outcomes. I have not added a generative AI service: the engine uses the published story and editor-written content, so its behavior is predictable and visible to the reader.

## Sanity Project Details

- **Project ID:** `c526wkjm`
- **Dataset:** `production`
- **Main document type:** `whatIf` (question, slug, summary, rich-text story, optional image, and optional time-based ripple outcomes)

## Agent Session

<!-- Optional: add a public Codex session transcript after checking it for private information. -->
