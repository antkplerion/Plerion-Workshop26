import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  workshopSidebar: [
    {
      type: 'category',
      label: 'Welcome',
      collapsible: false,
      className: 'sidebar-section-heading',
      items: [
        {
          type: 'category',
          label: 'W1. Setup',
          link: { type: 'doc', id: '00-setup/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'W2. Connect Pleri',
          link: { type: 'doc', id: '01-connect-pleri/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'W3. Operate',
          link: { type: 'doc', id: '07-operate/index' },
          items: [],
        },
      ],
    },
    {
      type: 'category',
      label: 'Foundational',
      collapsible: false,
      className: 'sidebar-section-heading',
      items: [
        {
          type: 'category',
          label: 'F1. See',
          link: { type: 'doc', id: '02-see/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'F2. Prioritize',
          link: { type: 'doc', id: '03-prioritize/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'F3. Fix',
          link: { type: 'doc', id: '04-fix/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'F4. Prove',
          link: { type: 'doc', id: '05-prove/index' },
          items: [],
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsible: false,
      className: 'sidebar-section-heading',
      items: [
        {
          type: 'category',
          label: 'A1. Teach Pleri',
          link: { type: 'doc', id: '06-teach-pleri/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'A2. Advanced Module 2',
          link: { type: 'doc', id: 'advanced-02/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'A3. Advanced Module 3',
          link: { type: 'doc', id: 'advanced-03/index' },
          items: [],
        },
      ],
    },
  ],
};

export default sidebars;
