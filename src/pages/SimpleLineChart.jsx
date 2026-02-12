import React from 'react';

export default function SimpleLineChart({ data = [], xAxisKey = 'label', dataKey = 'value', color = '#3b82f6', height = 250 }) {
  if (!data.length) return null;

  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = 500;
  const chartHeight = height;
  const width = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const values = data.map(d => d[dataKey]);
  const minVal = Math.min(...values) > 0 ? Math.min(...values) * 0.95 : 0;
  const maxVal = Math.max(...values) * 1.05;
  const range = maxVal - minVal || 1;

  const getX = (index) => (index / (data.length - 1)) * width;
  const getY = (value) => innerHeight - ((value - minVal) / range) * innerHeight;

  const points = data.map((d, i) => `${getX(i)},${getY(d[dataKey])}`).join(' ');

  const yAxisLabels = [minVal, minVal + range / 4, minVal + range / 2, minVal + range * 3 / 4, maxVal];

  return (
    <div className="w-full h-full">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Y-axis grid lines and labels */}
          {yAxisLabels.map((val, i) => {
            const y = getY(val);
            return (
              <g key={i}>
                <line x1={0} y1={y} x2={width} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                <text x={-10} y={y + 4} textAnchor="end" fontSize="10" fill="#6b7280">
                  {Math.round(val)}%
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text key={i} x={getX(i)} y={innerHeight + 20} textAnchor="middle" fontSize="10" fill="#6b7280">
              {d[xAxisKey]}
            </text>
          ))}

          {/* Line */}
          <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(d[dataKey])}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}