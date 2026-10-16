# Process log

How Cue got here, round by round. Each round: what Roni asked for, what Claude changed,
and what went wrong on the way. Built with Claude Code, October 15 to 16, 2026.

## Round 1: research and the bet
**Roni asked for:** how today's LXP works (flows and jobs to be done per persona),
who Kaltura is and what they do differently, what's missing, a view on the sales-teams
hunch, competitors big and new, and a few ideas for the task.
**Claude changed:** a short research brief. Kaltura is moving from video to "agentic"
avatars (eSelf, Agentic Avatars, avatar roleplay, PathFactory). The missing piece in the
market is the loop: gap, practice, real moment, result. The hunch holds as the hero story,
framed wider as "teams whose conversations make or lose money".

## Round 2: the flow, challenged
**Roni asked for:** a multi-persona flow from the manager's home to monthly results,
with A/B testing, and an honest critique.
**Claude changed:** kept the backbone, challenged the rest: "practice" instead of
"training", deadlines tied to real deals, no "problem reps", private rounds, enablement
owns templates, A/B testing moved to enablement as a "What works" card, early signals
before revenue. The loop became Spot, Build, Practice, Coach, Prove.

## Round 3: the name and the first screen
**Roni asked for:** a platform name (not sales only), one screen to judge the look,
Swiss minimal, color only from people photos and graphs, Figma-ready.
**Claude changed:** named it Cue. Picked 8 Unsplash portraits on bold backdrops and
sampled each person's color. Built the manager home inside the presentation stage, with
tokens named like Figma variables and `data-component` names on every block.
**Got wrong:** a first contact-sheet script failed on a sandboxed Python flag; a zsh loop
named files badly. Both fixed before anything shipped.

## Round 4: much more minimal
**Roni asked for:** fewer levels and words, no heavy black lines, no right column, one
screen with no scroll, pastel graphs with black numbers, more on hover.
**Claude changed:** three stats, three cards (one number and one line each, the evidence
on hover), team skills with people appearing on hover. Later: the number stays on hover
and slides up.

## Round 5: the presentation, snob level
**Roni asked for:** fewer alignments and columns, fewer lines, smaller and lighter titles.
**Claude changed:** one left axis, five type styles, no rules. Then a hero background:
three options (line, wave, blur); Roni chose the line with the team riding it, moved up,
with Instrument Sans and the aqua stage.

## Round 6: words first
**Claude changed:** every word for the 4 sections and 15 screens in `content.md`.
Roni approved without notes.

## Round 7: the sections and the manager's flow
**Claude changed:** Problem, Insight (Noa, Sam, Ira), Solution, Results; Back, Next,
Start over, Full screen; the nav follows the reader. Then screens 2 to 5: the insight,
building, the draft, the send sheet.

## Round 8: Sam's side
**Claude changed:** real-looking Slack and Gmail, before the call, the avatar call with
live captions, feedback with the round as a timeline, Sam's home.
**Got wrong:** Sam's home read like a completion screen. Rebuilt as a real home: the week
of calls (Acme marked Ready), suggestions, past practices with Noa's note on the one it's
about, and skills on the side with a quiet team average.

## Round 9: coach and prove
**Claude changed:** results by person, Omar's ready 1:1 plan, the real calls a week later,
October impact (practiced vs not yet, with confidence), and Ira's view across teams.
**Got wrong:** the impact chart rendered black because its styles were lost in an earlier
cleanup. Restored and made pastel.

## Round 10: the draft, three passes
**Roni asked for:** a richer buyer persona, visible configurability, weights in the
scorecard, an adjustable pass mark, and an AI input for quick changes.
**Claude changed:** a full persona, a split bar for weights, a pass slider, choice chips,
and Ask Cue. Roni pushed back twice (too crowded, too many lines, inconsistent padding),
so it ended as: the same white cards as the other pages, every persona part as one label
and value, score lines with visible steppers, a week timeline for who and when, and Ask
Cue as a small input that grows on click.
**Got wrong:** a class name clash put grey pills behind the timeline names. Renamed.

## Round 11: the scoring moment
**Roni asked for:** a beautiful "calculating your score" moment after the call.
**Got wrong twice:** first too strong ("a cyber check"), then a copy of the building
screen. **Final:** a calm dark moment that continues the call: one light number counting
to 84, a thin bar in the weight colors, one line at a time.

## Round 12: between the sections
**Claude changed:** four live options (thread, numbers, tint, rail). Roni chose the
thread: a pastel line in the margin that draws as you scroll, from soft red to green.

## Round 13: polish
**Claude changed:** removed the review toolbar and unused options and fonts, rewrote
placeholder messages in plain words, removed dead styles, added keyboard focus rings and
reduced-motion fallbacks, checked desktop, tablet and phone, wrote this log and the README.
