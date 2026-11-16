/* ==================================================================
   Web3 Corridor membership brochure: builds the pages for one tier,
   gates them behind name + email, then opens them as a flip book.

   The page that loads this sets window.BROCHURE to club | premier |
   gold | xchange. Tier data (benefits, matrix, prices, partners) comes
   from tiers.js, a copy of documents/assets/tiers.js.

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

  /* brochure copy, per tier ---------------------------------------- */
  const COPY = {
    club: {
      position: 'Club Class establishes ecosystem access and knowledge: your verified entry into the Web3 Corridor, its people and its programmes.',
      who: 'Founders, early-stage startups and professionals who want verified access to the Web3 Corridor ecosystem, its knowledge and its network.',
      glance: '/images/corridor-expansion.jpg',
      next: 'premier',
    },
    premier: {
      position: 'Premier Class strengthens visibility, business development and commercial readiness, with expert advisors working alongside your team.',
      who: 'Growing startups and SMEs ready to sharpen their go-to-market, raise their profile and prepare for investment across India and the UAE.',
      glance: '/images/corridor-founder.jpg',
      next: 'gold',
    },
    gold: {
      position: 'Gold Class delivers executive-level engagement, institutional positioning and priority growth opportunities in the heart of Dubai.',
      lead: 'Premier Class privileges. Premium Dubai presence. Global Web3 opportunities.',
      who: 'Scale-ups, executives and institutions that want a working presence in Dubai, institutional introductions and a launchpad for tokenization.',
      glance: '/images/corridor-globe-team.jpg',
    },
    xchange: {
      position: 'Gold Xchange is a distinct bilateral market-entry membership, built around a 12-week launch sprint between India and the UAE.',
      who: 'Startups ready for a structured India ↔ UAE launch, in either direction.',
      glance: '/images/corridor-globe-team.jpg',
    },
  }[KEY]

  const PROG = XCH ? 'Indo–UAE Startup Xchange' : 'Web360 Club'
  const COL = { club: 1, premier: 2, gold: 3 }[KEY]
  const included = XCH ? [] : W3C.matrix.filter((r) => r[COL]).map((r) => (r[COL] === true ? r[0] : `${r[0]} <em>(${r[COL]})</em>`))
  const roundtables = XCH ? '' : W3C.matrix[2][COL]

  /* pages ---------------------------------------------------------- */
  const foot = (n) => `<div class="pg__foot"><span><i>■</i> Web3 Corridor · ${T.name}</span><span>${String(n).padStart(2, '0')}</span></div>`

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
        <p class="cover__sub">${T.sub}</p>
        <span class="cover__tag">${T.tagline}</span>
      </div>
      <div class="cover__foot"><span>Membership brochure</span><span>2026–27</span></div>
      <div class="cover__metal metal--${KEY}"></div>
    </div></div>`

  const corridor = (n) => `
    <div class="page"><div class="pg">
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
      </div>
      ${foot(n)}
    </div></div>`

  const glance = (n) => {
    const facts = XCH
      ? [['12', 'week launch sprint'], ['10', 'inclusions'], ['2', 'markets, one programme']]
      : [['5', 'signature benefits'], [String(included.length), 'inclusions in total'], [roundtables.split(' ')[0], 'roundtables a year']]
    return `
    <div class="page"><div class="pg">
      <div class="glance-img"><img src="${COPY.glance}" alt=""><span>${T.name} at a glance</span></div>
      <p class="eyebrow">${T.sub}</p>
      <h2 class="h2">${T.tagline.replace(/•/g, '·')}</h2>
      <p class="lead">${COPY.position}</p>
      ${COPY.lead ? `<p class="body">${COPY.lead}</p>` : ''}
      <div class="facts">${facts.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
      <div class="who"><p class="eyebrow">Designed for</p><p>${COPY.who}</p></div>
      ${T.servicePartners ? `<p class="body" style="margin:0">Service partners: <span style="color:var(--ink)">${T.servicePartners}</span></p>` : ''}
      ${foot(n)}
    </div></div>`
  }

  const benefit = (b, i) => `
    <div class="ben"><div class="ben__n">${String(i + 1).padStart(2, '0')}</div><div><h3>${b.t}</h3><p>${b.d}</p></div></div>`

  const benefitsA = (n) => `
    <div class="page"><div class="pg">
      <p class="eyebrow">Signature benefits</p>
      <h2 class="h2">${T.includes.replace(/:$/, '')}</h2>
      ${T.benefits.slice(0, 3).map(benefit).join('')}
      ${foot(n)}
    </div></div>`

  const benefitsB = (n) => `
    <div class="page"><div class="pg">
      <p class="eyebrow">Signature benefits, continued</p>
      ${T.benefits.slice(3, 5).map((b, i) => benefit(b, i + 3)).join('')}
      <div class="ben-img"><img src="/images/presence-map-hubs.jpg" alt=""></div>
      ${foot(n)}
    </div></div>`

  const checklist = (n) => `
    <div class="page"><div class="pg">
      <p class="eyebrow">Everything included</p>
      <h2 class="h2">${included.length} inclusions with ${T.name}</h2>
      <ul class="check">${included.map((r) => `<li>${r}</li>`).join('')}</ul>
      ${foot(n)}
    </div></div>`

  const sprint = (n) => {
    const b = T.benefits.map((x) => x.t)
    const phases = [
      ['Phase 1', 'Validate', [b[2], b[4], b[3]]],
      ['Phase 2', 'Build', [b[5], b[7], b[6]]],
      ['Phase 3', 'Launch', ['Demo day', 'Soft-landing support', b[0]]],
    ]
    return `
    <div class="page"><div class="pg">
      <p class="eyebrow">The 12-week launch sprint</p>
      <h2 class="h2">Validate, build, launch: one structured route into the other market.</h2>
      <div class="sprint">${phases.map(([w, h, li]) => `<div><span class="wk">${w}</span><b>${h}</b><ul>${li.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
      <p class="eyebrow" style="margin-top:2cqw">Gold Xchange includes</p>
      <ul class="check">${b.map((x) => `<li>${x}</li>`).join('')}</ul>
      ${foot(n)}
    </div></div>`
  }

  const steps = (n) => `
    <div class="page"><div class="pg">
      <p class="eyebrow">How membership works</p>
      <h2 class="h2">From first conversation to your first introduction.</h2>
      <ol class="steps">
        <li><div><b>Request membership</b><span>Tell us about your organisation and goals. We confirm fit and the right tier.</span></div></li>
        <li><div><b>Sign your Membership Agreement</b><span>A short agreement setting out your tier, term and benefits.</span></div></li>
        <li><div><b>Pay your dues</b><span>Invoiced and collected by Northstar Tecq, our billing partner: bank transfer, international wire, UPI or card.</span></div></li>
        <li><div><b>Onboard</b><span>${XCH ? 'Choose your track, India → UAE or UAE → India, and meet your named corridor concierge.' : 'KYC/KYB, your IBA SafeVault, your verified badge and your member directory profile.'}</span></div></li>
        <li><div><b>${XCH ? 'Start the sprint' : 'Your welcome call'}</b><span>${XCH ? 'Week one of the 12-week launch sprint, with compliance clinics and curated introductions from the start.' : 'Your corridor concierge maps your year and lines up your first introductions and roundtables.'}</span></div></li>
      </ol>
      ${XCH ? '' : `<div class="partners">${W3C.partners.map((p) => `<div><b>${p.partner}</b>${p.benefit}</div>`).join('')}</div>`}
      ${foot(n)}
    </div></div>`

  const priceList = XCH
    ? ['All 10 Gold Xchange inclusions', '12-week launch sprint with demo day', 'Named corridor concierge']
    : [`All ${included.length} inclusions in this brochure`, `Service partners: ${T.servicePartners}`, '12-month membership term']

  const nextLink = COPY.next
    ? `<p class="price__note" style="margin-top:4cqw">Looking for more? <a href="/brochures/${COPY.next}-class/" style="color:#fff">See the ${W3C.tiers[COPY.next].name} brochure →</a></p>`
    : ''

  const back = () => `
    <div class="page page--back" data-density="hard"><div class="pg price">
      <p class="eyebrow">Membership investment</p>
      <h2 class="price__tier">${T.name}</h2>
      <p class="price__sub">${XCH ? T.sub : PROG + ' · ' + T.sub}</p>
      <div class="price__box">
        <div class="price__amt">${usd(T.price)}<small>/ YEAR</small></div>
        <p class="price__note">Plus applicable taxes. <b>Instalment plans available on request.</b> Invoiced and collected by Northstar Tecq, billing partner for the Web3 Corridor.</p>
        <ul class="price__list">${priceList.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
      <div class="ctas">
        <a class="btn btn--red" href="mailto:hello@indiablockchainalliance.org?subject=${encodeURIComponent(T.name + ' membership')}">Request membership</a>
        <a class="btn" href="/connect">Talk to us</a>
      </div>
      ${nextLink}
      <div class="price__foot"><span>hello@indiablockchainalliance.org<br>indiablockchainalliance.org</span><img src="/iba-logo-dark.png" alt="India Blockchain Alliance"></div>
    </div></div>`

  const pages = XCH
    ? [cover(), corridor(2), glance(3), sprint(4), steps(5), back()]
    : [cover(), corridor(2), glance(3), benefitsA(4), benefitsB(5), checklist(6), steps(7), back()]

  /* book ----------------------------------------------------------- */
  const book = $('#book')
  book.innerHTML = pages.join('')
  ;[...book.children].forEach((p, i) => {
    if (i > 0 && i < pages.length - 1) p.classList.add(i % 2 ? 'page--left' : 'page--right')
  })

  let flip
  function open() {
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
  }

  /* gate ----------------------------------------------------------- */
  const gate = $('#gate')
  $('#gateTier').textContent = T.name
  $('#gateSub').textContent = XCH ? T.sub : `${PROG} · ${T.sub}`
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
