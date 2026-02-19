import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const databases = [
  { name: 'Pinecone', type: 'Managed Cloud', highlight: 'Serverless, auto-scaling', color: 'var(--accent-emerald)' },
  { name: 'ChromaDB', type: 'Open Source', highlight: 'Easy to start, Python-native', color: 'var(--accent-amber)' },
  { name: 'Qdrant', type: 'Open Source', highlight: 'Rust-powered, fast filtering', color: 'var(--accent-rose)' },
  { name: 'PGVector', type: 'Extension', highlight: 'Vectors in PostgreSQL', color: 'var(--accent-sky)' },
  { name: 'Weaviate', type: 'Open Source', highlight: 'GraphQL API, hybrid search', color: 'var(--accent-violet)' },
  { name: 'FAISS', type: 'Library', highlight: 'Meta\'s similarity search lib', color: 'var(--accent-teal)' },
];

export default function VectorDatabases() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="neon-text-rose">Vector Databases</span>: Where Embeddings Live
      </motion.h2>
      <motion.p variants={fadeUp}>
        Once you have embeddings, you need a place to <strong>store and search</strong> them efficiently at scale.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {databases.map((db) => (
          <motion.div
            key={db.name}
            variants={fadeUp}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '1.2rem',
              borderLeft: `3px solid ${db.color}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
            }}
          >
            <h3 style={{ color: db.color, fontSize: '1.1rem' }}>{db.name}</h3>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              alignSelf: 'flex-start',
            }}>
              {db.type}
            </span>
            <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>{db.highlight}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
