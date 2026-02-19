import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function WhatIsRAG() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        What is <span className="neon-text-emerald">RAG</span>?
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}>
        <strong>Retrieval-Augmented Generation</strong> — giving LLMs access to external knowledge at query time instead of relying solely on training data.
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{
          flex: '1 1 260px',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.5rem',
          borderTop: '3px solid var(--accent-rose)',
        }}>
          <h3 style={{ color: 'var(--accent-rose)', marginBottom: '0.75rem' }}>📕 Closed-Book Exam</h3>
          <p style={{ fontSize: '0.95rem' }}>
            A standard LLM answering from memory alone — limited to training data, can hallucinate, knowledge gets stale.
          </p>
        </div>
        <div style={{
          flex: '1 1 260px',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.5rem',
          borderTop: '3px solid var(--accent-emerald)',
        }}>
          <h3 style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>📖 Open-Book Exam</h3>
          <p style={{ fontSize: '0.95rem' }}>
            An LLM with RAG — retrieves relevant documents first, then generates grounded answers with citations.
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.2rem 1.5rem',
          borderLeft: '4px solid var(--accent-amber)',
        }}
      >
        <p style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
          💡 RAG reduces hallucinations, keeps answers current, and lets you bring <strong>your own data</strong> without retraining the model.
        </p>
      </motion.div>
    </motion.div>
  );
}
