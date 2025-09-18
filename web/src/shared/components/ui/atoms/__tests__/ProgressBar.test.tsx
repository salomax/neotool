import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  const defaultProps = {
    'data-testid': 'progress-bar'
  };

  it('renders with default props', () => {
    render(<ProgressBar {...defaultProps} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders linear progress by default', () => {
    render(<ProgressBar {...defaultProps} />);
    
    const linearProgress = screen.getByRole('progressbar');
    expect(linearProgress).toBeInTheDocument();
  });

  it('renders circular progress when variant is circular', () => {
    render(<ProgressBar {...defaultProps} variant="circular" />);
    
    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();
  });

  it('renders step progress when variant is step', () => {
    render(<ProgressBar {...defaultProps} variant="step" />);
    
    const stepper = screen.getByRole('progressbar');
    expect(stepper).toBeInTheDocument();
  });

  it('displays correct progress value', () => {
    render(<ProgressBar {...defaultProps} value={75} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps value between 0 and 100', () => {
    const { rerender } = render(<ProgressBar {...defaultProps} value={150} />);
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    
    rerender(<ProgressBar {...defaultProps} value={-50} />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows percentage when showPercentage is true', () => {
    render(<ProgressBar {...defaultProps} value={50} showPercentage />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('hides percentage when showPercentage is false', () => {
    render(<ProgressBar {...defaultProps} value={50} showPercentage={false} />);
    
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('shows label when showLabel is true', () => {
    render(<ProgressBar {...defaultProps} label="Test Progress" showLabel />);
    
    expect(screen.getByText('Test Progress')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<ProgressBar {...defaultProps} label="Test Progress" showLabel={false} />);
    
    expect(screen.queryByText('Test Progress')).not.toBeInTheDocument();
  });

  it('shows default label when no custom label provided', () => {
    render(<ProgressBar {...defaultProps} showLabel />);
    
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('shows loading label when indeterminate', () => {
    render(<ProgressBar {...defaultProps} indeterminate showLabel />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      const { unmount } = render(<ProgressBar {...defaultProps} size={size} />);
      expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different colors', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
    
    colors.forEach(color => {
      const { unmount } = render(<ProgressBar {...defaultProps} color={color} />);
      expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies error state correctly', () => {
    render(<ProgressBar {...defaultProps} error />);
    
    const formControl = screen.getByTestId('progress-bar');
    expect(formControl).toHaveClass('Mui-error');
  });

  it('shows error message when provided', () => {
    render(<ProgressBar {...defaultProps} error errorMessage="Progress failed" />);
    
    expect(screen.getByText('Progress failed')).toBeInTheDocument();
  });

  it('shows helper text when provided', () => {
    render(<ProgressBar {...defaultProps} helperText="This is helper text" />);
    
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<ProgressBar {...defaultProps} disabled />);
    
    const formControl = screen.getByTestId('progress-bar');
    expect(formControl).toHaveClass('Mui-disabled');
  });

  it('applies custom className', () => {
    render(<ProgressBar {...defaultProps} className="custom-progress" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveClass('custom-progress');
  });

  it('renders step progress with correct current step', () => {
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="step" 
        currentStep={2} 
        totalSteps={5}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
      />
    );
    
    expect(screen.getByText('Step 3 of 5')).toBeInTheDocument();
  });

  it('renders step progress with custom steps', () => {
    const customSteps = ['Start', 'Process', 'Complete'];
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="step" 
        currentStep={1} 
        totalSteps={3}
        steps={customSteps}
      />
    );
    
    customSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('handles step click when clickable', () => {
    const onStepClick = jest.fn();
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="step" 
        currentStep={1} 
        totalSteps={3}
        steps={['Step 1', 'Step 2', 'Step 3']}
        clickable
        onStepClick={onStepClick}
      />
    );
    
    const step1 = screen.getByText('Step 1');
    fireEvent.click(step1);
    
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it('shows step content when enabled', () => {
    const stepContent = [
      <div key="0">Content for step 1</div>,
      <div key="1">Content for step 2</div>,
      <div key="2">Content for step 3</div>
    ];
    
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="step" 
        currentStep={1} 
        totalSteps={3}
        steps={['Step 1', 'Step 2', 'Step 3']}
        showStepContent
        stepContent={stepContent}
      />
    );
    
    expect(screen.getByText('Content for step 2')).toBeInTheDocument();
  });

  it('shows step status correctly', () => {
    const stepStatus = ['completed', 'active', 'pending', 'error'];
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="step" 
        currentStep={1} 
        totalSteps={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
        stepStatus={stepStatus}
      />
    );
    
    // Check that the correct icons are rendered for each status
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument(); // completed
    expect(screen.getByTestId('InfoIcon')).toBeInTheDocument(); // active
  });

  it('shows completion percentage for step progress', () => {
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="step" 
        currentStep={2} 
        totalSteps={5}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
        showPercentage
      />
    );
    
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
  });

  it('renders circular progress with percentage in center', () => {
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="circular" 
        value={75} 
        showPercentage 
      />
    );
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders circular progress without percentage when indeterminate', () => {
    render(
      <ProgressBar 
        {...defaultProps} 
        variant="circular" 
        indeterminate 
        showPercentage 
      />
    );
    
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('renders with custom width for linear progress', () => {
    render(<ProgressBar {...defaultProps} width="50%" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders with custom height for linear progress', () => {
    render(<ProgressBar {...defaultProps} height={16} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders with custom thickness for circular progress', () => {
    render(<ProgressBar {...defaultProps} variant="circular" thickness={8} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('handles controlled value updates', () => {
    const { rerender } = render(<ProgressBar {...defaultProps} value={25} />);
    
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    
    rerender(<ProgressBar {...defaultProps} value={75} />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders indeterminate progress correctly', () => {
    render(<ProgressBar {...defaultProps} indeterminate />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });
});
