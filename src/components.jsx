// Small, reusable UI atoms for the portfolio
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────
// Placeholder art for case study thumbnails
// ─────────────────────────────────────────────────────────────────
function CaseArt({ cs }) {
  const base = {
    position: 'absolute', inset: 0, overflow: 'hidden',
    background: cs.accent,
  };
  if (cs.artStyle === 'shopify') {
    return (
      <div style={base}>
        <img src={window.IMG["shopify-po"]} alt=""
          style={{ position: 'absolute', left: '50%', top: '50%',
                   transform: 'translate(-50%,-50%)', width: '62%', opacity: 0.95 }} />
      </div>
    );
  }
  if (cs.artStyle === 'leaflink') {
    return (
      <div style={{ ...base, background: '#01264A' }}>
        <img src={window.IMG["leaflink"]} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    );
  }
  if (cs.artStyle === 'llmetrc') {
    return (
      <div style={base}>
        <div style={{ position: 'absolute', left: '50%', top: '50%',
                      transform: 'translate(-50%,-50%)',
                      display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={window.IMG["ll-logo"]} alt="" style={{ height: 40 }} />
          <div style={{ width: 44, height: 1, background: '#838383' }} />
          <img src={window.IMG["metrc"]} alt="" style={{ height: 36 }} />
        </div>
      </div>
    );
  }
  if (cs.artStyle === 'prodcreation') {
    return (
      <div style={{ ...base, background: cs.accent }}>
        <img src={window.IMG["product-details"]} alt=""
          style={{ position: 'absolute', right: 16, top: 14, width: '42%',
                   borderRadius: 2, boxShadow: '0 3px 12px rgba(38,38,38,.1), 0 3px 3px rgba(38,38,38,.05)' }} />
        <img src={window.IMG["add-product-modal"]} alt=""
          style={{ position: 'absolute', left: 20, top: 14, width: '40%',
                   borderRadius: 2, boxShadow: '0 3px 12px rgba(38,38,38,.1), 0 3px 3px rgba(38,38,38,.05)' }} />
      </div>
    );
  }
  if (cs.artStyle === 'banco') {
    return (
      <div style={{ ...base, background: '#FBFDF9' }}>
        <div style={{ position: 'absolute', left: '50%', top: 14,
                      transform: 'translateX(-50%)',
                      display: 'flex', gap: 10 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 70, height: 142, borderRadius: 10,
              background: `url(${window.IMG["banco-screen"]}) center/cover no-repeat`,
              boxShadow: '0 3px 12px rgba(38,38,38,.1)',
              transform: `translateY(${i%2 ? 6 : 0}px)`,
            }} />
          ))}
        </div>
      </div>
    );
  }
  if (cs.artStyle === 'logo' || cs.artStyle === 'amex' || cs.artStyle === 'redantler') {
    // Simple monogrammed tile
    const label = cs.artStyle === 'logo' ? 'HiBob'
                : cs.artStyle === 'amex' ? 'Amex'
                : 'Red Antler';
    return (
      <div style={{ ...base, display: 'flex', alignItems: 'center',
                    justifyContent: 'center' }}>
        <div style={{
          fontWeight: 700, fontSize: 32, letterSpacing: -0.4,
          color: '#2D292D',
        }}>{label}</div>
      </div>
    );
  }
  return <div style={base} />;
}

// ─────────────────────────────────────────────────────────────────
// Metadata label block at bottom of each case study card
// ─────────────────────────────────────────────────────────────────
function MetaBlock({ cs }) {
  return (
    <div style={{
      padding: '10px 16px 10px 16px',
      background: 'var(--bg)',
      borderTop: '1px solid var(--rule)',
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--ink)' }}>
        {cs.title}
      </div>
      <div className="mono" style={{
        fontSize: 10, fontWeight: 500, letterSpacing: 0.4,
        textTransform: 'uppercase', color: 'var(--ink)',
      }}>
        {cs.dates} &nbsp;·&nbsp; {cs.tags}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Case study card (grid variant)
// ─────────────────────────────────────────────────────────────────
function CaseCard({ cs, onOpen, size = 'sm', uniform = false }) {
  const [hover, setHover] = useState(false);
  const canOpen = cs.link !== false;

  const dims = {
    sm: { height: 276 },
    md: { height: 340 },
    lg: { height: 420 },
  }[size];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => canOpen && onOpen(cs)}
      style={{
        position: 'relative',
        border: uniform ? 'none' : '1px solid var(--rule)',
        height: dims.height,
        cursor: canOpen ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg)',
        transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s',
        transform: hover && canOpen ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover && canOpen ? '0 8px 24px rgba(45,41,45,.08)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <CaseArt cs={cs} />
        {/* Hover overlay w/ summary */}
        {canOpen && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(45,41,45,0.92)',
            color: 'var(--bg)',
            padding: '24px 28px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            opacity: hover ? 1 : 0,
            transition: 'opacity .3s ease',
            pointerEvents: hover ? 'auto' : 'none',
          }}>
            <div className="mono" style={{
              fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
              opacity: 0.72,
            }}>// {cs.company}</div>
            <div>
              <div style={{
                fontSize: 15, lineHeight: '22px', fontWeight: 400,
                marginBottom: 18, maxWidth: 380,
              }}>{cs.summary}</div>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                paddingBottom: 2, borderBottom: '1px solid currentColor',
              }}>
                Read case study <Arrow />
              </div>
            </div>
          </div>
        )}
      </div>
      <MetaBlock cs={cs} />
    </div>
  );
}

function Arrow({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Top nav
// ─────────────────────────────────────────────────────────────────
function Nav({ view, setView }) {
  const item = (id, label) => (
    <button
      onClick={() => setView(id)}
      style={{
        background: 'none', border: 'none', padding: '4px 0',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
        color: 'var(--ink)', cursor: 'pointer',
        borderBottom: view === id ? '1px solid var(--ink)' : '1px solid transparent',
        letterSpacing: 0,
      }}>
      {label}
    </button>
  );
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px',
    }}>
      <button
        onClick={() => setView('home')}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10,
        }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)',
          color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, letterSpacing: 0,
        }}>J</div>
        <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: -0.1 }}>
          Justina Eng
        </div>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: 0.6, textTransform: 'uppercase',
          color: 'var(--ink-60)', paddingLeft: 10, borderLeft: '1px solid var(--rule-soft)',
          marginLeft: 4,
        }}>Product Designer · Brooklyn, NY</div>
      </button>
      <div style={{ display: 'flex', gap: 28 }}>
        {item('home', 'Work')}
        {item('about', 'About')}
        {item('resume', 'Résumé')}
        <a href="mailto:justina.eng@gmail.com"
           style={{ textDecoration: 'none', fontSize: 13, fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          Contact <Arrow />
        </a>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '64px 32px 40px', borderTop: '1px solid var(--rule-soft)',
      marginTop: 96,
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48,
    }}>
      <div>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
          color: 'var(--ink-60)', marginBottom: 14,
        }}>// Say hi</div>
        <div style={{ fontSize: 32, fontWeight: 500, lineHeight: '40px', letterSpacing: -0.4 }}>
          justina.eng<br/>@gmail.com
        </div>
      </div>
      <div>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
          color: 'var(--ink-60)', marginBottom: 14,
        }}>// Elsewhere</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, lineHeight: '28px' }}>
          <li><a href="#" style={{textDecoration:'none', borderBottom:'1px solid var(--ink)', paddingBottom: 1}}>LinkedIn</a></li>
          <li><a href="#" style={{textDecoration:'none', borderBottom:'1px solid var(--ink)', paddingBottom: 1}}>Read.cv</a></li>
          <li><a href="#" style={{textDecoration:'none', borderBottom:'1px solid var(--ink)', paddingBottom: 1}}>Are.na</a></li>
        </ul>
      </div>
      <div>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
          color: 'var(--ink-60)', marginBottom: 14,
        }}>// Colophon</div>
        <div style={{ fontSize: 13, lineHeight: '20px', color: 'var(--ink-60)', maxWidth: 280 }}>
          Set in Maison Neue. Built from scratch in the open — designed to
          evolve as the projects do. © {new Date().getFullYear()} Justina Eng.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CaseCard, CaseArt, MetaBlock, Nav, Footer, Arrow });
