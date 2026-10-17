/**
 * The vocabulary an inner page is written in.
 *
 * Ten pages share one set of parts — a hero, alternating bands, tiles, a
 * numbered timeline, chips, panels, a closing call to action. Kept in one file
 * because none of them means anything alone: they are the grammar of these
 * sections, not ten independent components.
 *
 * It is named for Services because Services is where it was first needed, and
 * the `svc__` class prefix is the same accident. Education's three pages are
 * built from exactly these parts — a second set under an `edu__` prefix would
 * be the same components with a different spelling, and the two would drift.
 * Only the blocks Education actually introduced (doors, a table, paired rows)
 * carry the `edu__` prefix, because only those are new shapes.
 *
 * `ServicePage` also owns the reveal pass for whatever it wraps, so a page file
 * is only ever a list of what is on it. Every band it renders is a `.band`, so
 * the nav reads these pages' light sections exactly as it reads the home page's.
 */

import { useLayoutEffect, useRef, useState } from "react";
import {
  gsap,
  buildCounters,
  revealLines,
  revealRise,
  reducedMotion,
} from "../../lib/scroll";
import { whileOnScreen } from "../../lib/scroll";
import { navigate, parseHref } from "../../lib/router";
import { scrollToId } from "../../lib/scroll";
import HeroArt from "../../components/HeroArt";
import Closing from "../Closing";

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

/**
 * An internal link that goes through the router rather than reloading the site.
 * Every service page links to other pages, so this is the one place that
 * knows how — the nav's own handler is bound up with closing its panels.
 */
export function Go({ href, className, children, ...rest }) {
  const onClick = (e) => {
    const { path, hash, external } = parseHref(href);
    if (external) return;
    e.preventDefault();
    if (path && path !== window.location.pathname) {
      navigate(href);
      return;
    }
    if (path) navigate(href);
    if (hash) requestAnimationFrame(() => scrollToId(hash));
  };
  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Structure                                                           */
/* ------------------------------------------------------------------ */

/** One band of the page. `tone` alternates down the page, as everywhere else. */
export function Band({ tone = "dark", id, className = "", children }) {
  return (
    <section className={`section band band--${tone} ${className}`} id={id}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** A section head: the label above, the headline under it. */
export function Head({ eyebrow, lines, note }) {
  return (
    <div className="svc__head">
      {eyebrow && (
        <p className="eyebrow" data-rise>
          {eyebrow}
        </p>
      )}
      <h2 className="h2--col display" data-clip>
        {lines.map((l, i) => (
          <span className="line" key={i}>
            <span className="line__inner">{l}</span>
          </span>
        ))}
      </h2>
      {note && (
        <p className="svc__note" data-rise>
          {note}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The page shell                                                      */
/* ------------------------------------------------------------------ */

/**
 * @param {object} p
 * @param {string} p.eyebrow  the section this page belongs to
 * @param {Array}  p.lines    the H1, one entry per clipped line
 * @param {string} [p.sub]    the line directly under the title
 * @param {Array}  [p.spectrum] chips under the sub, for the landing page
 * @param {string|string[]} [p.intro] the opening paragraph, or several
 * @param {string} [p.back]   href of the page this one sits under
 * @param {string} [p.backLabel] what that page is called
 * @param {string} [p.art]    a hero object: 'services' | 'studio' | 'library'
 * @param {object} [p.showcase] switches the hero to the centred showcase — see
 *   `ShowcaseHero` for its shape. Only a section's landing page carries one: a
 *   showcase is an entrance, and nine of these ten pages are read by someone who
 *   is already inside.
 */
export function ServicePage({
  eyebrow,
  lines,
  sub,
  spectrum,
  intro,
  back,
  backLabel = "Services",
  art,
  showcase,
  children,
}) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      /* Per section rather than once for the page: a reveal scoped to the whole
         document fires every element off the first trigger, so everything below
         the fold has already played by the time it is scrolled to.

         The closing band is excluded because it runs its own pass — it is a
         section of the home page first, and two passes on the same elements
         would tween the same properties from two triggers. */
      gsap.utils.toArray("section:not(.close)", el).forEach((sec) => {
        buildCounters(sec);
        revealLines(sec, { trigger: sec });
        revealRise(sec, { trigger: sec });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {showcase ? (
        <ShowcaseHero
          eyebrow={eyebrow}
          lines={lines}
          sub={sub}
          spectrum={spectrum}
          intro={intro}
          {...showcase}
        />
      ) : (
        <PageHero
          eyebrow={eyebrow}
          lines={lines}
          sub={sub}
          spectrum={spectrum}
          intro={intro}
          back={back}
          backLabel={backLabel}
          art={art}
        />
      )}

      {children}

      {/* Every page ends on the ask. It is rendered by the shell rather than
          listed at the foot of twelve page files, so a page cannot be written
          without one — and so the band, its id and its contact details stay one
          thing across the whole site. */}
      <Closing />
    </div>
  );
}

/** The head of a page inside a section: the copy in a column, the object beside
 *  it in the half the headline leaves empty. */
function PageHero({ eyebrow, lines, sub, spectrum, intro, back, backLabel, art }) {
  return (
    <section className="section band band--dark svc__hero">
      {/* Behind the copy, in the half of the hero the headline leaves empty.
          `.wrap` already carries a z-index, so the type sits over it without
          either of them having to know about the other. */}
      {/* <HeroArt kind={art} /> */}
      <div className="wrap">
        {back && (
          <Go className="svc__back" href={back} data-rise>
            <span aria-hidden="true">←</span> {backLabel}
          </Go>
        )}
        <p className="eyebrow" data-rise>
          {eyebrow}
        </p>
        <h1 className="h2 display svc__title" data-clip>
          {lines.map((l, i) => (
            <span className="line" key={i}>
              <span className="line__inner">{l}</span>
            </span>
          ))}
        </h1>
        {sub && (
          <p className="svc__sub" data-rise>
            {sub}
          </p>
        )}
        {spectrum && (
          <ul className="svc__spectrum" data-rise>
            {spectrum.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        {/* One string or several: Verifyble's opening needs two paragraphs,
            and joining them into one would bury the second. */}
        {intro && (
          <div className="svc__intro" data-rise>
            {[].concat(intro).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The showcase hero                                                   */
/* ------------------------------------------------------------------ */

/**
 * The entrance to a section: the same copy as the standard hero, centred, with
 * the section's own subject drawn under it.
 *
 * Three things carry it, and none of them is an image — there is no photograph
 * of consulting, and a stock one would be worse than nothing:
 *
 *   · the word itself, set enormous and in outline behind the headline, so the
 *     section names itself at a size the H1 cannot be set at
 *   · a console tilted away from the reader, which is the section's contents
 *     shown as an object — the six services on one rail, in order, over the
 *     disciplines they are practised in
 *   · red light under the console and above the headline, which is the only
 *     colour on the band and is what ties the two halves into one picture
 *
 * The console is real text — the same six names and the same twelve
 * disciplines, marked up as a list — because it is the hero's content, not a
 * decoration of it. A reader who cannot see it still reads it, and it is still
 * there when the fonts fail.
 *
 * @param {object} p
 * @param {string} [p.ghost]  the outlined word behind the headline
 * @param {object} [p.cta]    `{ label, href }`, under the copy
 * @param {Array}  [p.rail]   one node per entry: `{ n, name, note?, href? }`.
 *   A node with an `href` is a link into the page — the Studio's rail is its
 *   contents list — and one without is a label, which is what the Services rail
 *   is, since every name on it already has a tile of its own below.
 * @param {string} [p.label]  the console's own caption, above the rail
 * @param {React.ReactNode} [p.visual] a drawing under the copy, in place of the
 *   console. The Web3 Corridor page's subject is a map, and a map is not a list
 *   of six things — so that one page hands its own object in rather than being
 *   made to express itself as a rail it does not have.
 */
export function ShowcaseHero({
  eyebrow,
  lines,
  sub,
  intro,
  spectrum,
  ghost,
  cta,
  rail = [],
  label,
  visual,
}) {
  const railRef = useRef(null);

  /* The rail draws itself and then carries a signal along it — both are CSS
     animations, and this only says when they may run.

     [data-live] is the switch: it is set here and nowhere else, so under
     reduced motion the rule is simply drawn, the nodes are simply there, and
     nothing travels. That is why there is no reduced-motion rule for the rail
     in the stylesheet, and must not be.

     [data-hold] parks the travelling signal while the hero is off screen. It is
     an endless animation on a band the reader has left. */
  useLayoutEffect(() => {
    const el = railRef.current;
    if (!el || reducedMotion()) return;
    el.dataset.live = "";
    const release = whileOnScreen(
      el,
      () => delete el.dataset.hold,
      () => {
        el.dataset.hold = "";
      }
    );
    return () => {
      release();
      delete el.dataset.live;
      delete el.dataset.hold;
    };
  }, []);

  return (
    <section className="section band band--dark svc__hero svc__hero--show">
      <div className="svc__showAmb" aria-hidden="true" />
      {ghost && (
        <span className="svc__showGhost display" aria-hidden="true">
          {ghost}
        </span>
      )}

      <div className="wrap svc__showCopy">
        {/* the rounded bracket the headline sits inside — drawn on the copy box
            rather than the band, so it holds the type at every width */}
        <span className="svc__showFrame" aria-hidden="true" />
        {eyebrow && (
          <p className="eyebrow" data-rise>
            {eyebrow}
          </p>
        )}
        <h1 className="display svc__showTitle" data-clip>
          {lines.map((l, i) => (
            <span className="line" key={i}>
              <span className="line__inner">{l}</span>
            </span>
          ))}
        </h1>
        {sub && (
          <p className="svc__showSub" data-rise>
            {sub}
          </p>
        )}
        {intro && (
          <div className="svc__showIntro" data-rise>
            {[].concat(intro).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {cta && (
          <Go className="btn btn--primary btn--row" href={cta.href} data-rise>
            {cta.label} <span aria-hidden="true">→</span>
          </Go>
        )}
      </div>

      {visual && (
        <div className="svc__showVisual" data-rise>
          {visual}
        </div>
      )}

      {(rail.length > 0 || spectrum) && (
        <div className="svc__console" data-rise>
          <span className="svc__consoleGlow" aria-hidden="true" />
          <div className="svc__screen">
            <p className="svc__screenBar">
              <span className="svc__screenDots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {label}
            </p>

            {rail.length > 0 && (
              /* the count is on the list, so the stylesheet can set the row to
                 the number of nodes actually on it rather than to six */
              <ol className="svc__rail" data-n={rail.length} ref={railRef}>
                {rail.map((r, i) => {
                  const node = (
                    <>
                      <span className="svc__railN display">{r.n}</span>
                      <span className="svc__railName">{r.name}</span>
                      {r.note && <span className="svc__railNote">{r.note}</span>}
                    </>
                  );
                  return (
                    /* its place in the order, for the stagger the nodes arrive
                       on — the rail fills the way it is read */
                    <li key={r.n} style={{ '--i': i }}>
                      {r.href ? (
                        <Go className="svc__railLink" href={r.href}>
                          {node}
                        </Go>
                      ) : (
                        node
                      )}
                    </li>
                  );
                })}
              </ol>
            )}

            {spectrum && (
              <ul className="svc__spectrum svc__spectrum--screen">
                {spectrum.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Content blocks                                                      */
/* ------------------------------------------------------------------ */

/**
 * The index of services, as a rail that scrolls sideways.
 *
 * Six cards in a grid make the reader take in six things at once and choose;
 * a rail hands them one at a time and lets them keep going, which is how a
 * list of six is actually read. It scrolls natively — wheel, trackpad, touch,
 * and the arrows — so nothing here reimplements scrolling. All the buttons do
 * is move it by exactly one card.
 *
 * That step is measured from the cards themselves rather than assumed: the
 * distance between the first two is the card plus the gap, whatever the
 * stylesheet currently makes those.
 *
 * The rail is focusable and labelled, because a scrollable region that can only
 * be reached with a pointer is a region half the readers cannot open. Every
 * card is a link, so tabbing through them scrolls the rail on its own.
 */
export function Index({ items, label }) {
  const rail = useRef(null);
  const [at, setAt] = useState({ start: true, end: false });

  useLayoutEffect(() => {
    const el = rail.current;
    if (!el) return;
    /* Which end it is against, so an arrow that would do nothing is disabled
       rather than dead. The 2px is for sub-pixel scroll positions, which is
       what stops the last arrow from staying enabled at the end. */
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAt({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft >= max - 2,
        /* Nothing to scroll at all — a group short enough to fit, or a wide
           enough window. Two arrows that are both dead is worse than no arrows:
           it offers a control and then refuses it. */
        still: max <= 2,
      });
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    /* the rail's own width decides how many cards fit, so a resize can change
       whether there is anywhere left to scroll */
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [items]);

  const page = (dir) => {
    const el = rail.current;
    if (!el) return;
    const cards = el.children;
    const step =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : el.clientWidth;
    el.scrollBy({
      left: dir * step,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className="idx">
      <div className="idx__nav" data-rise hidden={at.still}>
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={at.start}
          aria-label="Previous services"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={at.end}
          aria-label="Next services"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <ul
        className="svc__index"
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        {items.map((s) => (
          <li key={s.slug} data-rise>
            <Go className="svc__indexLink" href={s.href}>
              <span className="svc__indexN">{s.n}</span>
              <h3 className="svc__indexName">{s.name}</h3>
              <p className="svc__indexBlurb">{s.blurb}</p>
              <span className="arrow arrow--red">
                Explore <span aria-hidden="true">→</span>
              </span>
            </Go>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Named things with a description. `cols` is the count at desktop; below that
 * the stylesheet takes over.
 */
export function Tiles({ items, cols = 3 }) {
  return (
    <ul className="svc__tiles" data-cols={cols}>
      {items.map((it) => (
        <li key={it.name} data-rise>
          <h3 className="svc__tileName">{it.name}</h3>
          {it.body && <p className="svc__tileBody">{it.body}</p>}
        </li>
      ))}
    </ul>
  );
}

/** Named things with no description — a capability list, set as cards. */
export function Chips({ items }) {
  return (
    <ul className="svc__chips">
      {items.map((it) => (
        <li key={it} data-rise>
          {it}
        </li>
      ))}
    </ul>
  );
}

/** Plain tags: a technology list, where each entry is one word or two. */
export function Tags({ items, label }) {
  return (
    <ul className="svc__tags" aria-label={label} data-rise>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

/**
 * An ordered process. The rule down the left is the timeline; the numbers are
 * information, not decoration — step 4 cannot happen before step 3.
 */
export function Steps({ items }) {
  return (
    <ol className="svc__steps">
      {items.map((s) => (
        <li key={s.n} data-rise>
          <span className="svc__stepN">{s.n}</span>
          <h3 className="svc__stepName">{s.name}</h3>
          <p className="svc__stepBody">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The same ordered steps, taken one at a time on a wheel.
 *
 * `Steps` prints the sequence; this one walks it. The six names stand on a
 * circle whose hub is off to the left, each rotated to follow it, and the one
 * at the reading point is crisp with a dot on the arc beside it while the rest
 * fade and blur by their angle off it. Its description reads out in the column
 * alongside. Six paragraphs printed at once are six things to choose between;
 * one at a time, in order, is the sequence the engagement actually is.
 *
 * Every description is in the DOM, all six, whichever one is showing — they are
 * stacked and cross-faded rather than swapped, so nothing is ever missing from
 * the page for a reader who is not looking at it.
 *
 * Under reduced motion the geometry is never applied and the wheel is not
 * rendered at all: the panes fall into flow and the block is the printed list
 * of six it started as. That is why there is no reduced-motion rule for `.orb`
 * in the stylesheet, and must not be.
 */
export function Orbit({ items, hold = 4 }) {
  const root = useRef(null);
  const list = useRef(null);
  /* The wheel's own angle, unwrapped. Kept in a ref rather than in state: it is
     read by the placement pass, never rendered, and a re-render per degree is
     not what a transform needs. */
  const turn = useRef(0);
  const [at, setAt] = useState(0);
  const step = 360 / items.length;

  /* How far off the reading point a name is still legible, in degrees, and it
     has to follow from the count rather than be a number of its own: six names
     sit 60° apart and four sit 90°, so a fixed falloff would show three of the
     six and one of the four. At 1.6 steps, the pair either side of the reading
     point is always just legible and the rest are always gone — the wheel looks
     the same whatever is on it. */
  const falloff = step * 1.6;

  /* Two angles per item, and they are not the same number.

     `--a` is where the item sits, and it is deliberately never wrapped: the
     wheel has to keep turning the same way forever, and an angle folded back
     into ±180 would send an item the long way round every time it crossed the
     back of the circle.

     `--n` is that angle folded into ±180 — the item's real bearing from the
     reading point. Everything that describes the item rather than its position
     is measured from it: how legible it is, and how far its text is tilted. On
     the raw angle the tilt accumulates a lap at a time, which is how 01 came
     back round upside down. */
  useLayoutEffect(() => {
    const nodes = gsap.utils.toArray(".orb__item", list.current);
    nodes.forEach((li, i) => {
      const a = i * step + turn.current;
      const n = ((((a + 180) % 360) + 360) % 360) - 180;
      li.style.setProperty("--a", `${a}deg`);
      li.style.setProperty("--n", `${n}deg`);
      li.style.setProperty(
        "--k",
        Math.max(0, 1 - Math.abs(n) / falloff).toFixed(3)
      );
    });
  }, [at, step, falloff]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    el.dataset.live = "";

    const ctx = gsap.context(() => {
      /* The advance is `onRepeat`, not a callback at the end of the timeline.
         A callback placed on the exact end time sits on the boundary the
         playhead jumps across when the timeline loops, so it fires on the first
         lap and is skipped on the ones after it — the wheel turned once and
         then stood still. `onRepeat` is called once per lap, by the lap.

         Forward, always: the wheel turns one way and the sequence reads in
         order. Subtracting a step rather than recomputing the angle from the
         index is what stops 06 → 01 from spinning the long way back. */
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        onRepeat: () => {
          turn.current -= step;
          setAt((i) => (i + 1) % items.length);
        },
      });
      /* A real property on a real object. An empty tween is the documented way
         to hold a timeline open for a beat, but this one is the only child of
         the timeline whose repeat drives the whole wheel, and it is not worth
         resting that on GSAP finding nothing to do. */
      tl.to({ t: 0 }, { t: 1, duration: hold, ease: "none" });

      /* Held by whether it is on screen, watched rather than measured — see
         whileOnScreen. Nothing turns behind the viewport. */
      let held = false;
      const release = whileOnScreen(
        el,
        () => {
          if (!held) tl.play();
        },
        () => tl.pause()
      );

      /* A reader who takes hold of it keeps it: there is no resuming, because
         someone who has chosen a step is reading that step, not waiting — and
         `held` is what stops scrolling it off screen and back from undoing
         that. */
      const stop = () => {
        held = true;
        tl.pause();
      };
      el.addEventListener("pointerdown", stop);
      el.addEventListener("focusin", stop);
      return () => {
        release();
        el.removeEventListener("pointerdown", stop);
        el.removeEventListener("focusin", stop);
      };
    }, root);
    return () => {
      ctx.revert();
      delete el.dataset.live;
    };
  }, [hold, step, items.length]);

  /* Jumping to a step picks the nearest turn that puts it at the reading point,
     so a click on 05 while 01 is showing goes back one rather than forward
     five. Auto-advance does not use this — see the note above. */
  const goTo = (j) => {
    const base = -j * step;
    turn.current = base + 360 * Math.round((turn.current - base) / 360);
    setAt(j);
  };

  return (
    <div className="orb" ref={root}>
      {/* The rise is on the two halves, not on the panes: a pane's opacity is
          the wheel's to own, and a reveal writing to the same property would
          leave whichever it finished last showing. */}
      <div className="orb__copy" data-rise>
        {items.map((s, i) => (
          <article
            className="orb__pane"
            key={s.n}
            data-on={i === at ? "" : undefined}
          >
            <span className="orb__n display">{s.n}</span>
            <h3 className="orb__name">{s.name}</h3>
            <p className="orb__body">{s.body}</p>
          </article>
        ))}
      </div>

      <div className="orb__ring" data-rise>
        <span className="orb__arc" aria-hidden="true" />
        <span className="orb__dot" aria-hidden="true" />
        <ol className="orb__list" ref={list}>
          {items.map((s, i) => (
            <li className="orb__item" key={s.n} data-on={i === at ? "" : undefined}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === at ? "step" : undefined}
              >
                <span className="orb__itemN">{s.n}</span>
                <span className="orb__itemName">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Two parallel checklists — the tech process, which runs as two tracks. */
export function Tracks({ items }) {
  return (
    <div className="svc__tracks">
      {items.map((t) => (
        <div className="svc__track" key={t.key} data-rise>
          <p className="svc__trackK">Track {t.key}</p>
          <h3 className="svc__trackName">{t.name}</h3>
          <ol className="svc__trackList">
            {t.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

/** A group heading with its list under it — the offerings and the white label. */
export function Groups({ items, cols = 2 }) {
  return (
    <ul className="svc__groups" data-cols={cols}>
      {items.map((g) => (
        <li key={g.name || g.group} data-rise>
          <h3 className="svc__groupName">{g.name || g.group}</h3>
          <ul className="svc__groupList">
            {g.items.map((i) => (
              <li key={typeof i === "string" ? i : i.name}>
                {typeof i === "string" ? (
                  i
                ) : (
                  <>
                    <strong>{i.name}</strong>
                    <span>{i.body}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/**
 * The sector panels.
 *
 * A real <button> per panel with aria-expanded, and the body kept in the DOM so
 * it is findable on the page and printable — the 0fr/1fr grid animates it
 * closed without needing a measured height, and `hidden` would take it out of
 * find-in-page along with the animation.
 */
export function Panels({ items }) {
  const [open, setOpen] = useState(items[0]?.name ?? null);
  return (
    <div className="svc__panels">
      {items.map((p) => {
        const isOpen = open === p.name;
        return (
          <section
            className="svc__panel"
            key={p.name}
            data-open={isOpen ? "" : undefined}
            data-rise
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : p.name)}
              >
                <span>{p.name}</span>
                <span className="svc__panelCount">{p.items.length}</span>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M6 1v10M1 6h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </h3>
            <div className="svc__panelBody">
              <div>
                <ul>
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                {p.pending && (
                  /* said plainly rather than quietly truncated — a reader can
                     see this is unfinished, so it cannot ship by accident */
                  <p className="svc__pending">
                    Further capabilities to be supplied.
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/**
 * Questions and their answers.
 *
 * The same disclosure as `Panels` and deliberately the same classes, because it
 * is the same control — but a question is a sentence, not a heading, so it drops
 * the display face and the uppercasing, and the body is prose rather than a row
 * of chips. `data-faq` on the list is what switches those two things.
 */
export function Faq({ items }) {
  const [open, setOpen] = useState(items[0]?.q ?? null);
  return (
    <div className="svc__panels" data-faq>
      {items.map((it) => {
        const isOpen = open === it.q;
        return (
          <section
            className="svc__panel"
            key={it.q}
            data-open={isOpen ? "" : undefined}
            data-rise
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : it.q)}
              >
                <span>{it.q}</span>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M6 1v10M1 6h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </h3>
            <div className="svc__panelBody">
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/**
 * Counted figures, in a row.
 *
 * The final value is in the markup, so it is correct before the counter runs —
 * and stays correct if it never does.
 */
export function Stats({ items, cols = 3 }) {
  return (
    <div className="svc__figures" data-cols={cols}>
      {items.map((s) => (
        <div className="impact__card" key={s.label} data-rise>
          <span
            className="impact__k"
            data-count={s.to}
            data-prefix={s.prefix}
            data-suffix={s.suffix}
          >
            {s.prefix}
            {s.to}
            {s.suffix}
          </span>
          <span className="impact__v">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * The two doors of the Education chooser.
 *
 * Larger than an index tile and answering a different question: an index asks
 * "which of these do you want", a door asks "which of these are you". So the
 * audience is the first thing on the card, above the name of what is behind it.
 */
export function Doors({ items }) {
  return (
    <ul className="edu__doors">
      {items.map((d) => (
        <li key={d.key} data-rise>
          <p className="edu__doorK">{d.who}</p>
          <h3 className="edu__doorName display">{d.name}</h3>
          <p className="edu__doorBody">{d.body}</p>
          <Go className="btn btn--primary btn--sm" href={d.href}>
            {d.cta}
          </Go>
        </li>
      ))}
    </ul>
  );
}

/**
 * A real table, for the one thing on these pages that is one: three tiers
 * answering the same two questions. A grid of cards would lose the comparison,
 * which is the only reason the tiers are shown together at all.
 */
export function Table({ head, rows, caption }) {
  return (
    <div className="edu__tableWrap" data-rise>
      <table className="edu__table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, ...cells]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              {cells.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** An ambition on the left, the program that reaches it on the right. */
export function Pairs({ items }) {
  return (
    <ul className="edu__pairs">
      {items.map((p) => (
        <li key={p.name} data-rise>
          <p className="edu__pairOutcome">{p.outcome}</p>
          <div>
            <h3 className="edu__pairName">{p.name}</h3>
            <p className="edu__pairBody">{p.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Whether a call to action is an ENQUIRY or a destination.
 *
 * `#connect` is the site's long-standing way of saying "the ask" — every page
 * ends on its own connect band, and that is what these pointed at. Section 8.1
 * makes the ask an overlay instead, so that one href now means "open the
 * enquiry form" and everything else still means what it says.
 *
 * The href is left on the element rather than stripped: it is a real anchor to
 * a real band, so it survives with no JS and a middle-click still opens it. The
 * delegated listener in Enquiry.jsx takes only the plain left click.
 *
 * `topic` is optional and, when given, wins over the page's own default — which
 * Verifyble needs, since that page carries both an institution ask and a
 * student one and PAGE_CONTEXT can only answer for the page.
 */
const asEnquiry = (href, topic) =>
  href === "#connect" || href === "/connect"
    ? { "data-enquiry": topic ?? "" }
    : null;

/**
 * The closing call to action every service page ends on.
 *
 * The default is a bare hash, not `/#connect`: every page these appear on now
 * ends on its own connect band, so with no JS the ask is a scroll to the foot of
 * the page the reader is already on rather than a trip to the home page's copy
 * of it. With JS it opens the enquiry overlay — see asEnquiry.
 */
export function Cta({ label, href = "#connect", note, topic }) {
  return (
    <div className="svc__cta" data-rise>
      {note && <p className="svc__ctaNote">{note}</p>}
      <Go className="btn btn--primary" href={href} {...asEnquiry(href, topic)}>
        {label}
      </Go>
    </div>
  );
}

/**
 * A closing call to action with more than one way out.
 *
 * `tone` ranks them rather than their order doing it: the primary and the ghost
 * are buttons on one row, and a `link` is the tertiary — a route for a reader
 * who is not ready to commit to either, which should not be wearing the same
 * weight as the two that are the point of the page.
 */
export function Actions({ items, note }) {
  const buttons = items.filter((a) => a.tone !== "link");
  const links = items.filter((a) => a.tone === "link");
  return (
    <div className="svc__cta" data-rise>
      {note && <p className="svc__ctaNote">{note}</p>}
      <div className="svc__ctaRow">
        {buttons.map((a) => (
          <Go
            key={a.label}
            className={`btn ${a.tone === "ghost" ? "btn--ghost" : "btn--primary"}`}
            href={a.href}
            {...asEnquiry(a.href, a.topic)}
          >
            {a.label}
          </Go>
        ))}
      </div>
      {links.length > 0 && (
        <ul className="svc__ctaAside">
          {links.map((a) => (
            <li key={a.label}>
              <Go className="arrow arrow--red" href={a.href} {...asEnquiry(a.href, a.topic)}>
                {a.label} <span aria-hidden="true">→</span>
              </Go>
              {a.note && <span className="svc__ctaAsideNote">{a.note}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * A row of anchors into the page's own sections.
 *
 * Links, not the `spectrum` chips they are shaped like: those name disciplines
 * and go nowhere, these go somewhere, and the two must not look identical.
 *
 * The Studio was its one caller, until that page's contents moved onto the rail
 * in its showcase hero, where the same four anchors are also the picture. Kept
 * for the next page that needs a list of anchors and no hero to put it in.
 */
export function Jump({ items, label }) {
  return (
    <ul className="stu__jump" aria-label={label} data-rise>
      {items.map((it) => (
        <li key={it.label}>
          <Go href={it.href}>{it.label}</Go>
        </li>
      ))}
    </ul>
  );
}

/**
 * The client wall, filtered by group.
 *
 * ⚠ THE MARKS ARE FETCHED FAVICONS, NOT LICENSED LOGOS, and every name on this
 * wall is a real organisation. See scripts/fetch-logos.mjs and the warning at
 * the top of studio.js before this ships.
 *
 * Every cell carries the name; a client with a confirmed domain carries its
 * mark above it. Not one or the other — what gets fetched is a favicon, and a
 * favicon is a mark without a wordmark, so several are unreadable alone (KPMG's
 * is a plain gradient square). The name under it makes every cell identifiable,
 * makes the 29 with marks and the 59 without read as one wall, and keeps the
 * page honest when a logo fails to load.
 *
 * The name is real text, so the image is `alt=""` — decorative, because the
 * information is already there and a screen reader should not hear it twice.
 *
 * Most of this list has no confirmed domain and renders name-only. That is the
 * correct outcome, not a gap: a guessed domain would put another company's logo
 * on IBA's client wall.
 *
 * The filter is three buttons rather than the brief's two: with only Enterprise
 * and Web3 there is no way back to the whole wall once one is chosen, and the
 * whole wall is the state the section opens in. `aria-pressed` carries which is
 * active, and the count travels with each chip so the reader knows the size of
 * what they are about to filter down to.
 */
export function LogoWall({ groups, manifest = {}, allLabel = "All" }) {
  const [filter, setFilter] = useState(null);
  const shown = filter ? groups.filter((g) => g.key === filter) : groups;
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const chip = (key, label, count) => (
    <li key={label}>
      <button
        type="button"
        aria-pressed={filter === key}
        onClick={() => setFilter(key)}
        data-active={filter === key ? "" : undefined}
      >
        {label} <span className="stu__chipN">{count}</span>
      </button>
    </li>
  );

  return (
    <div className="stu__wall" data-rise>
      <ul className="stu__filters" aria-label="Filter clients by kind">
        {chip(null, allLabel, total)}
        {groups.map((g) => chip(g.key, g.label, g.items.length))}
      </ul>

      {shown.map((g) => (
        <section className="stu__group" key={g.key} aria-label={g.label}>
          {/* the group heading only earns its place when both are on screen —
              filtered to one, the chip above already says which */}
          {!filter && <h3 className="stu__groupName">{g.label}</h3>}
          <ul className="stu__marks">
            {g.items.map(({ name, domain }) => {
              const file = domain && manifest[domain];
              return (
                <li key={name} data-mark={file ? "" : undefined}>
                  {file && (
                    /* The app is served from the domain root — path routing
                       already requires that — so the public path is absolute. */
                    <img
                      src={`/logos/${file}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span className="stu__markName">{name}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

/**
 * A named thing whose copy has not been written yet.
 *
 * The headings its description will fill are listed and marked outstanding,
 * rather than filled with plausible-sounding text. For a real cross-border
 * program, invented objectives are a commitment nobody agreed to.
 */
export function Pending({ items }) {
  return (
    <ul className="stu__pending">
      {items.map((it) => (
        <li key={it.name} data-rise>
          <h3 className="stu__pendingName display">{it.name}</h3>
          <ul>
            {it.fields.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="svc__pending">Description to be supplied.</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * The band that hands a reader to the other section when they are on the wrong
 * one. Services points at Education, and each Education page points at the other
 * door — the same shape every time, so it is one component.
 */
export function Cross({ title, body, cta, href }) {
  return (
    <div className="svc__cross" data-rise>
      <div>
        <h2 className="svc__crossName display">{title}</h2>
        <p className="svc__crossBody">{body}</p>
      </div>
      <Go className="btn btn--primary btn--sm" href={href}>
        {cta}
      </Go>
    </div>
  );
}
