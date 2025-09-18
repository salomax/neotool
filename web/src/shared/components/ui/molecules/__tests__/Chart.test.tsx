import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Chart } from '../Chart';

// Mock theme for testing
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock recharts components to avoid canvas issues in tests
jest.mock('recharts', () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  Line: () => <div data-testid="line" />,
  Bar: () => <div data-testid="bar" />,
  Pie: ({ children }: any) => <div data-testid="pie">{children}</div>,
  Area: () => <div data-testid="area" />,
  Cell: () => <div data-testid="cell" />,
}));

describe('Chart', () => {
  const mockData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 500 },
  ];

  it('renders line chart with basic props', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renders bar chart with basic props', () => {
    renderWithTheme(
      <Chart type="bar" data={mockData} />
    );

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renders pie chart with basic props', () => {
    renderWithTheme(
      <Chart type="pie" data={mockData} />
    );

    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renders area chart with basic props', () => {
    renderWithTheme(
      <Chart type="area" data={mockData} />
    );

    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renders with title', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} title="Sales Data" />
    );

    expect(screen.getByText('Sales Data')).toBeInTheDocument();
  });

  it('renders with custom width and height', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} width={500} height={400} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('shows legend when showLegend is true', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} showLegend={true} />
    );

    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('hides legend when showLegend is false', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} showLegend={false} />
    );

    expect(screen.queryByTestId('legend')).not.toBeInTheDocument();
  });

  it('shows tooltip when showTooltip is true', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} showTooltip={true} />
    );

    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip when showTooltip is false', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} showTooltip={false} />
    );

    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
  });

  it('shows grid when showGrid is true', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} showGrid={true} />
    );

    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
  });

  it('hides grid when showGrid is false', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} showGrid={false} />
    );

    expect(screen.queryByTestId('cartesian-grid')).not.toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff'];
    renderWithTheme(
      <Chart type="line" data={mockData} colors={customColors} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders pie chart with cells for each data point', () => {
    renderWithTheme(
      <Chart type="pie" data={mockData} />
    );

    expect(screen.getByTestId('pie')).toBeInTheDocument();
    // Pie chart should have cells for each data point
    expect(screen.getAllByTestId('cell')).toHaveLength(mockData.length);
  });

  it('renders with custom data keys', () => {
    const customData = [
      { month: 'Jan', sales: 400 },
      { month: 'Feb', sales: 300 },
    ];

    renderWithTheme(
      <Chart 
        type="line" 
        data={customData} 
        xAxisKey="month" 
        dataKey="sales" 
      />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders with custom margin', () => {
    const customMargin = { top: 20, right: 30, bottom: 20, left: 30 };
    renderWithTheme(
      <Chart type="line" data={mockData} margin={customMargin} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders with custom animation duration', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} animationDuration={1000} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders with custom stroke width', () => {
    renderWithTheme(
      <Chart type="line" data={mockData} strokeWidth={3} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders with custom fill opacity', () => {
    renderWithTheme(
      <Chart type="area" data={mockData} fillOpacity={0.8} />
    );

    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('renders with custom sx styles', () => {
    renderWithTheme(
      <Chart 
        type="line" 
        data={mockData} 
        sx={{ backgroundColor: 'grey.100' }} 
      />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('handles empty data array', () => {
    renderWithTheme(
      <Chart type="line" data={[]} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('handles single data point', () => {
    const singleData = [{ name: 'Single', value: 100 }];
    renderWithTheme(
      <Chart type="line" data={singleData} />
    );

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
});
