#!/usr/bin/env node
/**
 * Simple scaffolder for UI components (atoms).
 * Usage: node scripts/scaffold-component.mjs Button
 */
import fs from 'fs';
import path from 'path';

const [, , rawName] = process.argv;
if (!rawName) {
  console.error('Usage: node scripts/scaffold-component.mjs <ComponentName>');
  process.exit(1);
}

const name = rawName.replace(/[^A-Za-z0-9]/g, '');
const baseDir = path.join(process.cwd(), 'src', 'components', 'ui', name);
fs.mkdirSync(baseDir, { recursive: true });

const tsx = `'use client';
import React from 'react';

export interface ${name}Props { children?: React.ReactNode; }

export const ${name}: React.FC<${name}Props> = ({ children }) => {
  return <div data-testid="${name}">{children ?? '${name}'}</div>;
};

export default ${name};
`;

const story = `import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'UI/Atoms/${name}',
  component: ${name},
};
export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = { args: { children: '${name}' } };
`;

const test = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders', () => {
    render(<${name} />);
    expect(screen.getByTestId('${name}')).toBeInTheDocument();
  });
});
`;

const files = [
  { p: path.join(baseDir, `${name}.tsx`), c: tsx },
  { p: path.join(baseDir, `${name}.stories.tsx`), c: story },
  { p: path.join(baseDir, `${name}.test.tsx`), c: test },
];

for (const f of files) {
  if (fs.existsSync(f.p)) {
    console.warn(`Skip: ${f.p} already exists`);
    continue;
  }
  fs.writeFileSync(f.p, f.c);
  console.log('Created', f.p);
}
console.log('\nDone. You can run:');
console.log(' - npm run storybook');
console.log(' - npm test');
