import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppThemeProvider } from '../../../theme/AppThemeProvider';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<AppThemeProvider><Button>Hello</Button></AppThemeProvider>);
    expect(screen.getByRole('button', { name: /hello/i })).toBeInTheDocument();
  });
});
