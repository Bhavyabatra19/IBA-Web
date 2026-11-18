/* ==================================================================
   Web3 Corridor membership brochure: builds the pages for one tier,
   gates them behind name + email, then opens them as a flip book.

   The page that loads this sets window.BROCHURE to club | premier |
   gold | xchange. Tier data comes from tiers.js, a copy of
   documents/assets/tiers.js.

   Each brochure stands on its own (by request, 11-16-2026): a reader
   only ever receives their tier's brochure, so it lists every benefit
   that tier includes, in full, and never refers to another tier. The
   benefit pages are paginated at load time: blocks are measured on a
   hidden page and moved to a new page when one fills up.

   The gate posts the lead to /api/brochure, which emails it to the IBA
   inbox. A visitor who has unlocked once is remembered in this browser
   (localStorage) and goes straight to the book next time.

   Flip engine: StPageFlip 2.0.7 (MIT), vendor/page-flip.browser.js.
   ================================================================== */
;(function () {
  const KEY = window.BROCHURE || 'gold'
  const T = W3C.tiers[KEY]
  const XCH = KEY === 'xchange'
  const STORE = 'w3c-brochure-lead'
  const usd = (n) => 'US$' + n.toLocaleString('en-US')
  const $ = (s, r = document) => r.querySelector(s)

  const GROUPS = W3C.benefitsFor(KEY)
  const COUNT = W3C.countFor(KEY)
  const PROG = XCH ? 'Indo–UAE Startup Xchange' : 'Web360 Club'
  const ROUNDTABLES = XCH || KEY === 'club' ? '' : W3C.groups[3].items[0][KEY]
  /* a tier IBA has written up in full (Club Class, 11-18-2026) */
  const PRO = T.profile

  /* brochure copy, per tier: standalone, no reference to other tiers */
  const COPY = {
    club: {
      position: 'Club Class gives you verified access to the Web3 Corridor: its ecosystem, its knowledge and its people, with the advisory and funding preparation to make the most of them.',
      who: 'Founders, early-stage startups and professionals who want verified access to the Web3 Corridor ecosystem, its knowledge and its network.',
      glance: '/images/corridor-expansion.jpg',
    },
    premier: {
      position: 'Premier Class strengthens your visibility, business development and commercial readiness, with an expert board advisor, investment preparation and talent working alongside your team.',
      who: 'Growing startups and SMEs ready to sharpen their go-to-market, raise their profile and prepare for investment across India and the UAE.',
      glance: '/images/corridor-founder.jpg',
    },
    gold: {
      position: 'Gold Class delivers executive-level engagement, institutional positioning and priority growth opportunities in the heart of Dubai.',
      lead: 'A premium Dubai presence, institutional introductions, and full strategic, investment, talent and visibility support.',
      who: 'Scale-ups, executives and institutions that want a working presence in Dubai, institutional introductions and a launchpad for tokenization.',
      glance: '/images/corridor-globe-team.jpg',
    },
    xchange: {
      position: 'Gold Xchange is a bilateral market-entry membership, built around a 12-week launch sprint between India and the UAE.',
      who: 'Startups ready for a structured India ↔ UAE launch, in either direction.',
      glance: '/images/corridor-globe-team.jpg',
    },
  }[KEY]

  /* pages: page numbers are written as __N__ and filled in at the end */
  const foot = () => `<div class="pg__foot"><span><i>■</i> Web3 Corridor · ${T.name}</span><span>__N__</span></div>`
  const page = (inner, cls = '') => `<div class="page ${cls}"><div class="pg">${inner}${foot()}</div></div>`

  const cover = () => `
    <div class="page page--cover" data-density="hard"><div class="pg cover">
      <img class="cover__img" src="${XCH ? '/images/presence-map-hubs.jpg' : '/images/corridor-gold.jpg'}" alt="">
      <div class="cover__fade"></div>
      <div class="cover__top">
        <img class="w3" src="/images/web3-corridor-logo.webp" alt="Web3 Corridor">
        <div class="by">An initiative by<img src="/iba-logo-dark.png" alt="India Blockchain Alliance"></div>
      </div>
      <div class="cover__body">
        <p class="cover__kicker">${PROG} · Membership</p>
        <h1 class="cover__title">${T.name}</h1>
        <p class="cover__sub">${XCH ? '12-week Launch Sprint' : T.sub}</p>
        <span class="cover__tag">${T.tagline}</span>
      </div>
      <div class="cover__foot"><span>Membership brochure</span><span>2026–27</span></div>
      <div class="cover__metal metal--${KEY}"></div>
    </div></div>`

  const corridor = () =>
    page(`
      <p class="eyebrow">The Web3 Corridor</p>
      <h2 class="h2">Connecting markets across regulation, capital, talent and projects.</h2>
      <div class="redbar"></div>
      <p class="lead">A Web3 Corridor is a structured cross-border programme that connects two or more markets. The friction between emerging markets is rarely technical: it is regulatory ambiguity, missing introductions and no shared standard for what “credible” looks like.</p>
      <p class="body">India Blockchain Alliance runs its corridors, India–UAE and India–Spain–LATAM, as long-term programmes, not events. Membership is how founders, investors and institutions take part.</p>
      <div class="pillars">
        <div><b>Regulation</b><span>The regulatory position in each market, mapped and explained.</span></div>
        <div><b>Capital</b><span>Investors, launchpads and listing infrastructure in both markets.</span></div>
        <div><b>Talent</b><span>Skills, credentials and mentor networks moving across the corridor.</span></div>
        <div><b>Projects</b><span>Pilots, tokenized assets and enterprise deployments that use it.</span></div>
      </div>`)

  const glance = () => {
    const facts = XCH
      ? [['12', 'week launch sprint'], [String(COUNT), 'benefits included'], ['2', 'markets, one programme']]
      : PRO
        ? [[String(COUNT), 'inclusions'], ['4 hrs', 'mentorship a month'], [usd(T.price), 'per year']]
        : [[String(COUNT), 'benefits included'], [String(GROUPS.length), 'areas of support'], [ROUNDTABLES.split(' ')[0], 'roundtables a year']]
    return page(`
      <div class="glance-img"><img src="${COPY.glance}" alt=""><span>${T.name} at a glance</span></div>
      <p class="eyebrow">${XCH ? '12-week Launch Sprint' : T.sub}</p>
      <h2 class="h2">${PRO ? PRO.headline : T.tagline.replace(/•/g, '·')}</h2>
      <p class="lead">${PRO ? PRO.promise : COPY.position}</p>
      ${COPY.lead ? `<p class="body">${COPY.lead}</p>` : ''}
      <div class="facts">${facts.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
      ${PRO
        ? `<div class="who"><p class="eyebrow">Ideal for</p><ul class="ideal">${PRO.idealFor.map((x) => `<li>${x}</li>`).join('')}</ul></div>`
        : `<div class="who"><p class="eyebrow">Designed for</p><p>${COPY.who}</p></div>`}
      ${T.servicePartners && !PRO ? `<p class="body" style="margin:0">Service partners: <span style="color:var(--ink)">${T.servicePartners}</span></p>` : ''}`, PRO ? 'page--tight' : '')
  }

  /* the programme, in IBA's words (tiers with a profile) */
  const programme = () =>
    page(`
      <p class="eyebrow">${PRO.programme}</p>
      <h2 class="h2">${PRO.journey}</h2>
      <div class="redbar"></div>
      <p class="lead">${PRO.access}</p>
      ${PRO.about.map((x) => `<p class="body">${x}</p>`).join('')}
      <div class="who" style="margin-top:2cqw"><p class="eyebrow">Advisory services</p><p>${PRO.note}</p></div>`)

  /* Gold Xchange: the sprint, phase by phase */
  const sprint = () => {
    const phases = [
      ['Phase 1', 'Validate', ['Network and ecosystem orientation', 'Compliance clinics', 'Your India → UAE or UAE → India track']],
      ['Phase 2', 'Build', ['Curated introductions', 'Market-entry support and partner navigation', 'Your named corridor concierge']],
      ['Phase 3', 'Launch', ['Demo day', 'Soft-landing support', 'Member events and briefings']],
    ]
    return page(`
      <p class="eyebrow">The 12-week launch sprint</p>
      <h2 class="h2">Validate, build, launch: one structured route into the other market.</h2>
      <div class="sprint">${phases.map(([w, h, li]) => `<div><span class="wk">${w}</span><b>${h}</b><ul>${li.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
      <p class="body">Throughout the sprint you are part of a founder community across both markets, with a named concierge coordinating your programme from start to finish. Every benefit is set out in full on the following pages.</p>
      <div class="ben-img"><img src="/images/presence-map-hubs.jpg" alt=""></div>`)
  }

  /* every benefit, measured onto as many pages as it needs ----------- */
  const headFirst = PRO
    ? `
    <p class="eyebrow">Your inclusions in full</p>
    <h2 class="h2">${COUNT} inclusions in ${T.name}</h2>
    <p class="body" style="margin-bottom:3cqw">Every inclusion and service ${PRO.sources}, for the full year of your membership.</p>`
    : `
    <p class="eyebrow">Your benefits in full</p>
    <h2 class="h2">${COUNT} benefits included in ${T.name}</h2>
    <p class="body" style="margin-bottom:3cqw">Everything your membership includes, and what each benefit gives you.</p>`
  const headNext = PRO ? `<p class="eyebrow">Your inclusions in full, continued</p>` : `<p class="eyebrow">Your benefits in full, continued</p>`
  const groupHead = (g, cont) =>
    `<div class="bgrp"><span>${g.name}${cont ? ' (continued)' : ''}</span><em>${g.items.length} ${PRO ? (g.items.length === 1 ? 'inclusion' : 'inclusions') : g.items.length === 1 ? 'benefit' : 'benefits'}</em></div>`
  const item = (b, n) =>
    `<div class="bi"><span class="bi__n">${String(n).padStart(2, '0')}</span><div><h4>${b.t}${b.tag ? ` <span class="tag">${b.tag}</span>` : ''}</h4><p>${b.d}</p></div></div>`

  function benefitPages() {
    const probe = document.createElement('div')
    probe.className = 'page'
    probe.style.cssText = 'position:absolute;left:-10000px;top:0;width:480px;height:679px;visibility:hidden'
    document.body.appendChild(probe)
    const out = []
    let flow, pg
    const start = (head) => {
      probe.innerHTML = `<div class="pg"><div class="flow">${head}</div>${foot()}</div>`
      pg = probe.firstChild
      flow = pg.firstChild
    }
    const fits = () => pg.scrollHeight <= pg.clientHeight + 1
    const close = () => out.push(page(`<div class="flow">${flow.innerHTML}</div>`))
    /* add html; if it overflows a page that already has content, move it to a fresh page */
    const add = (html, retry) => {
      const before = flow.innerHTML
      flow.insertAdjacentHTML('beforeend', html)
      if (fits()) return
      flow.innerHTML = before
      close()
      start(headNext)
      flow.insertAdjacentHTML('beforeend', retry || html)
    }
    start(headFirst)
    let n = 0
    GROUPS.forEach((g) => {
      g.items.forEach((b, i) => {
        n += 1
        if (i === 0) add(groupHead(g) + item(b, n), groupHead(g) + item(b, n))
        else add(item(b, n), groupHead(g, true) + item(b, n))
      })
    })
    /* room left on the last page: the corridor map, if it fits */
    const room = pg.clientHeight - pg.scrollHeight
    const before = flow.innerHTML
    flow.insertAdjacentHTML('beforeend', '<div class="ben-img" style="margin-top:4cqw"><img src="/images/presence-map-hubs.jpg" alt=""></div>')
    if (!fits() || room < 0) flow.innerHTML = before
    close()
    probe.remove()
    return out
  }

  const steps = () =>
    page(`
      <p class="eyebrow">How membership works</p>
      <h2 class="h2">From first conversation to your first introduction.</h2>
      <ol class="steps">
        <li><div><b>Request membership</b><span>Tell us about your organisation and goals, and we confirm your membership.</span></div></li>
        <li><div><b>Sign your Membership Agreement</b><span>A short agreement setting out your membership, term and benefits.</span></div></li>
        <li><div><b>Pay your dues</b><span>Invoiced and collected by Northstar Tecq, our billing partner: bank transfer, international wire, UPI or card.</span></div></li>
        <li><div><b>Onboard</b><span>${XCH ? 'Choose your track, India → UAE or UAE → India, and meet your named corridor concierge.' : KEY === 'club' ? 'Your official Club Badge, your verifiable vault and your directory listing.' : 'KYC/KYB, your IBA SafeVault, your verified badge and your member directory profile.'}</span></div></li>
        <li><div><b>${XCH ? 'Start the sprint' : 'Your welcome call'}</b><span>${XCH ? 'Week one of the 12-week launch sprint, with compliance clinics and curated introductions from the start.' : 'Your corridor concierge maps your year and lines up your first introductions and roundtables.'}</span></div></li>
      </ol>`)

  /* a full-bleed picture page, used only to make the page count even so the
     back cover sits on its own */
  const filler = () => `
    <div class="page"><div class="pg fill">
      <img src="/images/corridor-hero-map.jpg" alt="">
      <blockquote>Corridors are long-term programmes, not events.<cite>India Blockchain Alliance</cite></blockquote>
      ${foot()}
    </div></div>`

  const back = () => `
    <div class="page page--back" data-density="hard"><div class="pg price">
      <p class="eyebrow">Your membership investment</p>
      <h2 class="price__tier">${T.name}</h2>
      <p class="price__sub">${PROG} · ${XCH ? '12-week Launch Sprint' : T.sub}</p>
      <div class="price__box">
        <div class="price__amt">${usd(T.price)}<small>/ YEAR</small></div>
        <p class="price__note">Plus applicable taxes. Covers all <b>${COUNT} ${PRO ? 'inclusions' : 'benefits'}</b> in this brochure for a ${XCH ? 'year' : '12-month term'}. <b>Instalment plans available on request.</b> Invoiced and collected by Northstar Tecq, billing partner for the Web3 Corridor.</p>
        <ul class="price__list">${GROUPS.map((g) => `<li>${g.name}<span>${g.items.length}</span></li>`).join('')}</ul>
      </div>
      ${PRO ? `<p class="price__note" style="margin-top:3cqw">${PRO.note}</p>` : ''}
      <div class="ctas">
        <a class="btn btn--red" href="mailto:hello@indiablockchainalliance.org?subject=${encodeURIComponent(T.name + ' membership')}">Request membership</a>
        <a class="btn" href="/connect">Talk to us</a>
      </div>
      <div class="price__foot"><span>hello@indiablockchainalliance.org<br>indiablockchainalliance.org</span><img src="/iba-logo-dark.png" alt="India Blockchain Alliance"></div>
    </div></div>`

  /* book ----------------------------------------------------------- */
  const book = $('#book')
  let flip
  const ready = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    const pages = [cover(), corridor(), glance(), ...(PRO ? [programme()] : []), ...(XCH ? [sprint()] : []), ...benefitPages(), steps()]
    if ((pages.length + 1) % 2) pages.push(filler())
    pages.push(back())
    book.innerHTML = pages.map((p, i) => p.replace('__N__', String(i + 1).padStart(2, '0'))).join('')
    ;[...book.children].forEach((p, i) => {
      if (i > 0 && i < pages.length - 1) p.classList.add(i % 2 ? 'page--left' : 'page--right')
    })
  })

  function open() {
    ready.then(() => {
      if (flip) return
      flip = new St.PageFlip(book, {
        width: 480,
        height: 679,
        size: 'stretch',
        minWidth: 260,
        /* as tall as the window allows, once the header and controls are off */
        maxWidth: Math.max(260, Math.floor((window.innerHeight - 200) * 0.707)),
        minHeight: 368,
        maxHeight: Math.max(368, window.innerHeight - 200),
        showCover: true,
        usePortrait: true,
        maxShadowOpacity: 0.5,
        flippingTime: 900,
        mobileScrollSupport: false,
      })
      flip.loadFromHTML(book.querySelectorAll('.page'))
      const count = $('#count')
      const prev = $('#prev')
      const next = $('#next')
      const total = flip.getPageCount()
      const update = () => {
        const i = flip.getCurrentPageIndex()
        const portrait = flip.getOrientation() === 'portrait'
        const right = !portrait && i > 0 && i < total - 1 ? i + 2 : i + 1
        count.textContent = right !== i + 1 ? `${i + 1}–${right} / ${total}` : `${i + 1} / ${total}`
        prev.disabled = i === 0
        next.disabled = i >= total - (portrait || i === 0 ? 1 : 2)
      }
      flip.on('flip', update)
      flip.on('changeOrientation', update)
      prev.onclick = () => flip.flipPrev()
      next.onclick = () => flip.flipNext()
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') flip.flipNext()
        if (e.key === 'ArrowLeft') flip.flipPrev()
      })
      update()
    })
  }

  /* gate ----------------------------------------------------------- */
  const gate = $('#gate')
  $('#gateTier').textContent = T.name
  $('#gateSub').textContent = `${PROG} · ${XCH ? '12-week Launch Sprint' : T.sub}`
  $('#gateImg').src = XCH ? '/images/presence-map-hubs.jpg' : '/images/corridor-gold.jpg'

  let known = null
  try { known = JSON.parse(localStorage.getItem(STORE) || 'null') } catch (e) {}
  if (known && known.email) {
    gate.hidden = true
    open()
  }

  $('#gateForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const f = e.target
    const err = $('#gateErr')
    const data = Object.fromEntries(new FormData(f).entries())
    data.tier = T.name
    data.consent = !!f.consent.checked
    data.page = location.href
    if (!data.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      err.textContent = 'Please enter your name and a valid email address.'
      return
    }
    const btn = f.querySelector('button')
    btn.disabled = true
    btn.textContent = 'Opening…'
    err.textContent = ''
    let status = 0
    try {
      const r = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      status = r.status
    } catch (x) {}
    if (status === 422) {
      err.textContent = 'Please check your name and email address.'
      btn.disabled = false
      btn.textContent = 'Open the brochure'
      return
    }
    /* if the lead could not be sent (not configured, mail down) the reader
       still gets the brochure; the console says so for whoever is testing */
    if (status !== 200) console.warn('[brochure] lead not delivered, status', status || 'network')
    try { localStorage.setItem(STORE, JSON.stringify({ name: data.name, email: data.email, company: data.company, at: Date.now() })) } catch (x) {}
    gate.hidden = true
    open()
  })
})()
