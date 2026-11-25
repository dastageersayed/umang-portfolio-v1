---
name: Umang Sharma Portfolio
description: A QA engineer's portfolio set as an entomology collection drawer, with a 3D bug pinned as the specimen.
colors:
  foam: "#e8edea"
  plate: "#f4f7f5"
  ink: "#14202b"
  muted: "#46545f"
  rule: "#c3ccc7"
  pin: "#ff5b1f"
  pin-deep: "#b93a0a"
typography:
  display:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
  headline:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  pin: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.pin-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.plate}"
  specimen-tag:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  plate-card:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: Umang Sharma Portfolio

## Overview

**Creative North Star: "The Museum Drawer"**

A single page that behaves like a pinned-specimen drawer. The 3D bug is the specimen; everything else is foam board, hairline plate borders and small paper tags, receding so the bug is read first. The ground is a cool grey-green foam, not cream; type is near-black ink-navy; one safety orange acts as the pin head and as the single drenched contact section.

Density is calm and archival: generous section padding, flat surfaces, square corners, ink rules instead of shadows. Copy borrows bug-report vocabulary for its labels (Severity, Status, Steps to reproduce, Expected behaviour, Actual result), which is the page's one joke, kept in the small mono tags and never in headings.

**Key Characteristics:**
- Cool foam ground with ink-navy type and one orange signal.
- Chunky low-contrast serif for headings, typed mono only for labels.
- Square corners, 1px ink or rule borders, no shadows.
- Orange appears as pin dots, selection, list markers, a dashed placeholder and the full-bleed contact section.

## Colors

A cool, near-monochrome drawer with one hot pin.

### Primary
- **Safety Pin Orange** (#ff5b1f): pin dots on specimen tags, text selection, and the full-bleed contact section background. Rare everywhere else.
- **Burnt Pin Orange** (#b93a0a): the readable orange for text and small marks: primary button hover, list markers, focus ring, dashed placeholder text and border.

### Neutral
- **Foam Board** (#e8edea): page ground, sticky header (90% alpha), scrollbar track.
- **Plate White** (#f4f7f5): raised plates: the specimen frame, tags, screenshot frames, About cards, secondary-button hover.
- **Ink Navy** (#14202b): all primary text, primary button, strong 1px borders and section-head underline.
- **Label Slate** (#46545f): secondary copy, mono labels, footer.
- **Plate Rule** (#c3ccc7): quiet hairlines: header bottom, experience row dividers, tool chips, scrollbar thumb.

### Named Rules
**The One Pin Rule.** Orange is the pin and nothing else. Fill orange only for dots, selection and the contact section; use Burnt Pin Orange whenever orange must carry text.

**The Foam Not Cream Rule.** The ground stays cool grey-green. Warm paper tones are off-world.

## Typography

**Display Font:** Young Serif (with Georgia, serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif), weights 400/500/700
**Label/Mono Font:** Martian Mono (with ui-monospace, monospace)

**Character:** A heavy, friendly serif sets the headings and the large facts; a neutral grotesque carries reading; a typewriter mono acts as the specimen-label hand.

### Hierarchy
- **Display** (400, clamp(3rem, 8vw, 6rem), 0.95): hero name only.
- **Headline** (400, 2.25rem / 3rem from sm, 1.0): section titles; the contact heading steps up to 3rem / 4.5rem.
- **Title** (400, 1.875rem, 1.25): case-file titles; role titles use 1.5rem, About card values 1.25rem.
- **Body** (400, 1rem, 1.5; hero lead 1.125-1.25rem; About paragraph 1.125rem at 1.625): prose capped at 60-68ch; secondary prose in Label Slate.
- **Label** (Martian Mono 400, 0.7rem, 0.08em, uppercase): tags, section-head captions, case IDs, dates, phone number. Tool chips and the placeholder note use the same face in normal case with no tracking.

### Named Rules
**The Label Hand Rule.** Mono is for things that would be typed on a specimen label: IDs, severity, status, dates, tool names. It never sets headings or paragraphs.

## Layout

One centred column, max-width 72rem (max-w-6xl), 16px gutters rising to 32px from sm. Sections pad 80px vertical, 112px from sm. Hero is a full-viewport plate: two columns (1fr / 1.5fr) from lg with the specimen frame on the right; on mobile the frame stacks on top at 55svh with a 20rem floor and text below. Case files alternate image/text sides in a two-column grid from lg with 80px between files. Approach is five columns from lg, two from sm. Experience rows are a 13rem date column plus content from md. Sticky header with a rule underline; section anchors use 4.5rem scroll padding. Content is visible by default; scroll reveals (18px rise) apply only where view timelines and motion are allowed.

## Elevation & Depth

Flat. No shadows exist in the build. Depth is tonal and linear: Plate White sits on Foam Board and is outlined with a 1px ink border; hairline Plate Rule divides lists. The only transient depth is the header's 2px backdrop blur.

### Named Rules
**The No-Shadow Rule.** Separate with a 1px border or a tonal step, never a shadow.

## Shapes

Square. Every plate, tag, button, chip and image frame has 0 radius and a 1px border. The only curves are the pin dot (full circle, ringed in ink), the thin scrollbar thumb, and a fallback "Load the 3D bug" pill on touch devices. A diagonal 135deg hatch fills placeholder screenshot frames.

## Components

### Buttons
- **Shape:** square (0px).
- **Primary:** Ink Navy fill, Plate White text, 12px 20px, 0.875rem medium; hover turns Burnt Pin Orange.
- **Secondary:** transparent with 1px ink border, same size; hover fills Plate White.
- **Focus:** 2px Burnt Pin Orange outline, 3px offset (ink on the orange section).

### Specimen Tag
Small plate-white label, 1px ink border, mono label type, leading orange pin dot (8px, ink ring). Absolutely placed on corners of the specimen frame, entering with a short rise-and-tilt (0.7s, staggered 0.2s).

### Plate Card
Plate White fill, 1px ink border, 20px padding. Used for About facts (a mono caption over a serif value) and screenshot frames (16:10).

### Navigation
Sticky foam header, 1px Plate Rule underline, name in display serif on sm+, text links with hover underline. On mobile the five links spread across the width.

### Specimen Frame (signature)
Plate White box with 1px ink border holding the transparent Sketchfab bug. The camera follows the cursor on desktop and responds to drag or arrow keys; a mono "Drag to inspect" caption sits bottom centre.

### Contact Drench
Full-bleed Safety Pin Orange section, ink text, large serif question, email in serif with 2px underline, plain underlined links below.

## Do's and Don'ts

### Do:
- **Do** keep the ground Foam Board (#e8edea) and raise content onto Plate White (#f4f7f5) with a 1px border.
- **Do** set headings in Young Serif at weight 400 and labels in Martian Mono at 0.7rem uppercase with 0.08em tracking.
- **Do** use Burnt Pin Orange (#b93a0a) for any orange text or small marks, and Safety Pin Orange only for dots, selection and the contact section.
- **Do** keep corners square and depth flat.
- **Do** keep content visible without motion; reveal only under `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** use warm cream or paper grounds, or a dark terminal theme.
- **Don't** build rounded card grids or add drop shadows.
- **Don't** set mono in body copy or headings.
- **Don't** fill orange behind small text outside the contact section.
