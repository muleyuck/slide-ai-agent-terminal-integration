# AIエージェントと快適に開発するために、ターミナル環境を見直した話

`README.md` says what the talk is and how to run the deck. This file is what an
agent needs on top of that: the commands, the constraints a slide is held to,
and the traps this deck has already fallen into.

This repository holds one talk. There is no library here and nothing to reuse —
the deliverable is nine slides that read correctly on a projector.

## Commands

| | |
|---|---|
| `pnpm dev` | vite dev server |
| `pnpm typecheck` | `tsc -b --noEmit` |
| `pnpm check` | `biome check .` |
| `pnpm format` | `biome check --write .` |
| `pnpm build` | `tsc -b && vite build` |

There are no tests. `pnpm typecheck` plus looking at the slide in a browser is
the whole verification story.

If your sandbox blocks binding a port, `pnpm dev` fails with
`errno: -1, syscall: 'listen'`. Run it outside the sandbox.

## Style the tools enforce

Biome, not Prettier: **no semicolons**, space indent, 100 columns. The
`useSortedClasses` nursery rule is on at `error`, so Tailwind classes have a
fixed order — write them in any order and let `pnpm format` sort them rather
than arguing with the linter.

Commits follow Conventional Commits — `feat:`, `fix:`, `refactor:`, `style:`,
`docs:`, `chore:`, `ci:`.

## Where the content lives

```
src/Presentation.tsx   the deck: nine <XxxSlide /> in the order they are shown
src/slides/            one file per slide, named for what it argues
src/components/        typography.tsx  Kicker, Takeaway, Code, Key
                       media.tsx       asset(), Avatar, AppIcon, CoverSlide
                       icons.tsx       Icon, UserIcon, AvatarBubble
src/styles.css         Tailwind @theme tokens and the engine's --fs-* mapping.
                       The only CSS file, and it stays that way.
public/                images the slides reach through asset()
demo/*.tape            VHS scripts that record the GIFs in public/
vendor/*.tgz           the engine itself, committed
```

Reach for `public/` through `asset()` — it prefixes `import.meta.env.BASE_URL`,
which GitHub Pages needs and a bare `/foo.png` breaks.

## The engine's rules

Four things the engine will not warn you about:

- **`<Step>` has to be markup the slide receives directly.** A `<Step>` returned
  from inside your own component is invisible to the slide and does not count
  toward its step total.
- **`<Title>` needs `font-bold`.** Tailwind's preflight sets `h1`'s
  `font-weight` to `inherit`, so the heading renders thin without it.
- **The engine's own rules sit outside `@layer`.** Tailwind utilities live in
  `@layer utilities` and therefore lose to `.fs-title` and friends. Overriding
  one means writing the rule in `src/styles.css`, not adding a utility class.
- **`.fs-title` carries `margin-bottom: 0.8em`,** which collapses with an
  adjacent `mt-*`. Use `pt-*` on the next element when you need real space.

Colors go through the theme tokens — `text-accent`, `bg-surface`, `text-code`.
Raw hex belongs in `src/styles.css` and nowhere else.

## Fitting a slide

The stage is a fixed 1280x720 and `--fs-slide-padding` is `3rem`, so a slide has
1184px of usable width and 48px of bottom padding. Content that runs past the
bottom is not clipped and raises no error — it quietly eats the padding, and on
a projector it reads as a slide that touches the floor.

**Measure it. Do not eyeball it.** With `pnpm dev` running, walk the deck and
compute the remaining space in logical pixels:

```js
const s = [...document.querySelectorAll(".fs-slide")].at(-1)
const scale = s.getBoundingClientRect().width / s.offsetWidth
let bottom = 0
for (const el of s.children) {
  if (getComputedStyle(el).position === "absolute") continue
  bottom = Math.max(bottom, el.getBoundingClientRect().bottom)
}
const slack =
  (s.getBoundingClientRect().bottom - bottom) / scale -
  parseFloat(getComputedStyle(s).paddingBottom)
```

Step through with `location.hash = "#/present/{slide}/4"` and wait ~500ms for
the transition; the hash clamps to the slide's real step count. Take the **last**
`.fs-slide` in the DOM — the outgoing layer is still mounted during a transition.

Measured slack, in order: `185 / 240 / 12 / 9 / 41 / -22 / 34 / -14 / 137`.
Slides 6 and 8 are already negative and 3 and 4 have single digits, so **one
added character on those four can cost a whole line (~32px)**. Before rewording
a `Takeaway`, test the candidate by swapping `innerHTML` and reading the height:
64px is two lines, 97px is three.

## Japanese line breaking

Chrome's default breaking splits 「エージェント」 as 「エ／ージェント」 and drops
長音 and 小書き仮名 to the start of a line. **Every break in this deck is
authored** — `<br>` in the markup, or a `[string, string]` pair as in
`HistorySlide`'s `move` — so nothing relies on automatic wrapping today. If you
add prose that wraps on its own, author its breaks too.

## The deck is public

- **No absolute paths and no username in screenshots or GIFs.** Claude Code's
  status line prints `/Users/<name>/…`. Record the Codex pane, which shows
  `~/Work/backend`.
- **No Claude Code / Codex (Anthropic / OpenAI) logos.** Their brand guidelines
  restrict third-party use. Check the license before adding any logo.
- The Neovim logo is CC BY 3.0 and its attribution is required. The credit line
  at the foot of `ConclusionSlide` covers it — do not remove it.
- No internal project names.

## Bumping the engine

`flow-slide-engine` is on no registry; the tarball is committed under `vendor/`
and referenced as `file:./vendor/flow-slide-engine-X.Y.Z.tgz`. To move versions:

```sh
cd ../flow-slide-engine && pnpm pack:dist        # writes flow-slide-engine-X.Y.Z.tgz
cp ../flow-slide-engine/flow-slide-engine-X.Y.Z.tgz vendor/
# point package.json at the new file, then
pnpm install
git rm vendor/flow-slide-engine-<old>.tgz
```

`pnpm install` needs the real pnpm store, so run it outside a sandbox that
blocks writes to `~/Library/pnpm/store` — otherwise pnpm falls back to a
project-local `.pnpm-store`, sees a mismatch, and aborts asking to purge
`node_modules`.

## Deployment

`.github/workflows/deploy-pages.yml` calls a reusable workflow on push to
`main`, and the site is served from
<https://muleyuck.github.io/slide-ai-agent-terminal-integration/>. `base` in
`vite.config.ts` must stay equal to the repository name or every asset 404s.

## Decided against

Both were measured and removed. Do not reintroduce them without new evidence.

- **`line-break: strict; word-break: normal` on `.fs-slide`.** Compared every
  character's position under `strict` and `auto` across all nine slides: zero
  differences, because no text node wraps on its own (see above).
  `word-break: normal` is the initial value regardless.
- **An accent band drawn with `.fs-slide::before`.** Purely decorative, not a
  progress indicator — the engine already draws one at the foot of the stage.
