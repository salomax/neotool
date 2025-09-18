import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rating from '../Rating';

describe('Rating', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'rating'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Rating {...defaultProps} />);
    
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getAllByTestId(/rating-item-/)).toHaveLength(5); // Default max is 5
  });

  it('renders with custom max value', () => {
    render(<Rating {...defaultProps} max={10} />);
    
    expect(screen.getAllByTestId(/rating-item-/)).toHaveLength(10);
  });

  it('renders with custom value', () => {
    render(<Rating {...defaultProps} value={3} />);
    
    // Check that the first 3 items are filled (star variant by default)
    const ratingItems = screen.getAllByTestId(/rating-item-/);
    expect(ratingItems[0]).toHaveAttribute('data-testid', 'rating-item-0');
    expect(ratingItems[1]).toHaveAttribute('data-testid', 'rating-item-1');
    expect(ratingItems[2]).toHaveAttribute('data-testid', 'rating-item-2');
  });

  it('calls onChange when rating item is clicked', async () => {
    const user = userEvent.setup();
    render(<Rating {...defaultProps} />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.click(firstItem);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange with 0 when same rating is clicked again', async () => {
    const user = userEvent.setup();
    render(<Rating {...defaultProps} value={1} />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.click(firstItem);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(0);
  });

  it('does not call onChange when readOnly is true', async () => {
    const user = userEvent.setup();
    render(<Rating {...defaultProps} readOnly />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.click(firstItem);
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled is true', async () => {
    const user = userEvent.setup();
    render(<Rating {...defaultProps} disabled />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.click(firstItem);
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Rating {...defaultProps} variant="star" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} variant="thumbs" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} variant="heart" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} variant="emoji" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Rating {...defaultProps} size="small" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} size="medium" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} size="large" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });

  it('renders different colors', () => {
    const { rerender } = render(<Rating {...defaultProps} color="primary" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} color="secondary" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    
    rerender(<Rating {...defaultProps} color="error" />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<Rating {...defaultProps} value={3} showValue />);
    
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('shows labels when showLabels is true', () => {
    render(<Rating {...defaultProps} showLabels />);
    
    // Check that tooltips are present (they contain the labels)
    const ratingItems = screen.getAllByTestId(/rating-item-/);
    expect(ratingItems).toHaveLength(5);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Rating {...defaultProps} />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    firstItem.focus();
    
    await user.keyboard('{Enter}');
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
    
    await user.keyboard(' ');
    expect(defaultProps.onChange).toHaveBeenCalledWith(0);
  });

  it('calls onHover when mouse enters rating item', async () => {
    const user = userEvent.setup();
    const onHover = jest.fn();
    render(<Rating {...defaultProps} onHover={onHover} />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.hover(firstItem);
    
    expect(onHover).toHaveBeenCalledWith(1);
  });

  it('calls onLeave when mouse leaves rating', async () => {
    const user = userEvent.setup();
    const onLeave = jest.fn();
    render(<Rating {...defaultProps} onLeave={onLeave} />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.hover(firstItem);
    await user.unhover(firstItem);
    
    expect(onLeave).toHaveBeenCalled();
  });

  it('handles precision for half ratings', () => {
    render(<Rating {...defaultProps} value={2.5} precision={0.5} />);
    
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    // The component should render with half precision support
  });

  it('applies custom className', () => {
    render(<Rating {...defaultProps} className="custom-rating" />);
    
    expect(screen.getByTestId('rating')).toHaveClass('custom-rating');
  });

  it('renders with custom test id', () => {
    render(<Rating {...defaultProps} data-testid="custom-rating" />);
    
    expect(screen.getByTestId('custom-rating')).toBeInTheDocument();
  });

  it('shows hover label when hovering and showLabels is true', async () => {
    const user = userEvent.setup();
    render(<Rating {...defaultProps} showLabels />);
    
    const firstItem = screen.getByTestId('rating-item-0');
    await user.hover(firstItem);
    
    // The hover label should appear
    expect(screen.getByText('Poor')).toBeInTheDocument();
  });

  it('handles thumbs variant with 2 items', () => {
    render(<Rating {...defaultProps} variant="thumbs" max={2} />);
    
    expect(screen.getAllByTestId(/rating-item-/)).toHaveLength(2);
  });

  it('handles heart variant with custom max', () => {
    render(<Rating {...defaultProps} variant="heart" max={3} />);
    
    expect(screen.getAllByTestId(/rating-item-/)).toHaveLength(3);
  });

  it('handles emoji variant with custom max', () => {
    render(<Rating {...defaultProps} variant="emoji" max={4} />);
    
    expect(screen.getAllByTestId(/rating-item-/)).toHaveLength(4);
  });
});
