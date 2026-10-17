# Cue: content

Single source for the build. Edit anything here and the site follows.
Rules: plain words, short lines, numbers in black, no long dashes.
All names, companies and numbers are made up.

---

## Names

**Product:** Cue, by Kaltura. A practice platform for any role where conversations
matter. Sales is the first story.

**Noa's company:** Relay, sells shipping software to mid-size companies.

| Who | Role | Notes |
|---|---|---|
| Noa Levin | Sales team lead (the manager) | Main persona |
| Sam | Account executive | Rep persona, pricing group |
| Lucia | Account executive | Pricing group |
| Omar | Account executive | Pricing group, needs a 1:1 |
| Theo | Account executive | Pricing group |
| Dana | Account executive | Top performer, the example to learn from |
| Kofi, Hana | Account executives, new | First-call insight |
| Ira | Head of enablement | Third persona, sees all teams |
| Mark Ellis | CFO at Acme Logistics | The AI avatar Sam practices with (photo to pick) |

**Deals at the price step** (they set the practice deadlines):

| Deal | Owner | Size | Price call |
|---|---|---|---|
| Acme Logistics | Sam | $120K | Thu, Oct 23, 11:00 |
| Northline Foods | Lucia | $90K | Mon, Oct 20 |
| Pinecrest Supply | Omar | $60K | Fri, Oct 24 |
| Brightline Retail | Theo | $70K | Tue, Oct 21 |

**The practice:** "Hold your price", 8 minutes, built from enablement's Pricing
template and the team's lost calls.

**The scorecard (4 lines):**
1. Asks about the problem first
2. Puts a number on the value
3. Handles "too expensive" without a discount
4. Agrees on a next step

---

## The site: 4 sections

### Nav
Cue · Problem · Insight · Solution · Results

### Cover
Label: A concept for Kaltura · Roni Brot · October 2026
Title: Practice the moment.
Prove it in the numbers.
Lead: Cue finds the skill a team is missing in real work, turns it into a
10 minute practice with an AI avatar, and shows if it moved the numbers.
Background: the rising line with the team on it.

### 01 Problem
Title: Learning platforms count views, not wins.
Lead: Today's LXP is a library with a feed. People watch, mark it done, and go
back to work. Nobody can say if anything changed.

Three points:
- **Far from work.** Learning lives in another tab, not where the deal happens.
- **Watching is not doing.** There is no practice before the real moment.
- **No proof.** Reports show hours and completions, not results.

### 02 Insight
Title: The manager is the lever.
Lead: Frontline managers turn learning into results. They need to see the gap,
act in minutes, and know if it worked.

Who we design for: teams whose conversations make or lose money. Sales first,
then support, success and new managers.

Three people, one loop:
- **Noa, team lead.** "Show me where my team loses, and help me fix it fast."
- **Sam, account executive.** "Help me nail Thursday's call without losing my week."
- **Ira, head of enablement.** "Show me which practice moves the numbers, so I can
  scale it."

Why Kaltura: Kaltura already owns video and real-time AI avatars. Cue turns them
into a weekly habit tied to a business number.

### 03 Solution
Title: One loop, five moves.
Lead: A manager spots a gap, Cue builds a practice, the team rehearses with an
avatar, and everyone sees what changed.

The five moves (stepper above the prototype):
1. **Spot.** See the gap in real work.
2. **Build.** AI drafts, the manager approves.
3. **Practice.** An 8 minute call with an avatar.
4. **Coach.** One clear plan per person.
5. **Prove.** Did the numbers move?

Prototype caption: "Step N of 15" + the step's line (see each screen below).
Below the stage: Full screen · Start over

### 04 Results
Title: Measure what changes, not what's watched.
Lead: Cue checks behavior in weeks and revenue in quarters, and compares people
who practiced with people who haven't yet.

What we measure, by when:
- **Weeks:** behavior on real calls. Value before price, fewer discounts.
- **A month:** win rate at the hard step.
- **A quarter:** revenue per person, time to first deal for new people.

Guardrails:
- **People feel watched.** Practice rounds are private until you share one.
- **Scores feel unfair.** Anyone can flag a score.
- **Did practice cause it?** Every number is compared with people who haven't
  practiced yet, and labeled with how sure we are.

How it grows: the same loop works for support (an angry customer), customer
success (a renewal talk), new managers (a hard feedback talk) and healthcare
(hard news).

What's next: live hints during practice, practice inside Zoom right before a
call, and templates that improve themselves from what works.

### Footer
Cue, a product design concept for Kaltura. Photos from Unsplash, names are made up.

---

## The prototype: 15 screens

Each screen lists: act, who, where, the caption line, then the copy.
Rule for every screen: little by default, detail on hover. The copy never tells people to hover.

### 1. Home (done)
Act: Spot · Who: Noa · Where: cue.app/home
Caption: Noa, a sales team lead, opens Cue on Thursday morning.
Copy: as built. "Good morning, Noa", three stats, "Worth your time" (3 cards),
"Team skills" (5 rows).
Next: click "Why" on the first card.

### 2. The insight
Act: Spot · Who: Noa · Where: cue.app/insights/pricing
Caption: Noa opens the insight to see why deals are lost.
Back: Home
Title: 4 people lose deals when price comes up
Number: $420K at risk · 9 open deals at the price step

**Where deals are lost** (bars per step, these 4 vs the rest of the team):
First call · Demo · Price · Signed
Lost at the price step: 58% vs 27%

**Why**
In 9 of 12 lost calls, price came up before the buyer saw the value.
Three call moments (hover to read, click to play):
- Sam · Acme Logistics · 4:12 · "We can do 15% off if you sign this month."
- Lucia · Northline Foods · 2:40 · Offered a discount before the buyer asked.
- Theo · Brightline Retail · 1:55 · Gave the price in the first two minutes.

**What Dana does**
Dana shows what doing nothing costs before saying a price.
Clip: Dana · 40 sec · Play

**Who** (hover a person for their numbers)
Sam 62% · Lucia 55% · Omar 57% · Theo 60% (lost at the price step)

**Deals at risk**
Acme Logistics · $120K · Sam · price call Thu
Northline Foods · $90K · Lucia · price call Mon
Brightline Retail · $70K · Theo · price call Tue
+ 6 more

Buttons: **Build practice** · Plan 1:1s

### 3. Building
Act: Build · Who: Cue · Where: cue.app/practice/new
Caption: Cue drafts a practice from enablement's template and the lost calls.
Title: Building your practice
Checklist (ticks in about 3 seconds):
- Reading 12 lost calls
- Using the Pricing template from enablement
- Finding Dana's best moments
- Writing the buyer
Then the draft opens on its own.

### 4. The draft
Act: Build · Who: Noa · Where: cue.app/practice/hold-your-price
Caption: Noa checks the draft and edits anything.
Rule: soft panels, no lines. Every value shows a pencil on hover; choices open a list.
Title: Hold your price · pill "Draft by Cue" (hover: built from enablement's Pricing
template and 12 of the team's lost calls)
Meta line:
- Template (dropdown, shows the draft comes from existing training): Pricing · By Ira,
  enablement · used by 5 teams. Also: Discovery questions, First calls that land,
  Start from scratch (Cue drafts from your team's lost calls only).
- Length (dropdown): 5 / 8 / 10 / 15 minutes
- Tracks (dropdown, the business number that proves it worked): Win rate at the price
  step (suggested by the insight) · Average discount · Deal size · Time to close
- Reference calls (dropdown panel; real call snippets reps watch before the practice):
  shows the kept calls' faces and "Dana's call" (or "2 calls"). Inside:
  In this practice (Reps watch these before the call): Dana · Kestrel Shipping · 0:40 ·
  Shows what doing nothing costs before the price · remove.
  Search: Find a call, like "late fees".
  Suggested (Won calls on price, across teams): Dana · Northwind Freight · 1:10 · Gets the
  COO into the next call · Model call · Pricing template · 2:30 · By Ira, enablement. From
  value to price to next step · Ben Ortiz · East team · 0:55 · Turns "too expensive" into a
  cost per year. Each with Add. Hover a face to play the snippet.

**The buyer** (left card, "What the AI avatar plays", hover: company and deal size match
each person's real deal). Two layers: controls for what the avatar is, and parts for who it
plays. The avatar sits alone on top; mood, voice and language are one row of dropdowns
under it.
- Avatar (dropdown with faces): **Mark Ellis** · Claire Novak · Elias Haddad · Grace Lin ·
  More avatars (from the Kaltura avatar library). Picking one also picks its voice.
- Mood (dropdown): Friendly (Open, needs a reason to pay more) · **Doubtful** (Busy, short
  answers) · Tough (Pushes hard, ready to walk away). Changes the Mood part.
- Voice (dropdown; in the menu each voice has its own small wave, the closed dropdown shows
  the name only): **Calm and low** (Slow, few words ·
  Made for Mark) · Warm and clear (Friendly, easy to follow) · Quick and direct (Fast, gets
  to the point) · Soft and steady (Quiet, even pace). Hover a voice in the menu and its wave
  turns into play: listen without picking it.
- Language (dropdown): English · Español · Deutsch · Français · עברית

Parts: each one is its own small block. Click to edit the name or the text, hover for the
pencil and a remove button, Add a part at the end:
Role. CFO of a 300-person logistics company.
Mood. Busy and doubtful. Short answers until you earn more.
Wants. Lower shipping costs, without a risky switch.
Knows. There's a cheaper quote. A past vendor let them down.
Decides with. The COO, who signs off on anything over $50K.
Shares only if asked. Two big clients left after late deliveries.
The objection. "Your price is 20% higher than the other quote." (9 of 12 lost calls)
Gives in when. You show what late fees really cost.

**Rep brief** (right card, "What each person reads before the call", hover: deal names and
dates match each person's own deal). Try it yourself in the header covers previewing. The
same parts as the buyer, Add a part at the end:
The situation. Second call. Mark has a 20% cheaper quote.
Your goal. Show what late fees cost before you talk price.
You know. Late fees cost them about $80K a year.
Rules. No discount above 5%. Hints are off.

**Scored on** (right card; weights add up to 100%; one split bar; − and + always visible;
hovering a line highlights its part of the bar; Pass at is a dropdown in the header, 80)
Asks about the problem first 20% · Puts a number on the value 30% ·
Handles "too expensive" without a discount 30% · Agrees on a next step 20%

Who and when moved to the Send sheet (screen 5): who gets it and by when is a sending decision.

**Ask Cue** (a small input at the bottom: "Ask Cue to change this practice". On click it
grows and shows: Try · Make Mark tougher (uses the chosen avatar's name) · Weigh the value line higher · Make it 5 minutes.)
What changes flashes for a moment.

Buttons: Try it yourself · **Send to 4 people**

### 5. Send
Act: Build · Who: Noa · Where: sheet over the draft
Caption: One message, in Slack and email, due before each real call.
Title: Send to 4 people
Channels: Slack ✓ · Email ✓
Message (drafted by Cue, editable):
"Hi {first name}, your {deal} price call is on {day}. Here's an 8 minute
practice with a tough CFO. Rounds are private, share your best one. Noa"
Who and when (note: Due before each person's price call. Change any date.)
One row per person: checkbox, face, name, their price call, and a Due dropdown.
- Sam Rivera · Acme price call · Thu 11:00 · Due Thu, Oct 23
- Lucia · Northline price call · Mon 10:00 · Due Mon, Oct 20
- Omar · Pinecrest price call · Fri 09:30 · Due Fri, Oct 24
- Theo · Brightline price call · Tue 14:00 · Due Tue, Oct 21
Due dropdown: the days from tomorrow up to the call; the call day says "Before the Acme
call · Suggested". People with no price call get "End of the week · Suggested".
Unchecked: the row fades and shows "Not included"; the title and the Send button count
update ("Send to 3 people"). Send turns off when no one is checked.
Add people (dropdown): Kofi (New on the team · price call Wed) · Hana (New on the team) ·
Dana (Top of the team on price). Added people get a row with their own due date.
Button: **Send**
Toast after: Sent. Results show up as people finish.

### 6. Slack (switch to Gmail)
Act: Practice · Who: Sam · Where: Slack, Relay workspace, Cue app DM
Caption: Sam gets the practice where Sam already works.
Switch: Slack · Gmail

**Slack**
Earlier message (Mon, Oct 13, 8:30): "Your week: 2 price calls coming up. Nothing to practice yet."
Sender: Cue (APP) · 9:14 AM
Header: Noa sent you a practice
Card:
Hold your price · 8 min
Before your Acme Logistics call, Thu 11:00
"Hi Sam, your Acme price call is on Thursday. Here's an 8 minute practice with
a tough CFO. Rounds are private, share your best one. Noa"
Buttons: **Start practice** · Remind me tomorrow
Footer: Only you see your rounds until you share one.

**Gmail**
From: Cue <practice@cue.app>
Subject: Before your Acme call: Hold your price (8 min)
Body: the same card. Button: Start practice

### 7. Before the call
Act: Practice · Who: Sam · Where: cue.app/practice/hold-your-price
Caption: Sam sees who the buyer is and how the call is scored.
Title: Hold your price
Under the title: Before your Acme call · Thu 11:00

**You'll meet**
Mark Ellis, CFO · Acme Logistics
Busy and doubtful. Has a quote that's 20% cheaper. Wants to know why you cost more.

**Your goal**
Show what late shipments cost before you talk price. End with a clear next step.

**You're scored on**
The 4 scorecard lines. Hover a line to hear what good sounds like.

**What good sounds like** (the first reference call Noa kept; hidden if she removed them all)
Reference call · Dana · 0:40 · Play

Note: Rounds are private. You choose which one Noa sees.
Buttons: **Start call** · Test mic

### 8. The call
Act: Practice · Who: Sam · Where: full-screen call
Caption: An 8 minute call with Mark, an AI avatar built on Kaltura.
Top: Mark Ellis · CFO, Acme Logistics · 03:12 / 08:00 · Round 2 · Private
Center: Mark's photo, a sound wave when Mark talks, a smaller wave when Sam talks.
Caption line: Mark: "Your price is 20% higher than the other quote. Why should I
pay more?"
Controls: Mute · Hints off · **End call**

**Scoring (after End call, same step, about 5 seconds, then the feedback opens)**
A calm dark moment that continues the call. Mark's picture melts into a soft blur behind.
Caption: Cue scores the round line by line and finds the moments to fix.
Small label: Scoring your round
One large, light number counts up to 84.
A thin split bar under it fills slice by slice in the four weight colors.
One line under the bar changes gently, one at a time:
Asks about the problem first 90 → Puts a number on the value 78 →
Handles "too expensive" without a discount 82 → Agrees on a next step 86 →
3 moments to replay

### 9. Feedback
Act: Practice · Who: Sam · Where: cue.app/practice/hold-your-price/round-2
Caption: Sam gets a score and three moments to fix, then shares the best round.
Big number: 84 · Passed
Rounds: Round 1: 71 · Round 2: 84

**Your round** (timeline of the 8 minutes, the three moments pinned on it,
hover a pin to read it, click to replay)

Scores (hover a line for what good looks like):
- Asks about the problem first · 90
- Puts a number on the value · 78
- Handles "too expensive" without a discount · 82
- Agrees on a next step · 86

Three moments (click to replay):
- **2:05** You asked what late shipments cost them. Great start.
- **4:40** You named a number: "$80K a year in late fees." Strong.
- **6:12** You almost offered a discount. Try: "Let's compare what each option
  costs you over a year."

Buttons: Try again · **Share this round with Noa**

### 10. Sam's home
Act: Practice · Who: Sam · Where: cue.app/home, the next morning (Fri, Oct 17)
Caption: The next morning: Sam's week, and Noa's note on the round.
Greeting: Hi Sam

**This week** (your calls, and if you're ready)
- Tue 21 · Harborview Health · Demo · $45K · 10:00 → Practice · 6 min (suggested)
- Thu 23 · Acme Logistics · Price call · $120K · 11:00 → Ready · 84
- Fri 24 · Fieldline Supply · First call · $30K · 14:30 → Nothing needed

**Suggested for you**
- Practice · 6 min · Handle "we'll think about it" · For your Harborview demo
- Clip · 40 sec · Dana's discovery call · Top call on the team this month
- Practice · 5 min · Bring more buyers in · Your lowest skill

**Done lately**
- Hold your price · Yesterday · shared with Noa · 84
  Noa · last night: "Nice round. Watch your 6:12 moment before Thursday." (replay 6:12)
- First calls that land · Sep 29 · 79
- Discovery questions · Sep 12 · 81

**My skills** (side column; You, and a quiet team average tick; hover for numbers)
Asking good questions 74 (+2) · Talking value before price 62 (+28) ·
Handling "too expensive" 58 (+28) · Setting a clear next step 78 · Bringing more people in 44

Note: the share confirmation lives on screen 9. "Share this round with Noa" turns into
"Shared with Noa" and "Go to my home".

### 11. Results
Act: Coach · Who: Noa · Where: cue.app/practice/hold-your-price/results
Caption: Back to Noa. Everyone is done, and Cue shows where each person stands.
Breadcrumb: Practice / Hold your price (this page sits under the list of practices, which
the walkthrough skips) · Action: Send another round
Title: Results
4 of 4 done · Average 76 · Pass at 80 · Up 12 from the first rounds
By person: a light table. Header: Person · Scorecard · Score · Status. Scorecard = 4 small bars, one per scorecard line,
in the same order as the draft; height is the score, green 80+, blue 70 to 79, red below 70. One row per person with
light gray lines between them (4 small bars for the 4 lines, best score, status: Ready /
Close / Needs a 1:1, and "Plan 1:1" on Omar). No hover hints in the copy; details still
show on hover.

Groups:
- **Ready:** Sam 84, Lucia 81
- **Close:** Theo 74
- **Needs a 1:1:** Omar 68

By scorecard line:
Asks about the problem first 82 · Puts a number on the value 66 ·
Handles "too expensive" 75 · Agrees on a next step 83

Button: **Plan 1:1 with Omar**

### 12. Omar
Act: Coach · Who: Noa · Where: cue.app/team/omar
Caption: Noa gets a ready plan for the 1:1 with Omar.
Header: Omar · Best round 68 · 3 rounds
Summary: Omar asks good questions, but brings up price in the first 3 minutes.
No number on the value yet.
Moments (pinned on the round timeline): 1:48 Price came up before the problem ·
5:20 Agreed to "think about it"
Side: Omar's scores vs team average, and the next real call (Pinecrest · Fri, Oct 24 · $60K)

**1:1 plan** (15 min)
1. Watch Dana's clip together (40 sec)
2. Practice one line: "What does a late shipment cost you?"
3. Next: one harder round with Mark before Pinecrest on Friday

Buttons: **Add to Thursday's 1:1** · Send a harder round

### 13. Real calls
Act: Prove · Who: Noa · Where: cue.app/home, one week later
Caption: A week later. Cue checks the real calls, not just the practice.
Title: How the real calls went
From call recordings, this week:
- **Sam · Acme Logistics.** Value before price ✓ · No discount ✓ · Next step ✓
  · Moved to contract
- **Lucia · Northline Foods.** Value before price ✓ · 5% discount (team: 18%)
- **Theo · Brightline Retail.** Price came up early ✕ · Next step ✓ · Follow-up Tue
- **Omar · Pinecrest Supply.** Not yet · Price call Fri, after the 1:1
Early signal: lost at the price step 58% → 41% for these 4
Button: See October impact

### 14. Monthly impact
Act: Prove · Who: Noa (also sent to Ira) · Where: cue.app/results/october
Caption: Once a month, Noa and enablement get the impact, with how sure we are.
Title: October impact
Three numbers (practiced vs not yet):
- Win rate at the price step · 41% vs 26%
- Average discount · 9% vs 17%
- Deals saved · $310K
Chart: practiced vs not yet, by week (the "It worked" style).
Confidence: Early signal. 4 people, 4 weeks. We check again at quarter end.
Buttons: Copy link · Share with Ira (then "See Ira's view")

### 15. Across teams
Act: Prove · Who: Ira · Where: cue.app/enablement
Caption: Ira, head of enablement, sees what works across teams and scales it.
Title: Pricing template · 6 teams
Lift per team (points): Noa Levin's team +15 · Mid-market West +12 · Enterprise +9 ·
Mid-market East +7 · EMEA +4 · Partners +2 (hover for before and after)

**What works** (Cue compares versions on its own):
- A doubtful buyer beats a friendly one · +9 pts more lift
- Two rounds beat one · +6 pts
- Practice within 2 days of the real call · +5 pts

Buttons: **Update the template** · Roll out to 3 more teams
End line: The loop closes. Every team gets a better practice.

---

## Open questions for Roni
1. 15 screens is a full story. If it feels long, screens 3, 5, 10 and 13 can fold
   into their neighbors, leaving 11.
2. Mark, the buyer: pick a photo (a CFO, on a solid color backdrop like the others).
3. Company names: Relay (Noa's company) and the four clients. Keep or change?
