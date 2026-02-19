import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const eras = [
  {
    era: '1950s–1990s',
    title: 'Rule-Based',
    desc: 'Hand-crafted grammar rules, regex patterns, expert systems',
    example: 'ELIZA chatbot, early spell checkers, phone tree IVR systems',
    icon: '📏',
    color: 'var(--accent-amber)',
  },
  {
    era: '1990s–2010s',
    title: 'Statistical',
    desc: 'Probabilistic models, n-grams, TF-IDF, Naive Bayes, HMMs',
    example: 'Email spam filters, early Google Search ranking, autocomplete',
    icon: '📊',
    color: 'var(--accent-sky)',
  },
  {
    era: '2010s–2017',
    title: 'Deep Learning',
    desc: 'Word2Vec, RNNs, LSTMs — neural networks learn representations',
    example: 'Google Translate (neural), smart reply in Gmail, Alexa',
    icon: '🧠',
    color: 'var(--accent-violet)',
  },
  {
    era: '2017–Present',
    title: 'Transformers',
    desc: 'Attention is all you need — BERT, GPT, and the modern LLM era',
    example: 'ChatGPT, Claude, Gemini, GitHub Copilot, real-time translation',
    icon: '⚡',
    color: 'var(--accent-emerald)',
  },
];

export default function NLPEvolution() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The <span className="neon-text-sky">Evolution</span> of NLP
      </motion.h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {eras.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              borderLeft: `4px solid ${item.color}`,
              position: 'relative',
            }}
          >
            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem' }}>
                <h3 style={{ color: item.color, margin: 0 }}>{item.title}</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {item.era}
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0, marginTop: '0.25rem' }}>
                e.g. {item.example}
              </p>
            </div>
            {i < eras.length - 1 && (
              <div style={{
                position: 'absolute',
                bottom: '-0.75rem',
                left: '2.5rem',
                color: 'var(--text-muted)',
                fontSize: '1rem',
                zIndex: 1,
              }}>
                ↓
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
