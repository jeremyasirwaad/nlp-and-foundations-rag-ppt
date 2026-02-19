import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const properties = [
  {
    icon: '🔗',
    title: 'Semantic Similarity',
    desc: 'Words with similar meanings cluster together in vector space, enabling search beyond exact keyword matches',
    color: 'var(--accent-emerald)',
  },
  {
    icon: '🌐',
    title: 'Contextual Awareness',
    desc: 'Modern embeddings capture how a word\'s meaning changes in different contexts — "bank" in finance vs. nature',
    color: 'var(--accent-sky)',
  },
  {
    icon: '📐',
    title: 'Analogical Relationships',
    desc: 'Vector arithmetic reveals relationships: king - man + woman ≈ queen, Paris - France + Japan ≈ Tokyo',
    color: 'var(--accent-amber)',
  },
  {
    icon: '🔄',
    title: 'Transfer Learning',
    desc: 'Pre-trained embeddings carry knowledge that transfers to new tasks — powering RAG, classification, and more',
    color: 'var(--accent-violet)',
  },
];

export default function WhyEmbeddingsMatter() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Why Embeddings <span className="neon-text-teal">Matter</span>
      </motion.h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {properties.map((prop) => (
          <motion.div
            key={prop.title}
            variants={fadeUp}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.5rem',
              borderTop: `3px solid ${prop.color}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ fontSize: '2rem' }}>{prop.icon}</div>
            <h3 style={{ color: prop.color }}>{prop.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{prop.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
