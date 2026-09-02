---
name: 오늘의 편지
description: Cool gray paper on a cooler desk — a morning brief you fill, then a letter on the same sheet.
colors:
  coral: "#b84434"
  coral-deep: "#a83c2e"
  desk: "#b4c0cc"
  paper: "#e6ecf1"
  ink: "#17233c"
  ink-soft: "#31425a"
  hairline: "color-mix(in srgb, #17233c 16%, transparent)"
  clip-metal: "#8b97a6"
  clip-metal-deep: "#6d7888"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  letter:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.54
    letterSpacing: "normal"
rounded:
  none: "0px"
  clip: "3px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "28px"
  lg: "40px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "52px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.coral-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "52px"
  button-primary-disabled:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "52px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0"
    height: "44px"
  input-underline-focus:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
  link-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0"
  sheet-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "56px 24px 40px"
---

# Design System: 오늘의 편지

## Overview

**Creative North Star: "The Dawn Clipboard"**

The surface is a photocopied morning brief clipped to a metal clip, sitting on a cooler desk. The visitor fills two underline fields on cool gray paper, then reads today's letter on the same sheet. Depth is physical: grain on the desk, one paper plane, one clip. The type is Pretendard only — a Korean morning face, not a night-sky serif.

Personality is quiet, cool, and clerical. Density is a single sheet, not a dashboard. The only warm mark is a sunrise-coral stamp for the primary action; navy ink does the rest. Confirmed visual rejections: night-sky zodiac templates, cream-and-serif defaults, purple glow, and star-wheel chrome.

**Key Characteristics:**
- Cool gray paper on a cooler blue-gray desk, sheet offset left on large screens
- Navy ink hairlines; one coral stamp (plus coral for focus and error)
- Pretendard Variable only; semibold headlines, regular body
- Sharp sheet and stamp; underline fields, not boxes
- Form and letter share one clipboard frame; width is the only layout change

## Colors

A cool, desaturated paper world with one warm stamp. Neutrals carry almost every pixel; coral is the only chromatic accent.

### Primary
- **Sunrise Coral**: The stamp. Full-bleed primary button, focus outline, invalid-field copy, and a faint dawn wash on the desk. Hover darkens to **Pressed Coral**. Disabled stamp drops to **Soft Navy**, not a faded coral.

### Neutral
- **Cooler Desk**: Full-viewport ground. Cooler and slightly bluer than the sheet so the paper reads as an object.
- **Cool Gray Paper**: The sheet fill. Every form and letter lives on this plane.
- **Navy Ink**: Primary text and resting underline. The clerical voice of the sheet.
- **Soft Navy**: Secondary text (date, help, dek) and the disabled stamp fill.
- **Navy Hairline**: Sheet border, header rule, and advice divider. Ink at 16% — a photocopier edge, not a UI stroke.
- **Clip Metal / Clip Metal Deep**: The clipboard hardware gradient only. Not used on paper chrome.

### Named Rules
**The One Stamp Rule.** Coral is the only chromatic accent. It marks the stamp, focus, error, and a dawn wash on the desk. It does not color headlines, letter body, or sheet chrome.

**The Cool Paper Rule.** Backgrounds stay in the desk–paper pair. Do not introduce cream, white, or night-sky fills.

## Typography

**Display Font:** Pretendard Variable (with Pretendard, sans-serif)
**Body Font:** Pretendard Variable (with Pretendard, sans-serif)
**Label/Mono Font:** Same family; labels are 13px medium, not a second face

**Character:** One Korean/Latin variable grotesque. Tight tracking on titles, open leading on the letter. No serif, no display face, no uppercase lockup.

### Hierarchy
- **Display** (semibold / 600, 2rem stepping to 2.35rem at `sm`, line-height 1.2, tracking -0.025em): Home headline only, capped at 12ch.
- **Headline** (semibold / 600, 1.75rem stepping to 2rem at `sm`, line-height 1.25, tracking -0.025em): Letter greeting and error title, capped at 18ch.
- **Title** (semibold / 600, 15px, tracking -0.025em): Sheet masthead “오늘의 편지”. Quiet links use 15px medium of the same size.
- **Body** (regular / 400, 16px, line-height 1.75): Dek, help, advice line, stamp label. Dek capped at 36ch; advice at 65ch.
- **Letter** (regular / 400, 17px, line-height 1.75, 20px paragraph gap): Letter paragraphs only, max 65ch.
- **Label** (medium / 500, 13px, line-height ~1.54): Field labels, date, help, errors. Errors inherit label size in coral.

### Named Rules
**The One Face Rule.** Pretendard Variable is the only type family. Do not pair a serif for the letter or a mono for the date.

**The Tight Title Rule.** Headlines and the masthead use semibold and tight tracking. Body and letter stay regular with open leading. Do not bold the letter paragraphs.

## Layout

The desk is the viewport. The sheet is a single column, left-biased on large screens (`lg:ml-[8vw]`), centered below that. Horizontal page padding is 16px, then 32px at `sm`; vertical padding is 40px, then 56px at `sm`.

Two sheet widths, same anatomy: form sheet at 28rem, letter sheet at 40rem. Internal padding is 24×40×56 (inline / bottom / top), stepping to 36×48×64 at `sm`. The masthead is a baseline-aligned pair — product name left, Seoul date right (`ko-KR` long weekday) — with 40px below the hairline.

Form rhythm: 28px between fields, 8px inside a field (label, underline, help). The stamp sits directly under the fields. Letter rhythm: 16px under the greeting to the date, 32px into the body, 40px to the advice rule, 48px to the return link.

### Named Rules
**The Same Sheet Rule.** `/` and `/fortune` share one clipboard frame. Change width and contents; do not invent a second surface.

## Elevation & Depth

Depth is a physical stack, not a card hierarchy. The desk is a cool fill plus a multiply grain overlay (opacity 0.22; hidden when `prefers-reduced-transparency: reduce`) and a radial coral dawn at the top-right (coral at 18%, fading by 58%). The sheet is one paper plane with a 1px hairline and a single ambient drop. The clip sits above the sheet and casts a tighter shadow. No stacked cards, no blur, no glow on type.

Letter entry moves 14px up and fades in over 0.45s (`cubic-bezier(0.16, 1, 0.3, 1)`); reduced motion skips the travel. Loading is letter-shaped ink washes that pulse — the same sheet, not a spinner.

### Shadow Vocabulary
- **Sheet rest** (`box-shadow: 0 18px 40px color-mix(in srgb, #17233c 12%, transparent)`): The paper on the desk.
- **Clip rest** (`box-shadow: 0 8px 16px color-mix(in srgb, #17233c 22%, transparent)`): The metal clip only.

### Named Rules
**The One Plane Rule.** One sheet, one clip, one desk. Do not stack additional elevated cards on the paper.

## Shapes

The sheet and the stamp are sharp (0 radius). The only radii in the world belong to the clipboard hardware: a 3px clip body and a 10px round rivet. Fields have no box — they are a full ink underline that turns coral on focus. Hairlines are 1px. The stamp is a rectangle 52px tall, full width on the form; the error retry may shrink to hug 32px horizontal padding from `sm` up.

### Named Rules
**The Sharp Sheet Rule.** Paper and stamp stay square. Radius is hardware, not UI.

**The Underline Field Rule.** Inputs are transparent with a bottom ink rule. No filled wells, no 1px boxes.

## Components

### Buttons
- **Shape:** Sharp rectangle (0 radius), 52px tall.
- **Primary (stamp):** Coral fill, paper type, 16px semibold. Full width on the form. Hover to pressed coral. Active scales to 0.98. Focus-visible is a 2px coral outline, 4px offset.
- **Disabled:** Soft navy fill, paper type, not-allowed cursor. Do not ghost the coral.
- **Error retry:** Same stamp; from `sm` it may be `auto` width with 32px horizontal padding.

### Cards / Containers
- **Corner Style:** Sharp (0).
- **Background:** Cool gray paper.
- **Shadow Strategy:** Sheet rest shadow only; see Elevation.
- **Border:** 1px navy hairline.
- **Internal Padding:** 24px inline / 56px top / 40px bottom, larger at `sm`.
- **Masthead:** 15px semibold name, 13px soft-navy date, hairline under, 40px to content.

### Inputs / Fields
- **Style:** Transparent, 44px tall, 16px ink type, 1px bottom ink rule, no side or top stroke.
- **Focus:** Bottom rule turns coral. No fill change, no glow.
- **Help:** 13px soft navy under the rule.
- **Error:** 13px coral under the help. `aria-invalid` does not restyle the rule beyond focus.

### Navigation
- **Return link:** 15px medium ink, hairline underline at 4px offset. Hover turns the type coral. Focus-visible matches the stamp outline. Sits 48px below letter content. Text is the affordance; do not add a second chrome bar.

### Clipboard Clip
Metal tab 38×52px, centered on the sheet’s top edge, overlapping upward by 18px. Vertical gradient from clip metal to clip metal deep, 3px corners, 10px rivet mixed from ink at 28% into clip metal. Appears on every sheet.

### Letter Skeleton
Same column as the letter: pulsing ink washes at 8–10% on paper (heading bar, date stub, two paragraph blocks, advice stub). No spinner, no coral.

## Do's and Don'ts

### Do:
- **Do** keep form and letter on the same clipboard sheet; switch only width (28rem / 40rem).
- **Do** put the coral stamp under the underline fields, full width, 52px tall.
- **Do** set copy in Korean, in Pretendard, with navy ink on cool gray paper.
- **Do** divide the advice line with a hairline, not a card or a chip.
- **Do** show loading as letter-shaped skeleton bars on the sheet.

### Don't:
- **Don't** introduce a night-sky, cream, or serif world — no gold stars, purple glow, or zodiac wheel.
- **Don't** box the inputs or round the sheet and stamp.
- **Don't** use coral on headlines, masthead, or letter body.
- **Don't** add a marketing landing in front of the form, or a second elevated card on the paper.
- **Don't** show star signs, share chrome, or login on these surfaces.
