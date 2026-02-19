import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CosineSimilarity() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        How <span className="neon-text-amber">Cosine Similarity</span> Works
      </motion.h2>

      <motion.p variants={fadeUp}>
        Cosine similarity measures the <strong>angle</strong> between two vectors — not their magnitude. Two vectors pointing in the same direction are similar, regardless of length.
      </motion.p>

      {/* Formula */}
      <motion.div
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          textAlign: 'center',
          borderTop: '3px solid var(--accent-amber)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'var(--text-primary)',
          lineHeight: 2.2,
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--accent-amber)' }}>cos(A, B)</span>
            <span style={{ color: 'var(--text-muted)' }}> = </span>
            <span style={{ color: 'var(--accent-emerald)' }}>A · B</span>
            <span style={{ color: 'var(--text-muted)' }}> / </span>
            <span style={{ color: 'var(--accent-sky)' }}>‖A‖ × ‖B‖</span>
          </div>
          <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent-emerald)' }}>dot product</span>
            {' / '}
            <span style={{ color: 'var(--accent-sky)' }}>product of magnitudes</span>
          </div>
        </div>
      </motion.div>

      {/* Worked example */}
      <motion.div
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.2rem 1.5rem',
          borderLeft: '4px solid var(--accent-emerald)',
        }}
      >
        <h3 style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem', fontSize: '1rem' }}>
          Worked Example
        </h3>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
        }}>
          <div>
            A = <span style={{ color: 'var(--accent-amber)' }}>"king"</span>  → [0.82, 0.55, 0.12]
          </div>
          <div>
            B = <span style={{ color: 'var(--accent-amber)' }}>"queen"</span> → [0.78, 0.52, 0.18]
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-emerald)' }}>A · B</span> = (0.82×0.78) + (0.55×0.52) + (0.12×0.18) = <span style={{ color: 'var(--text-primary)' }}>0.947</span>
          </div>
          <div>
            <span style={{ color: 'var(--accent-sky)' }}>‖A‖</span> = √(0.82² + 0.55² + 0.12²) = <span style={{ color: 'var(--text-primary)' }}>0.995</span>
          </div>
          <div>
            <span style={{ color: 'var(--accent-sky)' }}>‖B‖</span> = √(0.78² + 0.52² + 0.18²) = <span style={{ color: 'var(--text-primary)' }}>0.967</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-amber)' }}>cos(A, B)</span> = 0.947 / (0.995 × 0.967) = <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '1rem' }}>0.984</span>
            <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>→ Very similar!</span>
          </div>
        </div>
      </motion.div>

      {/* Scale reference */}
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { range: '0.85 – 1.0', label: 'Very Similar', color: '#10b981', desc: 'Same category or synonyms' },
          { range: '0.5 – 0.85', label: 'Related', color: '#f59e0b', desc: 'Shared context or domain' },
          { range: '0.0 – 0.5', label: 'Unrelated', color: '#f43f5e', desc: 'Different meanings entirely' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              flex: '1 1 160px',
              background: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '0.8rem 1rem',
              borderTop: `3px solid ${item.color}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: item.color, fontWeight: 700 }}>
              {item.range}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0.2rem 0' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
