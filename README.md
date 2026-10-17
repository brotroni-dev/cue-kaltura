# Cue · a concept for Kaltura

**Learning built around real work.**

Cue is an outcome-driven learning platform. It finds the skill a team is missing in real
work, turns it into a short practice with a Kaltura AI avatar, and shows whether it moved
the numbers. It works for any role where conversations matter. Sales is the first story.

Live: https://brotroni-dev.github.io/cue-kaltura/ (after publishing)

A product design home assignment by Roni Brot, October 2026.

---

## The brief, in one line
Design the homepage and one core flow of a next-generation LXP that ties learning to real
business outcomes, plus a 4-slide presentation. Here the 4 slides are the 4 sections of
one page, and the clickable prototype lives inside the Solution section.

## The idea
Today's LXP counts views, not wins. Cue closes the loop that nobody owns today:

**Spot** the gap in real work → **Build** a practice (AI drafts, the manager approves) →
**Practice** with an avatar before the real call → **Coach** with one clear plan →
**Prove** it on real calls and in the numbers.

Three people, one loop:
- **Noa, sales team lead:** "Show me where my team loses, and help me fix it fast."
- **Sam, account executive:** "Help me nail Thursday's call without losing my week."
- **Ira, head of enablement:** "Show me which practice moves the numbers, so I can scale it."

## The prototype: 15 steps
1. Noa's home: three things worth Noa's time, team skills on hover
2. The insight: where deals are lost, why, who, deals at risk
3. Cue builds the practice
4. The draft: the buyer, the scorecard with weights, who and when, Ask Cue
5. Send in Slack and email
6. Sam gets it in Slack (or Gmail)
7. Before the call: who Sam will meet, how it's scored
8. The avatar call, then a calm scoring moment
9. Feedback: score, the round as a timeline, three moments to fix
10. Sam's home the next morning
11. Results: who needs what
12. Daniel and a ready 1:1 plan
13. A week later: the practice overview, and how the real calls went
14. Impact: the practice's Impact page, end of October
15. The Pricing template's Impact: Ira sees what works and updates the template

Use the stepper above the prototype, Back and Next under it, Full screen, or just click
the pulsing buttons inside the product.

## Design choices
- **Swiss and quiet.** One left axis, five type styles, white with black, almost no lines.
- **Color only from people and data.** Each person's color is sampled from their photo
  background; graphs are pastel; numbers stay black.
- **Little by default, more on hover.** Cards show one number and one line; the evidence
  and the people appear on hover.
- **Real tools.** Slack and Gmail look like the real apps, because that's where reps live.
- **Honest numbers.** Every result is compared with people who haven't practiced yet and
  labeled with how sure we are.

## Run it locally
No build step. From this folder:

```
python3 -m http.server 8766
```

Then open http://localhost:8766

## Ready for Figma
- All design tokens live in `css/tokens.css` and are named like Figma variables.
- Layouts use flex and gap, so they map to Figma auto layout.
- Every block carries a `data-component` name for its Figma component.
- `index.html?capture` shows the full product with no inner scroll, for capturing.

## In this repo
- `index.html` the page: four sections and the prototype stage
- `css/tokens.css` colors, type, spacing, radius, motion
- `css/shell.css` the presentation
- `css/app.css` the product (all classes start with `cue-`)
- `js/app.js` the 15 screens, one state list and one click router
- `js/charts.js`, `js/icons.js` small inline SVG charts and line icons
- `js/hero.js` the rising line in the hero
- `js/sections.js` the thread that ties the sections together
- `content.md` every word on the page and in the prototype
- `process-log.md` how the design got here, round by round
- `assets/people/` portraits from Unsplash, see `assets/CREDITS.md`

All names, companies and numbers are made up.
