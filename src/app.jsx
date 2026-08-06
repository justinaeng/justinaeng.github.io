// Root app: view routing, tweaks panel, edit-mode hooks
const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  const initial = window.__TWEAKS || {};
  const [view, setView] = useStateA(() => {
    const saved = localStorage.getItem('jeng.view');
    return saved || 'home';
  });
  const [activeCase, setActiveCase] = useStateA(null);
  const [tweaks, setTweaks] = useStateA({
    accent: initial.accent || '#F7FCBC',
    density: initial.density || 'comfortable',
    hoverReveal: initial.hoverReveal ?? true,
  });
  const [editMode, setEditMode] = useStateA(false);

  // Persist view
  useEffectA(() => { localStorage.setItem('jeng.view', view); }, [view]);

  // Apply accent var to :root
  useEffectA(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks.accent]);

  // Edit-mode protocol
  useEffectA(() => {
    const onMsg = (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persist = (patch) => {
    setTweaks(t => ({ ...t, ...patch }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  const openCase = (cs) => { setActiveCase(cs); window.scrollTo(0, 0); };
  const closeCase = () => { setActiveCase(null); };

  let body;
  if (activeCase) body = <CaseStudyPage cs={activeCase} onBack={closeCase} />;
  else if (view === 'about')  body = <AboutPage />;
  else if (view === 'resume') body = <ResumePage />;
  else                        body = <HomePage onOpen={openCase} />;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 24 }}>
      <Nav view={activeCase ? null : view} setView={(v) => { setActiveCase(null); setView(v); }} />
      {body}
      <Footer />
      {editMode && <TweaksPanel tweaks={tweaks} onChange={persist} />}
    </div>
  );
}

function TweaksPanel({ tweaks, onChange }) {
  const swatches = ['#F7FCBC', '#CCE3FC', '#E0F1E8', '#FFE8D6', '#E8E9EE'];
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 9999,
      width: 260, background: 'var(--bg)', border: '1px solid var(--rule)',
      padding: 16, fontSize: 12,
      boxShadow: '0 12px 32px rgba(45,41,45,.12)',
    }}>
      <div className="mono" style={{
        fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
        color: 'var(--ink-60)', marginBottom: 12,
      }}>// Tweaks</div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>Selection accent</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {swatches.map(c => (
            <button key={c} onClick={() => onChange({ accent: c })}
              style={{
                width: 26, height: 26, border: '1px solid var(--rule)',
                background: c, cursor: 'pointer', padding: 0,
                outline: tweaks.accent === c ? '2px solid var(--ink)' : 'none',
                outlineOffset: 2,
              }} />
          ))}
        </div>
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={tweaks.hoverReveal}
            onChange={e => onChange({ hoverReveal: e.target.checked })}/>
          Reveal summaries on hover
        </label>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
