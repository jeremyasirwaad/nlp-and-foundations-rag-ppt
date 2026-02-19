import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const capabilities = [
  {
    icon: '📖',
    title: 'Understand',
    desc: 'Parse grammar, syntax, and semantic meaning from raw text',
    example: 'Siri understanding "Set an alarm for 7 AM tomorrow"',
    color: 'var(--accent-emerald)',
  },
  {
    icon: '🎯',
    title: 'Interpret',
    desc: 'Resolve ambiguity, detect sentiment, and grasp intent',
    example: 'Detecting a negative product review among thousands',
    color: 'var(--accent-amber)',
  },
  {
    icon: '💬',
    title: 'Respond',
    desc: 'Generate human-like text, translate languages, summarize',
    example: 'ChatGPT drafting an email or Google Translate converting text',
    color: 'var(--accent-sky)',
  },
  {
    icon: '🔍',
    title: 'Extract',
    desc: 'Pull entities, relationships, and structured data from unstructured text',
    example: 'Pulling names, dates, and dollar amounts from legal contracts',
    color: 'var(--accent-rose)',
  },
];

export default function WhatNLPDoes() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        What NLP <span className="neon-text-emerald">Can Do</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Modern NLP systems combine multiple capabilities to process language end-to-end.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {capabilities.map((cap) => (
          <motion.div
            key={cap.title}
            variants={fadeUp}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.5rem',
              borderTop: `3px solid ${cap.color}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ fontSize: '2rem' }}>{cap.icon}</div>
            <h3 style={{ color: cap.color }}>{cap.title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{cap.desc}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>
              e.g. {cap.example}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
