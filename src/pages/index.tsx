import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const modules = [
  {
    number: '00',
    title: 'Setup',
    time: '15 min',
    path: '/00-setup',
    desc: 'Configure your environment, connect your AWS account, and meet the Bad Cloud.',
    paths: ['security', 'platform'],
  },
  {
    number: '01',
    title: 'Connect Pleri',
    time: '15 min',
    path: '/01-connect-pleri',
    desc: 'Hook Pleri AI into Claude, your IDE, and other MCP-compatible tools.',
    paths: ['security', 'platform'],
  },
  {
    number: '02',
    title: 'See',
    time: '20 min',
    path: '/02-see',
    desc: 'Understand your cloud asset inventory and discover what Plerion knows about your environment.',
    paths: ['security', 'platform'],
  },
  {
    number: '03',
    title: 'Prioritize',
    time: '25 min',
    path: '/03-prioritize',
    desc: 'Use risk scores, attack paths, and blast radius to focus on what actually matters.',
    paths: ['security'],
  },
  {
    number: '04',
    title: 'Fix',
    time: '25 min',
    path: '/04-fix',
    desc: 'Remediate findings via the console, Pleri AI, and IaC — with verification steps.',
    paths: ['security', 'platform'],
  },
  {
    number: '05',
    title: 'Prove',
    time: '20 min',
    path: '/05-prove',
    desc: 'Generate compliance reports, map controls to frameworks, and build audit evidence.',
    paths: ['security'],
  },
  {
    number: '06',
    title: 'Work Headless',
    time: '20 min',
    path: '/06-work-headless',
    desc: 'Drive Plerion from the API and CLI — automate queries, exports, and ticket creation.',
    paths: ['platform'],
  },
  {
    number: '07',
    title: 'Teach Pleri',
    time: '20 min',
    path: '/07-teach-pleri',
    desc: 'Add custom findings, policies, and context so Pleri learns your organisation.',
    paths: ['platform'],
  },
  {
    number: '08',
    title: 'Operate',
    time: '20 min',
    path: '/08-operate',
    desc: 'Set up alerting, integrations, and runbooks to make security part of daily operations.',
    paths: ['security', 'platform'],
  },
];

const pathMeta: Record<string, { label: string; cls: string }> = {
  security: { label: 'Security Engineer', cls: 'path-badge--security' },
  platform: { label: 'Platform Engineer', cls: 'path-badge--platform' },
};

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Plerion Workshop 2026"
      description="From 'we just bought Plerion' to running cloud security end to end."
    >
      <div className="hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <img
            src="/Plerion-Workshop26/img/pleri.png"
            alt="Plerion"
            style={{ height: 192, marginBottom: '1.5rem' }}
          />
          <h1 className="hero__title">Plerion Workshop 2026</h1>
          <p className="hero__subtitle">
            From <em>"we just bought Plerion"</em> to running cloud security end to end.
          </p>
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link className="button button--primary button--lg" to="/00-setup">
              Start Setup
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/intro"
              style={{ color: '#F2F7F8', borderColor: '#261432' }}
            >
              Read Intro
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Learning Paths</h2>
          <p style={{ opacity: 0.7 }}>
            Pick the modules that match your role, or run all nine for the full experience.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="path-badge path-badge--security">
              Security Engineer — 00 01 02 03 04 05 08
            </span>
            <span className="path-badge path-badge--platform">
              Platform Engineer — 00 01 02 06 07 08
            </span>
            <span className="path-badge path-badge--both">Full Workshop — all modules</span>
          </div>
        </div>

        <h2>Modules</h2>
        <div className="module-grid">
          {modules.map((m) => (
            <Link key={m.number} className="module-card" to={m.path}>
              <div className="module-card__number">Module {m.number}</div>
              <div className="module-card__title">{m.title}</div>
              <div className="module-card__time">{m.time}</div>
              <div className="module-card__desc">{m.desc}</div>
              <div style={{ marginTop: '0.75rem' }}>
                {m.paths.map((p) => (
                  <span
                    key={p}
                    className={`path-badge ${pathMeta[p].cls}`}
                    style={{ fontSize: '0.65rem' }}
                  >
                    {pathMeta[p].label}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="highlight-lemon" style={{ marginTop: '3rem' }}>
          <strong>Bad Cloud environment</strong> — each module uses a deliberately misconfigured
          Terraform environment so you can see real findings. Setup instructions are in Module 00.
        </div>
      </div>
    </Layout>
  );
}
