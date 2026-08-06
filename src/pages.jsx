// Pages: Home, About, Resume, Case Study detail
const { useState: useStateP, useEffect: useEffectP } = React;

// ─────────────────────────────────────────────────────────────────
// HOME — hero + case study grid
// ─────────────────────────────────────────────────────────────────
function HomePage({ onOpen }) {
  return (
    <main style={{ padding: '0 32px 0' }}>
      {/* Hero frame */}
      <section style={{
        border: '1px solid var(--rule)',
        padding: '136px 160px',
        position: 'relative',
        minHeight: 560,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 20, left: 20,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink-60)',
        }}>// 001 · Portfolio ’26</div>
        <div style={{
          position: 'absolute', top: 20, right: 20,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink-60)',
        }}>Available for senior / staff IC roles →</div>

        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 24 }}>
          Hi, I’m Justina!
        </div>
        <h1 style={{
          margin: 0, fontSize: 56, lineHeight: '72px', fontWeight: 500,
          letterSpacing: -0.8, maxWidth: 1060,
        }}>
          Brooklyn-based product designer who enjoys solving complex
          problems with <span className="serif" style={{ fontWeight: 400 }}>research</span> &
          design thinking.
        </h1>

        <div style={{
          position: 'absolute', bottom: 20, left: 20, right: 20,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink-60)',
        }}>
          <span>10+ yrs · HiBob · Shopify · LeafLink · Amex · Red Antler</span>
          <span>Scroll ↓</span>
        </div>
      </section>

      {/* Index label */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        padding: '48px 0 20px',
      }}>
        <div>
          <div className="mono" style={{
            fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
            color: 'var(--ink-60)', marginBottom: 8,
          }}>// Selected work · 2018 — 2026</div>
        </div>
      </div>

      {/* Uniform case study grid — 3 columns, equal size, shared borders */}
      {(() => {
        const visible = CASES.filter(c => !c.hidden);
        const cols = 3;
        const lastRowStart = Math.floor((visible.length - 1) / cols) * cols;
        return (
          <section style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid var(--rule)',
            marginTop: 8,
          }}>
            {visible.map((cs, i) => (
              <div key={cs.id} style={{
                borderRight: (i % cols !== cols - 1) ? '1px solid var(--rule)' : 'none',
                borderBottom: (i < lastRowStart) ? '1px solid var(--rule)' : 'none',
              }}>
                <CaseCard cs={cs} onOpen={onOpen} size="md" uniform />
              </div>
            ))}
          </section>
        );
      })()}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <main style={{ padding: '0 32px 0' }}>
      <section style={{
        border: '1px solid var(--rule)', padding: '96px 160px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
      }}>
        <div>
          <div className="mono" style={{
            fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
            color: 'var(--ink-60)', marginBottom: 24,
          }}>// About</div>
          <h1 style={{
            margin: 0, fontSize: 48, lineHeight: '60px', fontWeight: 500,
            letterSpacing: -0.6,
          }}>
            I design systems that make <span className="serif">operators</span> look smart.
          </h1>
        </div>
        <div style={{ fontSize: 18, lineHeight: '30px', color: 'var(--ink)' }}>
          <p style={{ margin: '0 0 20px' }}>
            I’m a product designer with 10+ years of experience spanning
            fintech, commerce, and supply chain. I specialize in translating
            complex, regulated workflows into calm, confident product
            experiences.
          </p>
          <p style={{ margin: '0 0 20px' }}>
            My work lives at the seam between research and craft. I lean on
            UXR fundamentals — interviews, contextual inquiry, usability
            studies — to sharpen problem definition before a pixel gets placed.
          </p>
          <p style={{ margin: 0, color: 'var(--ink-60)' }}>
            Currently leading payroll admin experience at HiBob. Previously
            Shopify, LeafLink, Amex, and Red Antler.
          </p>
        </div>
      </section>

      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        marginTop: 0,
      }}>
        {[
          { label: 'Years shipping', v: '10+' },
          { label: 'Industries', v: '5' },
          { label: 'Research studies led', v: '60+' },
          { label: 'Lines of Figma auto-layout', v: '∞' },
        ].map((s, i) => (
          <div key={i} style={{
            border: '1px solid var(--rule)',
            marginLeft: i ? -1 : 0,
            padding: '36px 28px',
            minHeight: 200,
          }}>
            <div className="mono" style={{
              fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
              color: 'var(--ink-60)', marginBottom: 24,
            }}>{String(i+1).padStart(2,'0')}</div>
            <div style={{ fontSize: 48, fontWeight: 500, letterSpacing: -0.6, lineHeight: 1 }}>
              {s.v}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-60)', marginTop: 12 }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// RESUME
// ─────────────────────────────────────────────────────────────────
function ResumePage() {
  return (
    <main style={{ padding: '0 32px 0' }}>
      <section style={{
        border: '1px solid var(--rule)', padding: '64px 80px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                      marginBottom: 56 }}>
          <div>
            <div className="mono" style={{
              fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
              color: 'var(--ink-60)', marginBottom: 12,
            }}>// Résumé · Updated Apr 2026</div>
            <h1 style={{ margin: 0, fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>
              {RESUME.name}
            </h1>
            <p style={{ margin: '16px 0 0', maxWidth: 620, fontSize: 15, lineHeight: '24px' }}>
              {RESUME.bio}
            </p>
          </div>
          <button style={{
            background: 'var(--ink)', color: 'var(--bg)', border: 'none',
            padding: '12px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Download PDF <Arrow /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 72 }}>
          {/* Experience */}
          <div>
            <SectionLabel>// Experience</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {RESUME.experience.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 20 }}>
                  <div className="mono" style={{
                    fontSize: 10, letterSpacing: 0.6, textTransform: 'uppercase',
                    color: 'var(--ink-60)', paddingTop: 4,
                  }}>{e.dates}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{e.company}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-60)', marginBottom: 14 }}>
                      {e.role}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: '22px' }}>{e.blurb}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div>
              <SectionLabel>// Contact</SectionLabel>
              <KV k="Email" v={RESUME.contact.email} />
              <KV k="Phone" v={RESUME.contact.phone} />
              <KV k="Site"  v={RESUME.contact.site} />
              <KV k="Based" v={RESUME.contact.location} />
            </div>
            <div>
              <SectionLabel>// Skills</SectionLabel>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink-60)', marginTop: 4, marginBottom: 4 }}>// Design</div>
              <div style={{ fontSize: 13, marginBottom: 12 }}>{RESUME.skills.design}</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 4 }}>// Research</div>
              <div style={{ fontSize: 13, lineHeight: '20px' }}>{RESUME.skills.research}</div>
            </div>
            <div>
              <SectionLabel>// Education</SectionLabel>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{RESUME.education.school}</div>
              <div style={{ fontSize: 13 }}>{RESUME.education.degree}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-60)' }}>{RESUME.education.minor}</div>
            </div>
            <div>
              <SectionLabel>// OOO</SectionLabel>
              <div style={{ fontSize: 13, lineHeight: '22px' }}>{RESUME.ooo}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mono" style={{
      fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
      color: 'var(--ink-60)', marginBottom: 20, paddingBottom: 8,
      borderBottom: '1px solid var(--rule-soft)',
    }}>{children}</div>
  );
}

function KV({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr',
                  fontSize: 13, lineHeight: '22px' }}>
      <div style={{ color: 'var(--ink-60)' }}>{k}</div>
      <div>{v}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CASE STUDY DETAIL
// ─────────────────────────────────────────────────────────────────
function CaseStudyPage({ cs, onBack }) {
  return (
    <main style={{ padding: '0 32px 0' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', padding: '8px 0', fontFamily: 'inherit',
        fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
        gap: 8, marginBottom: 20,
      }}>
        <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
          <Arrow />
        </span> All work
      </button>

      {/* Cover */}
      <section style={{ border: '1px solid var(--rule)', height: 520, position: 'relative',
                         overflow: 'hidden' }}>
        <CaseArt cs={cs} />
      </section>

      {/* Title block */}
      <section style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
        padding: '72px 0 48px',
      }}>
        <div>
          <div className="mono" style={{
            fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
            color: 'var(--ink-60)', marginBottom: 16,
          }}>// {cs.company} · {cs.dates}</div>
          <h1 style={{ margin: 0, fontSize: 56, lineHeight: '64px', fontWeight: 500,
                        letterSpacing: -0.8 }}>
            {cs.title}
          </h1>
        </div>
        <div>
          <div style={{ fontSize: 18, lineHeight: '30px', marginBottom: 28 }}>
            {cs.summary}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            <MetaCell k="Role"     v={cs.role} />
            <MetaCell k="Duration" v={cs.dates} />
            <MetaCell k="Focus"    v={cs.tags} />
            <MetaCell k="Team"     v="PM, Eng (×4), UXR partner" />
          </div>
        </div>
      </section>

      {/* Process blocks — placeholder structure */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 24 }}>
        {[
          { label: 'Problem', copy: 'A specific friction in the existing workflow created repeated rework for operators. This section would frame the user, the stakes, and what we learned from early research.' },
          { label: 'Approach', copy: 'We ran contextual inquiry with eight operators, mapped the existing flow, and identified three leverage points. Lo-fi prototypes tested the riskiest assumptions first.' },
          { label: 'Outcome', copy: 'Shipped workflow reduced task time by ~60% and cut support tickets by nearly half. Case study writeup, metrics, and artifacts available on request.' },
        ].map((b, i) => (
          <div key={i} style={{
            borderTop: '1px solid var(--rule-soft)',
            borderBottom: i === 2 ? '1px solid var(--rule-soft)' : 'none',
            padding: '48px 0', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48,
          }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink)',
            }}>0{i+1} &nbsp; // {b.label}</div>
            <div style={{
              fontSize: 24, lineHeight: '36px', fontWeight: 400, letterSpacing: -0.2,
              maxWidth: 780,
            }}>{b.copy}</div>
          </div>
        ))}
      </section>

      {/* Placeholder screens */}
      <section style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 48,
      }}>
        {[0,1].map(i => (
          <div key={i} style={{
            aspectRatio: '4 / 3', background: 'var(--rule-soft)',
            position: 'relative', overflow: 'hidden',
            backgroundImage: 'repeating-linear-gradient(135deg, rgba(45,41,45,.03) 0, rgba(45,41,45,.03) 12px, transparent 12px, transparent 24px)',
            border: '1px solid var(--rule-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase',
              color: 'var(--ink-60)',
            }}>[ Screenshot {i+1} · drop artefact here ]</div>
          </div>
        ))}
      </section>

      {/* Next up */}
      <section style={{ marginTop: 96, borderTop: '1px solid var(--rule-soft)', paddingTop: 40 }}>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
          color: 'var(--ink-60)', marginBottom: 16,
        }}>// Next up</div>
        <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: -0.4 }}>
          {CASES[(CASES.findIndex(c => c.id === cs.id) + 1) % CASES.length].title} →
        </div>
      </section>
    </main>
  );
}

function MetaCell({ k, v }) {
  return (
    <div>
      <div className="mono" style={{
        fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
        color: 'var(--ink-60)', marginBottom: 4,
      }}>{k}</div>
      <div style={{ fontSize: 13, lineHeight: '20px' }}>{v}</div>
    </div>
  );
}

Object.assign(window, { HomePage, AboutPage, ResumePage, CaseStudyPage });
