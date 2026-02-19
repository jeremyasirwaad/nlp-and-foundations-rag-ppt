import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const rows = [
  { aspect: 'Knowledge Source', rag: 'External documents at query time', ft: 'Baked into model weights' },
  { aspect: 'Data Freshness', rag: 'Always up-to-date (live retrieval)', ft: 'Frozen at training time' },
  { aspect: 'Cost', rag: 'Embedding + vector DB costs', ft: 'GPU training costs' },
  { aspect: 'Hallucination', rag: 'Reduced (grounded in sources)', ft: 'Still possible' },
  { aspect: 'Setup Time', rag: 'Hours — index your docs', ft: 'Days/weeks — curate data, train' },
  { aspect: 'Best For', rag: 'Knowledge-heavy Q&A, search', ft: 'Style, tone, domain behavior' },
];

export default function RAGvsFinetuning() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="neon-text-emerald">RAG</span> vs <span className="neon-text-violet">Fine-tuning</span>
      </motion.h2>
      <motion.div variants={fadeUp} style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
        }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.8rem 1rem', borderBottom: '2px solid var(--bg-elevated)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Aspect</th>
              <th style={{ textAlign: 'left', padding: '0.8rem 1rem', borderBottom: '2px solid var(--accent-emerald)', color: 'var(--accent-emerald)', fontWeight: 600 }}>RAG</th>
              <th style={{ textAlign: 'left', padding: '0.8rem 1rem', borderBottom: '2px solid var(--accent-violet)', color: 'var(--accent-violet)', fontWeight: 600 }}>Fine-tuning</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.aspect}>
                <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-primary)', fontWeight: 500 }}>{row.aspect}</td>
                <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{row.rag}</td>
                <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{row.ft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
        They're complementary — many production systems combine both approaches.
      </motion.p>
    </motion.div>
  );
}
