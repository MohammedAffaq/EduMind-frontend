import React, { useEffect, useState } from 'react';

// SimplePieChart
// Props:
// - data: array of objects
// - valueKey: key for numeric value (default: 'value')
// - labelKey: key for slice label (default: 'label')
// - colors: array of colors (defaults to red, blue, green, yellow, orange)
// - size: diameter in px (default: 160)
// - id: optional id

const DEFAULT_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#f97316'];

export default function SimplePieChart({ data = [], valueKey = 'value', labelKey = 'label', colors = DEFAULT_COLORS, size = 260, id, activeIndex, onHover, innerRadius = 0 }) {
  const [internalHoveredIndex, setInternalHoveredIndex] = React.useState(null);
  const hoveredIndex = activeIndex !== undefined ? activeIndex : internalHoveredIndex;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  const normalized = data.map((d) => ({
    label: d[labelKey] ?? d.label ?? d.month ?? d.name ?? '',
    value: Number(d[valueKey] ?? d.value ?? 0),
  }));

  const getCoords = (percent) => {
    const angle = 2 * Math.PI * percent;
    return [Math.cos(angle), Math.sin(angle)];
  };

  const renderSinglePie = (sliceData, keyIndex, pieSize = size) => {
    const total = sliceData.reduce((s, x) => s + x.value, 0) || 1;
    let cumulative = 0;
    return (
      <div key={keyIndex} className="flex items-center justify-center" style={{ width: pieSize, height: pieSize }}>
        <div className="relative" style={{ width: pieSize, height: pieSize }}>
          <style>{`
            @keyframes pie-slice-reveal { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            .pie-slice { transform-origin: center; animation: pie-slice-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          `}</style>
          <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90 overflow-visible">
            {sliceData.map((slice, i) => {
              const start = cumulative / total;
              const end = (cumulative + slice.value) / total;
              const mid = (start + end) / 2;
              cumulative += slice.value;

              const [startX, startY] = getCoords(start);
              const [endX, endY] = getCoords(end);
              const largeArc = end - start > 0.5 ? 1 : 0;
              const r = 0.98;
              const offset = hoveredIndex === (keyIndex * 6 + i) ? 0.06 : 0;
              const offsetX = Math.cos(2 * Math.PI * mid) * offset;
              const offsetY = Math.sin(2 * Math.PI * mid) * offset;
              const scale = hoveredIndex === (keyIndex * 6 + i) ? 1.06 : 1;

              let pathData;
              if (innerRadius > 0) {
                const [innerStartX, innerStartY] = getCoords(start);
                const [innerEndX, innerEndY] = getCoords(end);
                pathData = `M ${startX * r} ${startY * r} A ${r} ${r} 0 ${largeArc} 1 ${endX * r} ${endY * r} L ${innerEndX * innerRadius} ${innerEndY * innerRadius} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartX * innerRadius} ${innerStartY * innerRadius} Z`;
              } else {
                pathData = `M 0 0 L ${startX * r} ${startY * r} A ${r} ${r} 0 ${largeArc} 1 ${endX * r} ${endY * r} Z`;
              }

              return (
                <g key={i} className={isLoaded ? "pie-slice" : "opacity-0"} style={{ animationDelay: `${i * 0.05}s` }}>
                  <g transform={`translate(${offsetX} ${offsetY}) scale(${scale})`}>
                    <path
                      d={pathData}
                      fill={colors[(keyIndex * 6 + i) % colors.length]}
                      stroke="white"
                      strokeWidth="0.03"
                      className={`transition-transform duration-200 cursor-pointer ${hoveredIndex === (keyIndex * 6 + i) ? 'opacity-100' : 'opacity-90'}`}
                      onMouseEnter={() => {
                        setInternalHoveredIndex(keyIndex * 6 + i);
                        if (onHover) onHover(keyIndex * 6 + i);
                      }}
                      onMouseLeave={() => {
                        setInternalHoveredIndex(null);
                        if (onHover) onHover(null);
                      }}
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Tooltip for this pie - show global hovered index mapping */}
          {sliceData.map((slice, i) => {
            const globalIndex = keyIndex * 6 + i;
            if (hoveredIndex !== globalIndex) return null;

            let currentCumulative = 0;
            for (let j = 0; j < i; j++) currentCumulative += sliceData[j].value;
            const start = currentCumulative / (sliceData.reduce((s,x) => s + x.value, 0) || 1);
            const end = (currentCumulative + slice.value) / (sliceData.reduce((s,x) => s + x.value, 0) || 1);
            const mid = (start + end) / 2;
            const angle = 2 * Math.PI * mid - Math.PI / 2;
            const radius = 0.7;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const left = (x + 1) / 2 * 100;
            const top = (y + 1) / 2 * 100;

            return (
              <div
                key={globalIndex}
                className="absolute pointer-events-none z-10 bg-gray-900/95 text-white text-xs rounded-lg py-1.5 px-3 shadow-xl backdrop-blur-sm transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-white/10"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className="font-semibold mb-0.5">{slice.label}</div>
                <div className="text-gray-300">Value: <span className="text-white font-mono">{slice.value}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Single pie
  return renderSinglePie(normalized, 0, size);
}
