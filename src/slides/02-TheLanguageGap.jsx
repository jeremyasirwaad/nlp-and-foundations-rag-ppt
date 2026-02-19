import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TheLanguageGap() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The <span className="neon-text-amber">Language Gap</span>
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}>
        Imagine telling a friend: <em>"The bank was steep, so I sat by the river bank."</em>
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div
          style={{
            flex: '1 1 280px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '1.5rem',
            borderTop: '3px solid var(--accent-emerald)',
          }}
        >
          <h3 style={{ color: 'var(--accent-emerald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🧠 Human Interpretation
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <p style={{ fontSize: '0.95rem' }}>✓ Understands "bank" has two meanings from context</p>
            <p style={{ fontSize: '0.95rem' }}>✓ Grasps the spatial relationship</p>
            <p style={{ fontSize: '0.95rem' }}>✓ Infers the scene — outdoors, nature, relaxation</p>
            <p style={{ fontSize: '0.95rem' }}>✓ Feels the implied mood</p>
          </div>
        </div>
        <div
          style={{
            flex: '1 1 280px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '1.5rem',
            borderTop: '3px solid var(--accent-rose)',
          }}
        >
          <h3 style={{ color: 'var(--accent-rose)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💻 Naive Computer
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <p style={{ fontSize: '0.95rem' }}>✗ Sees "bank" as identical strings</p>
            <p style={{ fontSize: '0.95rem' }}>✗ No concept of physical space</p>
            <p style={{ fontSize: '0.95rem' }}>✗ Cannot infer unstated information</p>
            <p style={{ fontSize: '0.95rem' }}>✗ No emotional understanding</p>
          </div>
        </div>
      </motion.div>
      <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
        NLP exists to close this gap — teaching machines to understand language the way we do.
      </motion.p>
    </motion.div>
  );
}
