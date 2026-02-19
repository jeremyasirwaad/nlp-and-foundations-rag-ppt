import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const steps = [
  { num: '1', title: 'Query', desc: 'User asks a question in natural language', icon: '❓', color: 'var(--accent-sky)' },
  { num: '2', title: 'Embed', desc: 'Convert the query into a vector embedding', icon: '🔢', color: 'var(--accent-violet)' },
  { num: '3', title: 'Search', desc: 'Find the most similar vectors in the database', icon: '🔍', color: 'var(--accent-emerald)' },
  { num: '4', title: 'Retrieve', desc: 'Fetch the original documents for top matches', icon: '📄', color: 'var(--accent-amber)' },
  { num: '5', title: 'Augment', desc: 'Inject retrieved context into the LLM prompt', icon: '💉', color: 'var(--accent-rose)' },
  { num: '6', title: 'Generate', desc: 'LLM produces a grounded answer with sources', icon: '✨', color: 'var(--accent-teal)' },
];

export default function RAGPipeline() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The RAG <span className="neon-text-teal">Pipeline</span>
      </motion.h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={fadeUp}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '1.2rem',
              borderTop: `3px solid ${step.color}`,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{step.icon}</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              marginBottom: '0.2rem',
            }}>
              Step {step.num}
            </div>
            <h3 style={{ color: step.color, fontSize: '1rem', marginBottom: '0.3rem' }}>{step.title}</h3>
            <p style={{ fontSize: '0.8rem' }}>{step.desc}</p>
            {i < steps.length - 1 && (
              <span style={{
                position: 'absolute',
                right: '-0.6rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                zIndex: 1,
              }}>
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
