import { useCallback, useState, type ReactNode } from 'react'
import Bug from './Bug'
import Carousel from './Carousel'
import Loader from './Loader'
import { approach, contact, roles } from './content'
import { projects } from './projects'

const nav = [
  ['Work', '#work'],
  ['Approach', '#approach'],
  ['Experience', '#experience'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

const label = 'font-label text-[0.7rem] uppercase tracking-[0.08em]'

function Head({ id, title, tag }: { id: string; title: string; tag: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-ink pb-4">
      <h2 id={id} className="font-display text-4xl leading-none sm:text-5xl">{title}</h2>
      <p className={`${label} pb-1 text-right text-muted`}>{tag}</p>
    </div>
  )
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} id={id} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      {children}
    </section>
  )
}

function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`tag-in absolute z-10 flex items-center gap-2 border border-ink bg-plate px-2.5 py-1.5 ${label} ${className}`}>
      <span aria-hidden className="size-2 rounded-full bg-pin ring-1 ring-ink" />
      {children}
    </span>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onReady = useCallback(() => setLoaded(true), [])
  return (
    <>
      <Loader done={loaded} />
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-foam">
        Skip to work
      </a>
      <header className="sticky top-0 z-40 border-b border-rule bg-foam/90">
        <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
          <a href="#top" className="hidden font-display text-lg sm:block">Umang Sharma</a>
          <ul className="flex w-full justify-between gap-3 text-[0.8rem] sm:w-auto sm:gap-7 sm:text-sm">
            {nav.map(([n, h]) => (
              <li key={h}><a href={h} className="py-2 hover:underline">{n}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top">
        <section aria-label="Introduction" className="relative overflow-hidden border-b border-rule lg:min-h-[calc(100svh-3.25rem)]">
          <div className="relative h-[60svh] min-h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[72%]">
            <div className="feather absolute inset-0">
              <Bug onReady={onReady} />
            </div>
            <Tag className="left-4 top-4 [animation-delay:0.3s] lg:left-[30%]">Specimen: Bug</Tag>
            <Tag className="right-4 top-4 [animation-delay:0.5s] lg:right-8">Severity: High</Tag>
            <Tag className="bottom-14 left-4 [animation-delay:0.7s] lg:left-[30%]">Status: Open</Tag>
            <Tag className="bottom-14 right-4 hidden [animation-delay:0.9s] sm:flex lg:right-8">Found by: U. Sharma</Tag>
            <p className={`${label} pointer-events-none absolute inset-x-0 bottom-3 hidden text-center text-muted lg:block`}>Drag to inspect</p>
          </div>

          <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl px-4 py-8 sm:px-8 lg:absolute lg:inset-x-0 lg:inset-y-0 lg:items-center lg:py-0">
            <div className="pointer-events-auto flex flex-col gap-6 lg:max-w-[26rem]">
              <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-balance">Umang <span className="text-pin">Sharma</span></h1>
              <p className="text-xl font-medium sm:text-2xl">QA Engineer, ISTQB® Certified</p>
              <p className="max-w-[34ch] text-lg leading-snug text-muted sm:text-xl">
                I find the bugs before your users do. <span className="whitespace-nowrap font-medium text-pin-text">5+ years</span> testing web, mobile and AI-enabled products, from the first user story to release sign-off.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${contact.email}`} className="bg-ink px-5 py-3 text-sm font-medium text-foam hover:bg-pin hover:text-onpin">Email me</a>
                <a href={contact.cv} target="_blank" rel="noreferrer" className="border border-ink px-5 py-3 text-sm font-medium hover:bg-plate">Download CV</a>
                <a href={contact.phoneHref} className={`${label} px-1 py-3 text-muted underline`}>{contact.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <Section id="work">
          <Head id="work-h" title="Work" tag="Case files" />
          <p className="mt-6 max-w-[60ch] text-muted">
            Live products I have tested. Each carousel shows public pages only. To add a project, edit <span className={label}>src/projects.ts</span>.
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {projects.map((p) => (
              <article key={p.id} aria-labelledby={`${p.id}-t`} className="flex flex-col gap-4">
                <Carousel shots={p.shots} name={p.title} />
                <div>
                  <h3 id={`${p.id}-t`} className="font-display text-2xl leading-tight">{p.title}</h3>
                  <p className={`${label} mt-1 text-muted`}>{p.kind}</p>
                </div>
                <p className="text-muted">{p.summary}</p>
                {p.scope && <p><strong className="font-medium">What I tested. </strong>{p.scope}</p>}
                {p.tools && (
                  <ul className="flex flex-wrap gap-2" aria-label="Tools">
                    {p.tools.map((t) => <li key={t} className={`border border-rule px-2 py-1 ${label} normal-case tracking-normal`}>{t}</li>)}
                  </ul>
                )}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="w-fit text-sm underline">Visit {new URL(p.url).hostname.replace('www.', '')}</a>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="approach">
          <Head id="approach-h" title="Approach" tag="Expected behaviour" />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((g) => (
              <div key={g.group} className="border-t border-ink pt-4">
                <h3 className={`${label} mb-4`}>{g.group}</h3>
                <ul className="space-y-2 text-[0.95rem] leading-snug">
                  {g.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience">
          <Head id="experience-h" title="Experience" tag="Steps to reproduce" />
          <ol className="mt-4">
            {roles.map((r) => (
              <li key={r.when} className="grid gap-3 border-b border-rule py-8 md:grid-cols-[13rem_1fr] md:gap-10">
                <p className={`${label} pt-1.5 text-muted`}>{r.when}</p>
                <div>
                  <h3 className="font-display text-2xl leading-tight">{r.title}</h3>
                  <p className="mb-3 text-muted">{r.org}</p>
                  <ul className="max-w-[68ch] list-disc space-y-1.5 pl-5 marker:text-pin-text">
                    {r.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="about">
          <Head id="about-h" title="About" tag="Actual result" />
          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-[60ch] text-lg leading-relaxed">
              I am a QA engineer who likes being the last careful pair of eyes before a release. I read requirements closely, design tests around what could go wrong, and report defects so a developer can reproduce them in one go. Lately that includes AI-enabled features, where the output changes with the input and the test has to be smarter than a fixed expected value.
            </p>
            <dl className="space-y-6">
              <div className="border border-ink bg-plate p-5">
                <dt className={`${label} text-muted`}>Certification</dt>
                <dd className="mt-1 font-display text-xl">ISTQB® Certified, Software Testing</dd>
              </div>
              <div className="border border-ink bg-plate p-5">
                <dt className={`${label} text-muted`}>Education</dt>
                <dd className="mt-1 font-display text-xl">B.Tech, Computer Science</dd>
                <dd className="text-muted">Echelon Institute of Technology, Faridabad, 2019</dd>
              </div>
            </dl>
          </div>
        </Section>

        <section id="contact" aria-labelledby="contact-h" className="on-pin bg-pin text-onpin">
          <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
            <h2 id="contact-h" className="font-display text-5xl leading-none text-balance sm:text-7xl">Found something worth testing?</h2>
            <a href={`mailto:${contact.email}`} className="mt-10 block w-fit break-all font-display text-2xl underline decoration-2 sm:text-4xl">
              {contact.email}
            </a>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-lg">
              <li><a href={contact.phoneHref} className="underline">{contact.phone}</a></li>
              <li><a href={contact.linkedin} target="_blank" rel="noreferrer" className="underline">LinkedIn</a></li>
              <li><a href={contact.cv} target="_blank" rel="noreferrer" className="underline">Download CV</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:px-8">
        <p>
          3D model “
          <a className="underline" href="https://sketchfab.com/3d-models/bug-199e4a1ec2be46a48351e6a95ead7085" target="_blank" rel="noreferrer nofollow">Bug</a>
          ” by{' '}
          <a className="underline" href="https://sketchfab.com/vitalysh" target="_blank" rel="noreferrer nofollow">vitalysh</a> on{' '}
          <a className="underline" href="https://sketchfab.com" target="_blank" rel="noreferrer nofollow">Sketchfab</a>
        </p>
        <a href="#top" className="underline">Back to top</a>
      </footer>
    </>
  )
}
