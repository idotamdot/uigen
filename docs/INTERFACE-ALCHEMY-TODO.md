# UIGen — Interface Alchemy Implementation TODO

Source of truth: **Brand direction: UIGen — Interface Alchemy**.

Product thesis:

> Not “AI that makes components.” A living creative engine where intent becomes interface.

Primary brand line:

> Describe the feeling. Generate the interface.

Secondary campaign line:

> Thought, rendered.

## Status legend

- [ ] Not started
- [~] Partial, blocked, or implemented but not yet verified
- [x] Implemented and verified in code
- [!] Known blocker intentionally deferred

## Current execution state — August 4, 2026

### Production status

- [!] Vercel production is intentionally paused while UIGen is completed and tested on the laptop.
- [!] Neon Auth production callback blocker: the magic link returns to UIGen, but Neon does not set a session cookie. The callback exchange fails before UIGen can create or resolve the application user.
- [x] UIGen now reports the callback failure precisely instead of presenting a blank page.
- [ ] Resume production only after local completion, release validation, and a dedicated Neon Auth callback repair pass.

### Current focus

1. [x] Reconcile the roadmap with the implemented Chromatic Void foundation.
2. [ ] Finish The Stage.
3. [ ] Finish The Matter Panel.
4. [ ] Finish The Conductor.
5. [ ] Implement real Synthesis pipeline states.
6. [ ] Add Intent Capsules and mood modulation.
7. [ ] Complete Release mode and export validation.
8. [ ] Run full local release checks.
9. [ ] Return to the deferred production-auth blocker.

---

## Phase 0 — Product foundation

- [x] Neon Postgres persistence
- [~] Neon Auth magic-link implementation exists
- [!] Production magic-link callback does not establish the Neon session cookie
- [~] Application-user synchronization exists but cannot run until a Neon session is established
- [x] Anonymous work restoration flow exists
- [x] Project ownership resolves by stable normalized email identity
- [x] Server-side auth status diagnostics distinguish missing cookie from invalid session
- [x] Typecheck, tests, and production build passed before the latest visual-foundation update
- [ ] Re-run typecheck, tests, and build after each implementation batch
- [~] First-load bundle optimization for `/` and `/[projectId]`

### Deferred auth repair checklist

- [ ] Capture the Neon callback request and response in a clean Network trace
- [ ] Confirm whether the Neon callback endpoint emits `Set-Cookie`
- [ ] Compare the installed `@neondatabase/auth` version with the current documented callback flow
- [ ] Verify trusted origins and callback policy in the exact Neon project and branch
- [ ] Verify Vercel and local Auth base URLs target the same Neon branch
- [ ] Repair and verify session establishment before unpausing production

---

## Phase 1 — Chromatic Void design system

Goal: establish a coherent visual system before expanding individual branded surfaces.

- [x] Canonical color tokens:
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
- [~] Semantic state-color enforcement across every screen
- [x] Reusable obsidian-glass surface class
- [x] Atmospheric grain layer
- [x] Slowly shifting spatial background gradients
- [x] Luminous depth replaces ordinary generic shadows in the branded primitives
- [x] Reduced-motion-safe global behavior
- [x] Motion tokens:
  - `--motion-instant: 90ms`
  - `--motion-fast: 160ms`
  - `--motion-standard: 260ms`
  - `--motion-expressive: 480ms`

### Acceptance criteria

- [~] No major workspace surface uses generic gray IDE styling
- [~] Accent color communicates state consistently
- [x] Global motion has a reduced-motion fallback
- [~] Motion feels responsive, weighted, continuous, and intentional across the entire workspace

---

## Phase 2 — Signature living edge

- [~] CSS living-edge foundation exists as `.alchemy-edge`
- [ ] Promote it into a reusable typed `LivingEdge` component or primitive
- [ ] Apply consistently to cards
- [ ] Apply consistently to panels
- [ ] Apply to selected files
- [ ] Apply to primary actions
- [ ] Apply to preview frames
- [x] Slow the spectral orbit to a refined idle pace
- [~] Keep the effect controlled rather than noisy
- [x] Reduced-motion fallback exists

### Acceptance criteria

- [ ] The living edge is recognizable throughout the product
- [ ] It never obstructs text, code, or generated interfaces
- [ ] Idle state is subtle; active generation state is more visible

---

## Phase 3 — Logo, wordmark, and verbal identity

- [~] Branded wordmark treatment exists
- [ ] Design the final geometric U from opposing interface brackets
- [ ] Human/fluid half and machine-perfect half
- [ ] Luminous joining spark
- [ ] Static light and dark variants
- [ ] Favicon and app-icon variants
- [ ] Generation animation sequence
- [ ] Final UIGen wordmark with glowing `i` node
- [~] Use “Describe the feeling. Generate the interface.” consistently
- [ ] Reserve “Thought, rendered.” for secondary/campaign use
- [~] Replace generic system copy with collaborator language

Voice targets:

- [ ] “Your generation has completed successfully.” → “The interface is ready.”
- [x] Generic auth failure → specific diagnosis
- [ ] “Would you like to make changes?” → “What should evolve next?”

---

## Phase 4 — Landing page

- [~] Chromatic Void visual foundation exists
- [ ] Full-viewport demonstrative hero
- [ ] Oversized headline typography
- [ ] Prompt: “Describe something impossible.”
- [ ] Primary action: “Create something”
- [ ] Secondary action: “Explore generations”
- [ ] Remove generic “Get Started” language
- [ ] Drifting generated examples
- [ ] Atmosphere shift on example hover
- [ ] Live transformation demonstration
- [ ] One prompt rendered in multiple visual directions
- [ ] Component DNA section
- [ ] Message: “Beautiful is not enough. It has to survive production.”
- [x] Preserve direct anonymous creation path
- [~] Preserve magic-link sign-in and restoration; production verification blocked

---

## Phase 5 — Generative Cockpit shell

- [~] Three-panel workspace foundation exists
- [ ] Finalize left panel as **The Matter Panel**
- [ ] Finalize center as **The Stage**
- [ ] Finalize right panel as **The Conductor**
- [ ] Keep conventional tooltips and accessible labels
- [ ] Remove remaining generic IDE-clone presentation
- [ ] Preserve keyboard navigation
- [ ] Preserve panel resizing
- [ ] Preserve mobile and narrow-screen usability

---

## Phase 6 — The Matter Panel

- [ ] Distinguish pages
- [ ] Distinguish components
- [ ] Distinguish assets
- [ ] Distinguish tokens
- [ ] Distinguish dependencies
- [ ] Distinguish versions
- [ ] Distinguish design DNA
- [ ] Object signatures:
  - page = framed rectangle
  - component = connected nodes
  - token = glowing droplet
  - asset = image aperture
  - dependency = hexagonal module
- [ ] Brief real-activity pulse on edited items
- [ ] Real relationship signal from edited item to preview
- [ ] No decorative activity disconnected from file operations
- [ ] Preserve file-tree operations and tests

---

## Phase 7 — The Stage

**Next implementation target.**

- [ ] Remove remaining heavy browser chrome
- [ ] Float generated interfaces on a spatial canvas
- [ ] Add dissolving device frames
- [ ] Add magnetic-feeling resize handles
- [ ] Add smooth breakpoint transitions
- [ ] Show active viewport dimensions below the canvas
- [ ] Add modes:
  - Live
  - Structure
  - Responsive
  - Motion
  - Accessibility
  - Diff
- [ ] Structure mode displays component anatomy as luminous bounds
- [ ] Diff mode ghosts the prior interface behind the active version
- [ ] Motion mode reveals active transitions without slowing normal work
- [ ] Accessibility mode reports actionable findings and fixes

### Stage acceptance criteria

- [ ] Current dimensions are always legible
- [ ] Mode changes are keyboard accessible
- [ ] Every mode reflects real preview or analysis data
- [ ] Generated interfaces remain the visual priority

---

## Phase 8 — The Conductor

- [ ] Replace generic chat framing with “What are we creating?”
- [ ] Prompt expands naturally with content
- [ ] Detect atmosphere language and display intent tokens
- [ ] Interpret prompts into editable structured dimensions:
  - purpose
  - audience
  - visual mood
  - interaction energy
  - density
  - accessibility constraints
  - technical structure
- [ ] Users can revise inferred dimensions without rewriting the prompt
- [ ] Inference remains transparent and reversible
- [ ] Preserve history and streaming behavior

---

## Phase 9 — Synthesis Mode

- [ ] Replace generic spinner behavior
- [ ] Prompt collapses into a glowing seed on The Stage
- [ ] Semantic concepts orbit the seed only when backed by parsed intent
- [ ] Components emerge as wireframes
- [ ] Color and typography apply after structure
- [ ] Layout locks into place
- [ ] Interaction signals propagate
- [ ] Final interface resolves into full fidelity
- [ ] Map visuals to real pipeline states:
  - Interpreting product intent
  - Building visual language
  - Composing page structure
  - Generating reusable components
  - Validating responsive behavior
  - Running interface checks
- [ ] No artificial delay
- [ ] No fake progress
- [ ] Precise recovery state on failure

---

## Phase 10 — Intent Capsules

- [ ] Convert submitted prompts into compact Intent Capsules
- [ ] Attach each capsule to its generated version
- [ ] Reopen original intent from the capsule
- [ ] Store structured intent with version data
- [ ] Explain and audit intent history
- [ ] Preserve intent when revisions branch

---

## Phase 11 — Direct visual revision

- [ ] Select an element in the preview
- [ ] Soft selection halo
- [ ] Scoped actions:
  - Restyle
  - Rewrite
  - Reposition
  - Extract component
  - Make responsive
  - Animate
  - Replace
  - Explain
- [ ] Send scoped context safely
- [ ] Keep revisions scoped by default
- [ ] Show exactly what changed
- [ ] Undo and restore paths

---

## Phase 12 — Mood modulation

- [ ] **Energy:** Quiet / Balanced / Electric
- [ ] **Character:** Familiar / Distinctive / Experimental
- [ ] Feed settings into structured generation inputs
- [ ] Persist values with versions
- [ ] Controls change generated output, not merely the application chrome

---

## Phase 13 — Version constellations

- [ ] Branching visual version map
- [ ] Main revisions form the central path
- [ ] Experiments branch outward
- [ ] Successful versions glow more clearly
- [ ] Branch naming
- [ ] Compare any two nodes
- [ ] Restore any node
- [ ] Preserve project safety and auditability
- [ ] Accessible list/table fallback

---

## Phase 14 — Magnetic command palette

- [ ] Open with `/` when focus context permits
- [ ] Spatial presentation, keyboard-first behavior
- [ ] Commands:
  - Generate section
  - Change visual direction
  - Audit accessibility
  - Extract component
  - Create mobile variant
  - Explain this code
  - Repair preview
  - Export project
- [ ] Search
- [ ] Contextual ranking
- [ ] Show shortcuts and consequences clearly

---

## Phase 15 — Four product modes

- [ ] **Imagine** — prompt and visual direction
- [ ] **Shape** — manipulation, style, layout, refinement
- [ ] **Inspect** — code, structure, dependencies, responsive and accessibility review
- [ ] **Release** — export, copy, documentation, validation, deployment readiness
- [ ] Current mode is unmistakable
- [ ] Familiar tools remain directly accessible
- [ ] Branded vocabulary never hides functionality

---

## Phase 16 — Typography

- [ ] Dramatic geometric/grotesk display face
- [ ] Highly legible neutral interface face
- [ ] Rounded mono face for code and system output
- [ ] Avoid harsh terminal styling
- [ ] Integrate code typography into the brand
- [ ] Oversized landing type remains responsive
- [x] Do not distribute unlicensed font files

---

## Phase 17 — Sound

- [x] Sound remains off by default
- [ ] Optional soft tonal pulse at generation start
- [ ] Delicate stage-completion ticks
- [ ] Deep resolving tone at successful build
- [ ] No arcade effects
- [ ] No constant ambient sound
- [ ] Clear mute/control setting
- [ ] Respect accessibility preferences

---

## Phase 18 — Non-negotiable UX safeguards

At every moment, the user must know:

- [ ] What the system is doing
- [ ] What changed
- [ ] What they can do next

Additional safeguards:

- [ ] No fake progress theater
- [ ] Cinematic effects never block productive work
- [ ] Branded terms never hide familiar functions
- [~] Failures explain what broke and whether files are safe
- [ ] Major actions have keyboard-accessible equivalents
- [ ] Advanced visualizations have readable fallback views
- [ ] Mobile users can create, inspect, and recover work

---

## Release checklist

- [ ] Complete Stages 5–12 to a coherent usable depth
- [ ] Verify project export from a real generated workspace
- [ ] Verify anonymous creation and restoration locally
- [ ] Verify persistent project creation and reopening locally
- [ ] Verify mobile workspace controls
- [ ] Verify keyboard navigation
- [ ] Verify reduced-motion experience
- [ ] Run `pnpm test:run`
- [ ] Run `pnpm typecheck`
- [ ] Run `pnpm build`
- [ ] Repair production Neon Auth callback
- [ ] Run production authentication smoke test
- [ ] Unpause Vercel only after successful smoke test

## Definition of done

UIGen is fully aligned with Interface Alchemy when:

- [ ] The landing page demonstrates atmosphere-sensitive generation
- [ ] The workspace feels like a design instrument rather than an IDE clone
- [ ] The living edge is a consistent signature token
- [ ] Generation exposes real pipeline state
- [ ] Intent persists with every version
- [ ] Users can see what changed and what to do next
- [ ] The product remains fast, accessible, testable, and production-safe
- [ ] The experience plausibly feels like Figma, a modular synthesizer, and a science-fiction design laboratory fused into one tool
