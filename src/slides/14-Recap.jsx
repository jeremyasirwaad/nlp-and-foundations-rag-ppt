import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const takeaways = [
  { icon: '💬', text: 'NLP bridges the gap between human language and computer processing', color: 'var(--accent-emerald)' },
  { icon: '🔢', text: 'Embeddings turn words into vectors where meaning is measurable', color: 'var(--accent-violet)' },
  { icon: '📐', text: 'Vector arithmetic reveals deep semantic relationships in language', color: 'var(--accent-amber)' },
  { icon: '🗄️', text: 'Vector databases enable fast similarity search at scale', color: 'var(--accent-sky)' },
  { icon: '📖', text: 'RAG grounds LLM answers in real documents — reducing hallucination', color: 'var(--accent-rose)' },
  { icon: '🔗', text: 'RAG + fine-tuning are complementary strategies for production AI', color: 'var(--accent-teal)' },
];

export default function Recap() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Key <span className="neon-text-emerald">Takeaways</span>
      </motion.h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {takeaways.map((item) => (
          <motion.div
            key={item.text}
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '1rem 1.5rem',
              borderLeft: `3px solid ${item.color}`,
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
