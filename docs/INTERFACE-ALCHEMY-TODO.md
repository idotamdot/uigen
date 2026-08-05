# UIGen — Interface Alchemy Implementation TODO

Source of truth: **Brand direction: UIGen — Interface Alchemy**.

Product thesis:

> Not “AI that makes components.” A living creative engine where intent becomes interface.

Brand line:

> Describe the feeling. Generate the interface.

Alternate campaign line:

> Thought, rendered.

## Status legend

- [ ] Not started
- [~] Partial / foundation exists but does not yet satisfy the brand direction
- [x] Implemented and verified

## Phase 0 — Product foundation

- [x] Neon Postgres persistence
- [x] Neon Auth magic-link flow
- [x] Application session cookie
- [x] Anonymous work restoration after sign-in
- [x] Project ownership resolution by stable user identity
- [x] Typecheck, lint, test, and production build passing
- [~] Production auth smoke test after deployment
- [~] First-load bundle optimization for `/` and `/[projectId]`

## Phase 1 — Chromatic Void design system

Goal: establish the visual foundation before redesigning individual screens.

- [ ] Add canonical color tokens:
  - `--void-950: #050507`
  - `--void-900: #09090d`
  - `--void-800: #101018`
  - `--plasma-violet: #8b5cf6`
  - `--electric-orchid: #d946ef`
  - `--signal-cyan: #22d3ee`
  - `--solar-coral: #ff5f6d`
  - `--acid-lime: #c7ff4a`
  - `--hot-white: #f8f7ff`
  - `--glass-fill: rgba(255,255,255,0.055)`
  - `--glass-border: rgba(255,255,255,0.14)`
  - `--glass-highlight: rgba(255,255,255,0.28)`
- [ ] Enforce semantic state colors:
  - violet = generative intelligence
  - cyan = valid / connected / ready
  - coral = transformation / revision
  - lime = successful build
  - white = active human control
  - red = actual failure only
- [ ] Build reusable obsidian-glass surfaces
- [ ] Add atmospheric grain
- [ ] Add slowly shifting spatial background gradients
- [ ] Replace ordinary drop shadows with luminous depth
- [ ] Add reduced-motion-safe behavior
- [ ] Add motion tokens:
  - `--motion-instant: 90ms`
  - `--motion-fast: 160ms`
  - `--motion-standard: 260ms`
  - `--motion-expressive: 480ms`

### Acceptance criteria

- [ ] No major workspace surface uses generic gray IDE styling
- [ ] Accent color communicates state consistently
- [ ] Motion feels responsive, weighted, continuous, and intentional
- [ ] Reduced-motion users receive a complete non-animated experience

## Phase 2 — Signature living edge

Goal: create the unmistakable UIGen visual token.

- [ ] Create a reusable `LivingEdge` primitive
- [ ] Apply it to cards
- [ ] Apply it to panels
- [ ] Apply it to selected files
- [ ] Apply it to primary buttons
- [ ] Apply it to preview frames
- [ ] Make the spectral motion extremely slow and refined
- [ ] Avoid rainbow effects or constant visual noise
- [ ] Pause or simplify motion for reduced-motion preferences

### Acceptance criteria

- [ ] The living edge is recognizable across the product
- [ ] It never obstructs text, code, or preview content
- [ ] It is subtle when idle and more visible during active system work

## Phase 3 — Logo, wordmark, and verbal identity

- [ ] Design the geometric U from opposing interface brackets
- [ ] Give one half a human/fluid character
- [ ] Give one half a machine-perfect character
- [ ] Join the halves with a luminous generative spark
- [ ] Create static light and dark variants
- [ ] Create favicon/app-icon variants
- [ ] Animate the mark during generation:
  1. halves separate
  2. interface fragments appear
  3. glyph recomposes
  4. completed UI enters preview
- [ ] Build the UIGen wordmark
- [ ] Give the `i` a glowing node
- [ ] Use “Describe the feeling. Generate the interface.” in primary product branding
- [ ] Use “Thought, rendered.” only as a campaign/secondary line
- [ ] Replace generic product copy with confident collaborator language

### Voice replacements

- [ ] “Your generation has completed successfully.” → “The interface is ready.”
- [ ] “An error occurred.” → specific, reassuring diagnosis
- [ ] “Would you like to make changes?” → “What should evolve next?”

## Phase 4 — Landing page

Goal: demonstrate the product immediately rather than merely describing it.

- [ ] Full-viewport Chromatic Void hero
- [ ] Oversized headline typography
- [ ] Primary prompt: “Describe something impossible.”
- [ ] Primary action: “Create something”
- [ ] Secondary action: “Explore generations”
- [ ] Remove generic “Get Started” language
- [ ] Add drifting generated examples:
  - biotech dashboard
  - occult editorial archive
  - luxury architecture portfolio
  - playful learning app
  - cinematic booking interface
- [ ] Shift the atmosphere when hovering prompt examples
- [ ] Add live transformation demonstration
- [ ] Show one prompt rendered in multiple visual directions
- [ ] Add Component DNA section:
  - structure
  - tokens
  - states
  - responsiveness
  - motion
  - accessibility
  - code
- [ ] Include the message: “Beautiful is not enough. It has to survive production.”
- [ ] Preserve a direct path into anonymous creation
- [ ] Preserve magic-link sign-in and work restoration

### Acceptance criteria

- [ ] A visitor understands UIGen within one viewport
- [ ] The page demonstrates atmosphere-sensitive generation
- [ ] The page does not resemble a generic AI SaaS landing page

## Phase 5 — Generative Cockpit shell

Goal: transform the current three-panel workspace without sacrificing usability.

- [ ] Rename and redesign the left panel as **The Matter Panel**
- [ ] Rename and redesign the center as **The Stage**
- [ ] Rename and redesign the right panel as **The Conductor**
- [ ] Keep familiar tooltips and accessible labels for clarity
- [ ] Avoid turning the workspace into an IDE clone
- [ ] Preserve keyboard navigation
- [ ] Preserve resize behavior
- [ ] Preserve mobile and narrow-screen usability

## Phase 6 — The Matter Panel

- [ ] Represent pages
- [ ] Represent components
- [ ] Represent assets
- [ ] Represent tokens
- [ ] Represent dependencies
- [ ] Represent versions
- [ ] Represent design DNA
- [ ] Add object-specific visual signatures:
  - page = framed rectangle
  - component = connected nodes
  - token = glowing droplet
  - asset = image aperture
  - dependency = hexagonal module
- [ ] Pulse edited items briefly
- [ ] Emit a thin visual relationship line from edited item to preview
- [ ] Make all animations correspond to real file activity
- [ ] Preserve code-tree operations and tests

## Phase 7 — The Stage

- [ ] Remove heavy browser chrome
- [ ] Make generated interfaces float on a spatial canvas
- [ ] Add dissolving device frames
- [ ] Add magnetic-feeling resize handles
- [ ] Add smooth breakpoint transitions
- [ ] Project active viewport dimensions below the canvas
- [ ] Add Stage modes:
  - Live
  - Structure
  - Responsive
  - Motion
  - Accessibility
  - Diff
- [ ] Structure mode shows component anatomy as luminous bounds
- [ ] Diff mode ghosts the previous interface behind the new version
- [ ] Motion mode reveals active transitions without slowing normal work
- [ ] Accessibility mode surfaces meaningful findings and fixes

## Phase 8 — The Conductor

- [ ] Replace generic chat framing with “What are we creating?”
- [ ] Make the prompt expand naturally with content
- [ ] Detect atmosphere language and display intent tokens
- [ ] Interpret prompts into editable structured dimensions:
  - purpose
  - audience
  - visual mood
  - interaction energy
  - density
  - accessibility constraints
  - technical structure
- [ ] Let users adjust dimensions without rewriting the prompt
- [ ] Keep all inferred fields transparent and reversible
- [ ] Preserve chat history and streaming behavior

## Phase 9 — Synthesis Mode

Goal: make generation memorable while showing real work only.

- [ ] Replace generic spinner behavior
- [ ] Collapse prompt into a glowing seed on the Stage
- [ ] Show semantic concepts orbiting the seed
- [ ] Let components emerge as wireframes
- [ ] Apply color and typography next
- [ ] Lock layout into place
- [ ] Propagate interaction signals
- [ ] Resolve final UI into full fidelity
- [ ] Map visible stages to real pipeline state:
  - Interpreting product intent
  - Building visual language
  - Composing page structure
  - Generating reusable components
  - Validating responsive behavior
  - Running interface checks
- [ ] Accelerate naturally for fast generations
- [ ] Never add fake delay or fake progress
- [ ] Provide precise recovery messaging when generation fails

## Phase 10 — Intent Capsules

- [ ] Transform each submitted prompt into a compact Intent Capsule
- [ ] Attach the capsule to the generated version
- [ ] Reopen the original design intent from the capsule
- [ ] Store structured intent with the version
- [ ] Make intent history explainable and auditable
- [ ] Preserve prior intent when revisions branch

## Phase 11 — Direct visual revision

- [ ] Allow selecting an element inside the preview
- [ ] Show a soft selection halo
- [ ] Add scoped actions:
  - Restyle
  - Rewrite
  - Reposition
  - Extract component
  - Make responsive
  - Animate
  - Replace
  - Explain
- [ ] Send selected-element context into generation safely
- [ ] Keep revisions scoped unless the user explicitly broadens them
- [ ] Show exactly what changed
- [ ] Provide undo/restore paths

## Phase 12 — Mood modulation

- [ ] Add **Energy** control:
  - Quiet
  - Balanced
  - Electric
- [ ] Add **Character** control:
  - Familiar
  - Distinctive
  - Experimental
- [ ] Feed controls into structured generation inputs
- [ ] Persist values with versions
- [ ] Ensure controls affect output rather than merely recoloring the UI

## Phase 13 — Version constellations

- [ ] Replace flat version history with a branching constellation
- [ ] Main revisions form the central path
- [ ] Experiments branch outward
- [ ] Successful versions glow more brightly
- [ ] Allow branch naming
- [ ] Compare any two nodes
- [ ] Restore any node
- [ ] Preserve project safety and auditability
- [ ] Keep a list/table fallback for accessibility

## Phase 14 — Magnetic command palette

- [ ] Open with `/` when focus context permits
- [ ] Make the command surface spatial but keyboard-first
- [ ] Add commands:
  - Generate section
  - Change visual direction
  - Audit accessibility
  - Extract component
  - Create mobile variant
  - Explain this code
  - Repair preview
  - Export project
- [ ] Add command search
- [ ] Add contextual command ranking
- [ ] Ensure commands expose shortcuts and consequences clearly

## Phase 15 — Four product modes

- [ ] Add **Imagine** — prompt and visual direction
- [ ] Add **Shape** — direct manipulation, style, layout, refinement
- [ ] Add **Inspect** — code, structure, dependencies, responsive and accessibility review
- [ ] Add **Release** — export, copy, documentation, validation, deployment readiness
- [ ] Make the current mode unmistakable
- [ ] Preserve direct access to familiar tools
- [ ] Avoid obscuring functionality behind branded vocabulary

## Phase 16 — Typography

- [ ] Choose a dramatic geometric/grotesk display face
- [ ] Choose a highly legible neutral interface face
- [ ] Choose a rounded mono face for code and system output
- [ ] Avoid harsh terminal styling
- [ ] Integrate code typography into the brand
- [ ] Use oversized landing typography without harming responsiveness
- [ ] Do not distribute font files in the repository unless licensing permits

## Phase 17 — Sound

- [ ] Off by default
- [ ] Add a soft tonal pulse when generation begins
- [ ] Add delicate stage-completion ticks
- [ ] Add a deep resolving tone when the build succeeds
- [ ] Avoid arcade effects
- [ ] Avoid constant ambient sound
- [ ] Add a clear mute/control setting
- [ ] Respect reduced-motion and accessibility preferences where relevant

## Phase 18 — Non-negotiable UX safeguards

At every moment the user must know:

- [ ] What the system is doing
- [ ] What changed
- [ ] What they can do next

Additional safeguards:

- [ ] No fake progress theater
- [ ] No cinematic effect may block productive work
- [ ] No branded term may hide a familiar function
- [ ] Failures explain what broke and confirm whether files are safe
- [ ] All major actions have keyboard-accessible equivalents
- [ ] All advanced visualizations have readable fallback views
- [ ] Mobile users can still create, inspect, and recover work

## Recommended implementation order

1. [ ] Phase 1 — Chromatic Void tokens and primitives
2. [ ] Phase 2 — Living edge
3. [ ] Phase 3 — Logo, wordmark, and product voice
4. [ ] Phase 4 — Landing page
5. [ ] Phase 5 — Generative Cockpit shell
6. [ ] Phase 6 — Matter Panel
7. [ ] Phase 7 — Stage
8. [ ] Phase 8 — Conductor
9. [ ] Phase 9 — Synthesis Mode
10. [ ] Phase 10 — Intent Capsules
11. [ ] Phase 12 — Mood modulation
12. [ ] Phase 14 — Command palette
13. [ ] Phase 11 — Direct visual revision
14. [ ] Phase 13 — Version constellations
15. [ ] Phase 15 — Four product modes
16. [ ] Phases 16–18 — typography, sound, and final UX safeguards

## Definition of done

UIGen is not considered fully aligned with Interface Alchemy until:

- [ ] The landing page demonstrates atmosphere-sensitive interface generation
- [ ] The workspace feels like a design instrument rather than an IDE clone
- [ ] The living edge is implemented as a consistent signature token
- [ ] Generation exposes real, meaningful pipeline state
- [ ] Intent persists with every version
- [ ] Users can see what changed and what to do next
- [ ] The product remains fast, accessible, testable, and production-safe
- [ ] The experience plausibly feels like Figma, a modular synthesizer, and a science-fiction design laboratory fused into one tool
