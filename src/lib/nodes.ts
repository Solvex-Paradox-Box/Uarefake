export type NodeCategory = "CORE_KERNEL" | "LOGIC_SOLVER" | "PERSISTENCE" | "SECURITY" | "MARKETPLACE" | "ADAPTERS" | "AUDIT" | "PAYMENTS";
export type ExecutionMode = "CODE_EXECUTED" | "EXTERNAL_PROVIDER_REQUIRED" | "SANDBOX_ISOLATED";

export type DaisyNode = {
  id: string;
  name: string;
  category: NodeCategory;
  mode: ExecutionMode;
  purpose: string;
  load: number;
  health: "live" | "hold";
};

export const daisyNodes: DaisyNode[] = [
  { id: "DN-01", name: 'Daisy Genesis Core', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Root bootstrap and sovereign execution engine', load: 0.22, health: "live" },
  { id: "DN-02", name: 'MMTAI Authority Gate', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Capability is not authority', load: 0.18, health: "live" },
  { id: "DN-03", name: 'Z3 Theorem Prover Kernel', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'First-order logic and SMT proving', load: 0.41, health: "live" },
  { id: "DN-04", name: 'NOPOT Bounded Termination Engine', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Inductive ranking metric verification', load: 0.12, health: "live" },
  { id: "DN-05", name: 'Crystal Clear Box Audit Engine', category: "AUDIT", mode: "CODE_EXECUTED", purpose: 'Zero-knowledge customer evidence projection', load: 0.29, health: "live" },
  { id: "DN-06", name: 'Linear SHA-256 Merkle Ledger', category: "AUDIT", mode: "CODE_EXECUTED", purpose: 'Tamper-evident append-only log', load: 0.19, health: "live" },
  { id: "DN-07", name: 'Anti-Tamper Sentinel Monitor', category: "AUDIT", mode: "CODE_EXECUTED", purpose: 'Live hash anomaly alarm', load: 0.08, health: "live" },
  { id: "DN-08", name: 'Atomic Checkpoint Engine', category: "PERSISTENCE", mode: "CODE_EXECUTED", purpose: 'Deep snapshot serialization', load: 0.21, health: "live" },
  { id: "DN-09", name: 'Reversibility & Rollback Governor', category: "PERSISTENCE", mode: "CODE_EXECUTED", purpose: 'Guaranteed rollbacks for reversible mutations', load: 0.06, health: "live" },
  { id: "DN-10", name: 'Irreversible Action Firewall', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Guards illegal rollback on external commitments', load: 0.11, health: "live" },
  { id: "DN-11", name: '21-Stage Problem Pipeline', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Sequential gate traversal', load: 0.33, health: "live" },
  { id: "DN-12", name: 'Fail-Closed Circuit Breaker', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Quarantine on invariant violation', load: 0.09, health: "live" },
  { id: "DN-13", name: 'Defensible Pricing Formula Engine', category: "MARKETPLACE", mode: "CODE_EXECUTED", purpose: 'Deterministic v1.4 verifiable pricing', load: 0.27, health: "live" },
  { id: "DN-14", name: 'Marketplace Publication Guard', category: "MARKETPLACE", mode: "CODE_EXECUTED", purpose: 'Blocks unverified listings', load: 0.14, health: "live" },
  { id: "DN-15", name: 'Multi-Tenant Partition Manager', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Isolation across tenant boundaries', load: 0.16, health: "live" },
  { id: "DN-16", name: 'RBAC Token Mint & Validator', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Signed session bearer control', load: 0.13, health: "live" },
  { id: "DN-17", name: 'Single-Use Token Replay Sentinel', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Prevents replay attacks', load: 0.07, health: "live" },
  { id: "DN-18", name: 'Cleanroom Deterministic Sandbox', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Hermetic execution, zero network side-effects', load: 0.24, health: "live" },
  { id: "DN-19", name: 'Bitrot & Drift Detection Oracle', category: "AUDIT", mode: "CODE_EXECUTED", purpose: 'Expected vs observed artifact digests', load: 0.1, health: "live" },
  { id: "DN-20", name: 'Paradox Resolution Engine', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Disarms self-referential paradoxes', load: 0.38, health: "live" },
  { id: "DN-21", name: 'Russell Naive Set Axiom Disprover', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Unrestricted comprehension contradiction', load: 0.17, health: "live" },
  { id: "DN-22", name: 'Barber Semantic Variant Verifier', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Universal quantifier clash', load: 0.15, health: "live" },
  { id: "DN-23", name: 'Curry Implication Contraction Guard', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Substructural logic explosion guard', load: 0.12, health: "live" },
  { id: "DN-24", name: 'Zeno Achilles Continuous Metric Solver', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Bounded epsilon convergence', load: 0.2, health: "live" },
  { id: "DN-25", name: 'Burali-Forti Ordinal Hierarchy Checker', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Well-ordered set foundation', load: 0.11, health: "live" },
  { id: "DN-26", name: 'Tarski Semantic Truth Tower Node', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Object-metalanguage collapse guard', load: 0.14, health: "live" },
  { id: "DN-27", name: 'Halting Problem Boundary Sentinel', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Rice-Turing boundary on arbitrary execution', load: 0.09, health: "live" },
  { id: "DN-28", name: 'Order State Machine Orchestrator', category: "MARKETPLACE", mode: "CODE_EXECUTED", purpose: 'Directed acyclic order progression', load: 0.31, health: "live" },
  { id: "DN-29", name: 'Preserved Solution Vault (DH-S-001)', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Sealed verified solution inventory', load: 0.18, health: "live" },
  { id: "DN-30", name: 'Independent Oracle Attestor', category: "AUDIT", mode: "CODE_EXECUTED", purpose: 'External cryptographic witnesses', load: 0.22, health: "live" },
  { id: "DN-31", name: 'Sqlite Local Store Manager', category: "PERSISTENCE", mode: "CODE_EXECUTED", purpose: 'Multi-tenant relational persistence', load: 0.26, health: "live" },
  { id: "DN-32", name: 'Durable JSON WAL Sync Engine', category: "PERSISTENCE", mode: "CODE_EXECUTED", purpose: 'Write-ahead logging with fsync', load: 0.19, health: "live" },
  { id: "DN-33", name: 'Central Failure Diversion Router', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Captures tripped pipeline invariants', load: 0.08, health: "live" },
  { id: "DN-34", name: 'Neon Postgres Adapter', category: "ADAPTERS", mode: "EXTERNAL_PROVIDER_REQUIRED", purpose: 'Serverless PostgreSQL synchronization', load: 0, health: "hold" },
  { id: "DN-35", name: 'PayPal Enterprise Payment Gateway', category: "PAYMENTS", mode: "EXTERNAL_PROVIDER_REQUIRED", purpose: 'Server-authoritative capture and escrow', load: 0, health: "hold" },
  { id: "DN-36", name: 'Fiat Settlement Policy Guard', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Stripe prohibited; fiat routed to PayPal DN-35', load: 0.05, health: "live" },
  { id: "DN-37", name: 'Non-PayPal Rail Blocklist', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Hard-disables every non-PayPal payment rail', load: 0.04, health: "live" },
  { id: "DN-38", name: 'PYUSD Evidence Requirement', category: "PAYMENTS", mode: "EXTERNAL_PROVIDER_REQUIRED", purpose: 'Requires provider-issued PYUSD capture evidence', load: 0, health: "hold" },
  { id: "DN-39", name: 'External Custody Exclusion Guard', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Disables third-party custody bridges', load: 0.03, health: "live" },
  { id: "DN-40", name: 'Lean4 Theorem Verification Bridge', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Type theory certificate verification', load: 0.12, health: "live" },
  { id: "DN-41", name: 'Isabelle/HOL Proof Ingestion Node', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Higher-order logic theorem ingestion', load: 0.1, health: "live" },
  { id: "DN-42", name: 'Coq Gallina Specification Node', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Calculus of inductive constructions', load: 0.09, health: "live" },
  { id: "DN-43", name: 'Daisy Brain Autonomous Planner', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Goal decomposition and heuristic synthesis', load: 0.44, health: "live" },
  { id: "DN-44", name: 'Pigeonhole Collision SMT Verifier', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Injective map impossibility', load: 0.13, health: "live" },
  { id: "DN-45", name: 'Two Generals Consensus Barrier Node', category: "LOGIC_SOLVER", mode: "CODE_EXECUTED", purpose: 'Unreliable communication impossibility', load: 0.11, health: "live" },
  { id: "DN-46", name: 'Chandy-Lamport Distributed Snapshot', category: "PERSISTENCE", mode: "CODE_EXECUTED", purpose: 'Consistent global cut state capture', load: 0.21, health: "live" },
  { id: "DN-47", name: 'Raft Consensus State Machine', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Quorum-based log replication', load: 0.28, health: "live" },
  { id: "DN-48", name: 'Lamport Vector Clock Sequencer', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Causal order tracking', load: 0.16, health: "live" },
  { id: "DN-49", name: 'License Generation & Proof Tokenizer', category: "MARKETPLACE", mode: "CODE_EXECUTED", purpose: 'Signed solution access keys', load: 0.23, health: "live" },
  { id: "DN-50", name: 'Telemetry & Metric Aggregator', category: "AUDIT", mode: "CODE_EXECUTED", purpose: 'Latency, utilization, throughput', load: 0.29, health: "live" },
  { id: "DN-51", name: 'Hardware Security Module Proxy', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'FIPS 140-2 Level 3 attestation', load: 0.07, health: "live" },
  { id: "DN-52", name: 'Ed25519 Cryptographic Signer', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Deterministic digital signatures', load: 0.18, health: "live" },
  { id: "DN-53", name: 'Zero-Knowledge Range Proof Engine', category: "SECURITY", mode: "CODE_EXECUTED", purpose: 'Proves invariants without leaking parameters', load: 0.14, health: "live" },
  { id: "DN-54", name: 'Sovereign API Gateway & Mesh Router', category: "CORE_KERNEL", mode: "CODE_EXECUTED", purpose: 'Authenticated RPC and REST multiplexer', load: 0.32, health: "live" },
];

export const nodeCategories: NodeCategory[] = [
  "ADAPTERS",
  "AUDIT",
  "CORE_KERNEL",
  "LOGIC_SOLVER",
  "MARKETPLACE",
  "PAYMENTS",
  "PERSISTENCE",
  "SECURITY",
];
