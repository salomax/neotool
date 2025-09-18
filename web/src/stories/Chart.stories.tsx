import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from '../shared/components/ui/molecules/Chart';

const meta: Meta<typeof Chart> = {
  title: 'Components/Molecules/Chart',
  component: Chart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile chart component supporting multiple chart types including line, bar, pie, and area charts. Built with Recharts for optimal performance and customization.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'area'],
      description: 'Chart type',
    },
    data: {
      control: 'object',
      description: 'Chart data array',
    },
    title: {
      control: 'text',
      description: 'Chart title',
    },
    width: {
      control: 'number',
      description: 'Chart width',
    },
    height: {
      control: 'number',
      description: 'Chart height',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid',
    },
    colors: {
      control: 'object',
      description: 'Custom colors array',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// Sample data for stories
const salesData = [
  { name: 'Jan', value: 400, sales: 400, revenue: 2400 },
  { name: 'Feb', value: 300, sales: 300, revenue: 1398 },
  { name: 'Mar', value: 200, sales: 200, revenue: 9800 },
  { name: 'Apr', value: 500, sales: 500, revenue: 3908 },
  { name: 'May', value: 800, sales: 800, revenue: 4800 },
  { name: 'Jun', value: 600, sales: 600, revenue: 3800 },
];

const pieData = [
  { name: 'Desktop', value: 400, users: 400 },
  { name: 'Mobile', value: 300, users: 300 },
  { name: 'Tablet', value: 200, users: 200 },
  { name: 'Other', value: 100, users: 100 },
];

const areaData = [
  { name: 'Q1', value: 400, users: 400, revenue: 2400 },
  { name: 'Q2', value: 300, users: 300, revenue: 1398 },
  { name: 'Q3', value: 200, users: 200, revenue: 9800 },
  { name: 'Q4', value: 500, users: 500, revenue: 3908 },
];

export const LineChart: Story = {
  args: {
    type: 'line',
    data: salesData,
    title: 'Sales Over Time',
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: salesData,
    title: 'Monthly Sales',
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: pieData,
    title: 'Device Usage',
    showLegend: true,
    showTooltip: true,
  },
};

export const AreaChart: Story = {
  args: {
    type: 'area',
    data: areaData,
    title: 'User Growth',
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'line',
    data: salesData,
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const WithoutLegend: Story = {
  args: {
    type: 'bar',
    data: salesData,
    title: 'Sales Data',
    showLegend: false,
    showTooltip: true,
    showGrid: true,
  },
};

export const WithoutTooltip: Story = {
  args: {
    type: 'line',
    data: salesData,
    title: 'Sales Trend',
    showLegend: true,
    showTooltip: false,
    showGrid: true,
  },
};

export const WithoutGrid: Story = {
  args: {
    type: 'bar',
    data: salesData,
    title: 'Clean Chart',
    showLegend: true,
    showTooltip: true,
    showGrid: false,
  },
};

export const CustomColors: Story = {
  args: {
    type: 'line',
    data: salesData,
    title: 'Custom Styled Chart',
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'],
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const CustomSize: Story = {
  args: {
    type: 'bar',
    data: salesData,
    title: 'Large Chart',
    width: 600,
    height: 400,
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const SmallSize: Story = {
  args: {
    type: 'pie',
    data: pieData,
    title: 'Compact Pie Chart',
    width: 300,
    height: 200,
    showLegend: true,
    showTooltip: true,
  },
};

export const CustomDataKeys: Story = {
  args: {
    type: 'line',
    data: salesData,
    title: 'Revenue vs Sales',
    xAxisKey: 'name',
    dataKey: 'revenue',
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const MultipleDataSeries: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Chart
        type="line"
        data={salesData}
        title="Sales"
        width={300}
        height={200}
        dataKey="sales"
        showLegend={false}
        showTooltip={true}
        showGrid={true}
      />
      <Chart
        type="line"
        data={salesData}
        title="Revenue"
        width={300}
        height={200}
        dataKey="revenue"
        showLegend={false}
        showTooltip={true}
        showGrid={true}
      />
    </div>
  ),
};

export const ResponsiveCharts: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      <Chart
        type="line"
        data={salesData}
        title="Sales Trend"
        showLegend={true}
        showTooltip={true}
        showGrid={true}
      />
      <Chart
        type="bar"
        data={salesData}
        title="Monthly Sales"
        showLegend={true}
        showTooltip={true}
        showGrid={true}
      />
      <Chart
        type="pie"
        data={pieData}
        title="Device Distribution"
        showLegend={true}
        showTooltip={true}
      />
      <Chart
        type="area"
        data={areaData}
        title="Growth Area"
        showLegend={true}
        showTooltip={true}
        showGrid={true}
      />
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    type: 'area',
    data: areaData,
    title: 'Styled Area Chart',
    colors: ['#667eea', '#764ba2'],
    fillOpacity: 0.8,
    strokeWidth: 3,
    showLegend: true,
    showTooltip: true,
    showGrid: true,
    sx: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      '& .MuiTypography-h6': {
        color: 'white',
      },
    },
  },
};

export const EmptyData: Story = {
  args: {
    type: 'line',
    data: [],
    title: 'No Data Available',
    showLegend: true,
    showTooltip: true,
    showGrid: true,
  },
};

export const SingleDataPoint: Story = {
  args: {
    type: 'pie',
    data: [{ name: 'Single Item', value: 100 }],
    title: 'Single Data Point',
    showLegend: true,
    showTooltip: true,
  },
};
