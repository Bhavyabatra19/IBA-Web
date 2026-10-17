/**
 * Initiatives — one band per programme IBA builds and runs.
 *
 * ⚠ LINKS. The source gives most initiatives "Visit Website" and "LinkedIn"
 * buttons with no destination yet. Only real destinations are shown: the
 * India AI Alliance's website, and Red Club and the Corridor's own pages. Add
 * `site` / `linkedin` to an entry below as each address is supplied.
 */

import { PageHero, Section, Bullets, Btn, Prose } from '../../components/Kit'
import { REGIONS_LINE } from '../../data/facts'

const INITIATIVES = [
  {
    id: 'init-tech4good',
    sub: 'Technology in service of outcomes that matter',
    title: 'Tech4Good',
    text: "IBA's impact initiative, applying blockchain and emerging technology to problems where the return is social rather than commercial. Anchors the alliance's SDG alignment.",
    list: [
      'Applies blockchain and Web3 technologies to social-impact problems',
      "Anchors the alliance's alignment with the UN Sustainable Development Goals",
      'Open to partners who want to co-build impact projects',
    ],
    enquiry: 'Tech4Good / Green Chain Protocol',
  },
  {
    id: 'init-green-chain',
    sub: 'Making green finance and governance verifiable',
    title: 'Green Chain Protocol',
    text: 'A blockchain ecosystem focused on ESG, aligned with COP28, showcasing and growing Web3 projects in sustainability.',
    list: [
      'Onboarding for sustainability-focused Web3 projects',
      'Green finance infrastructure',
      'Verifiable reporting and on-chain carbon accounting',
    ],
    enquiry: 'Tech4Good / Green Chain Protocol',
  },
  {
    id: 'init-verifyble',
    sub: 'Data security and digital asset management',
    title: 'Verifyble',
    text: "IBA's platform for data security and digital asset management, helping any organisation or individual secure, verify and manage data and digital assets on-chain.",
    list: [
      'Data security: tamper-evident records that can be verified by anyone you choose to share them with',
      'Digital asset management: issue, hold and manage digital assets in one place',
      'Open to enterprises, governments, institutions and individuals',
    ],
    enquiry: 'Red Club / Verifyble (institution)',
  },
  {
    id: 'init-red-club',
    sub: 'The talent pipeline for Web3 and AI',
    title: 'IBA Red Club',
    text: 'Certified programmes, on-campus labs, live industry projects, internships and placements.',
    list: ['Certified programmes and on-campus labs', 'Live industry projects with mentors', 'Internships and placements'],
    page: { href: '/red-club', label: 'Explore Red Club' },
  },
  {
    id: 'init-web3-corridor',
    sub: 'Global Innovation Corridor Initiative',
    title: 'Web3 Corridor',
    text: 'A global innovation platform connecting ' + REGIONS_LINE + ', designed to accelerate technology transfer, investment, entrepreneurship and ecosystem collaboration across regions.',
    list: [
      'Core dimensions, from Web3 and tokenization to startup investment and women in emerging technologies',
      'The UAE as the activation hub, with India, Africa and Europe as ecosystem partners',
      'Global Innovation Corridor Forum launching at WTC 2026, November, Barcelona',
    ],
    page: { href: '/corridor', label: 'Explore the Corridor' },
  },
  {
    id: 'init-india-ai-alliance',
    sub: 'Details to be added',
    title: 'India AI Alliance',
    text: 'Description of the India AI Alliance to be supplied. More detail on this initiative will be added here.',
    site: 'https://indiaaialliance.org/',
  },
]

export default function Initiatives() {
  return (
    <div>
      <PageHero
        id="initiatives-page"
        eyebrow="IBA Initiatives"
        title="The Programmes We Build and Run"
        lede="Each initiative has its own team, partners and home online. Find the detail and the links here."
        actions={
          <Btn href="/expertise#initiatives" variant="ghost">
            ← Back to Expertise
          </Btn>
        }
      />

      {INITIATIVES.map((it, i) => (
        <Section id={it.id} key={it.id} eyebrow={it.sub} title={it.title} tone={i % 2 ? 'card' : 'plain'}>
          <div className="pk-split">
            <Prose paras={[it.text]} />
            <div className="pk-init" data-rise>
              {it.list && <Bullets items={it.list} />}
              <div className="pk-actions">
                {it.page && (
                  <Btn href={it.page.href}>
                    {it.page.label} <span aria-hidden="true">→</span>
                  </Btn>
                )}
                {it.site && (
                  <Btn href={it.site}>
                    Visit Website <span aria-hidden="true">↗</span>
                  </Btn>
                )}
                {it.enquiry && (
                  <Btn enquiry={it.enquiry} variant={it.page || it.site ? 'ghost' : 'primary'}>
                    Talk to the Team <span aria-hidden="true">→</span>
                  </Btn>
                )}
              </div>
            </div>
          </div>
        </Section>
      ))}
    </div>
  )
}
