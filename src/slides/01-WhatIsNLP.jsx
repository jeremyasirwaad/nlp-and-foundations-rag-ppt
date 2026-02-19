import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function WhatIsNLP() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        What is <span className="neon-text-emerald">NLP</span>?
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}>
        <strong>Natural Language Processing</strong> is the branch of AI that gives computers the ability to understand, interpret, and generate human language.
      </motion.p>
      <motion.div
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          borderLeft: '4px solid var(--accent-emerald)',
        }}
      >
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
          "NLP is the bridge between how humans communicate and how computers process information."
        </p>
      </motion.div>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { icon: '💬', label: 'Human Language', desc: 'Ambiguous, contextual, nuanced', color: 'var(--accent-amber)' },
          { icon: '🔄', label: 'NLP', desc: 'Translates between the two worlds', color: 'var(--accent-emerald)' },
          { icon: '💻', label: 'Computer Logic', desc: 'Structured, precise, numerical', color: 'var(--accent-sky)' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              flex: '1 1 180px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.2rem',
              borderTop: `3px solid ${item.color}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
            <h3 style={{ color: item.color, marginBottom: '0.4rem' }}>{item.label}</h3>
            <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
