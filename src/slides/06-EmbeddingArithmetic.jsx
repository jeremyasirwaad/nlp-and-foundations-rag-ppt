import { motion } from 'framer-motion';
import EmbeddingExplorer from '../interactive/EmbeddingExplorer';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EmbeddingArithmetic() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Embedding <span className="neon-text-amber">Arithmetic</span>
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: '1rem' }}>
        Embeddings capture relationships so well that you can do <strong>math with meaning</strong>. Click clusters to explore, then watch the vector arithmetic demo.
      </motion.p>
      <motion.div variants={fadeUp}>
        <EmbeddingExplorer />
      </motion.div>
    </motion.div>
  );
}
