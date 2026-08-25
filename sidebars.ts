import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  workshopSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: '0. Setup',
      link: { type: 'doc', id: '00-setup/index' },
      items: [],
    },
    {
      type: 'category',
      label: '1. Connect Pleri',
      link: { type: 'doc', id: '01-connect-pleri/index' },
      items: [],
    },
    {
      type: 'category',
      label: '2. See',
      link: { type: 'doc', id: '02-see/index' },
      items: [],
    },
    {
      type: 'category',
      label: '3. Prioritize',
      link: { type: 'doc', id: '03-prioritize/index' },
      items: [],
    },
    {
      type: 'category',
      label: '4. Fix',
      link: { type: 'doc', id: '04-fix/index' },
      items: [],
    },
    {
      type: 'category',
      label: '5. Prove',
      link: { type: 'doc', id: '05-prove/index' },
      items: [],
    },
    {
      type: 'category',
      label: '6. Work Headless',
      link: { type: 'doc', id: '06-work-headless/index' },
      items: [],
    },
    {
      type: 'category',
      label: '7. Teach Pleri',
      link: { type: 'doc', id: '07-teach-pleri/index' },
      items: [],
    },
    {
      type: 'category',
      label: '8. Operate',
      link: { type: 'doc', id: '08-operate/index' },
      items: [],
    },
  ],
};

export default sidebars;
