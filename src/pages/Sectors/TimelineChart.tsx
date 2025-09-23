import React, { useState, useRef, useEffect } from 'react';

interface TimelineChartProps {
  className?: string;
}

const TimelineChart = ({ className }: TimelineChartProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectionWidth, setSelectionWidth] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const totalMonths = 18;
  const initialSelectionStart = 8;
  const initialSelectionEnd = 11;

  useEffect(() => {
    if (timelineRef.current) {
      const timelineWidth = timelineRef.current.offsetWidth;
      const monthWidth = timelineWidth / totalMonths;
      const startX = initialSelectionStart * monthWidth;
      const endX = initialSelectionEnd * monthWidth;
      setDragOffset(startX);
      setSelectionWidth(endX - startX);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current || !handleRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const newDragOffset = e.clientX - timelineRect.left;

    const maxDragOffset = timelineRect.width - selectionWidth;

    const clampedOffset = Math.min(Math.max(0, newDragOffset), maxDragOffset);

    setDragOffset(clampedOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const barData = [
    25, 30, 45, 60, 75, 80, 70, 65, 55, 60, 70, 85, 90, 80, 75, 60, 50, 45,
  ];

  return (
    <div
      className={`flex-1 w-full ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div className="flex flex-col gap-1 w-full relative">

        <div className="flex justify-between items-end w-full h-[60px] p-2">
          {barData.map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-500 rounded-sm mx-[1px]"
              style={{
                height: `${height}%`,
                opacity: dragOffset <= index * (timelineRef.current?.offsetWidth / totalMonths) && dragOffset + selectionWidth >= index * (timelineRef.current?.offsetWidth / totalMonths) ? 1 : 0.3,
              }}
            ></div>
          ))}
        </div>

        <div className="relative w-full h-[60px] flex items-center justify-center pt-8" ref={timelineRef}>
          <div className="w-full h-2 relative">
            <div className="w-full h-[1.5px] bg-gray-300 absolute top-1/2 -translate-y-1/2"></div>
            <div
              className="h-[3px] bg-blue-500 absolute top-1/2 -translate-y-1/2"
              style={{
                left: `${(dragOffset / timelineRef.current?.offsetWidth) * 100}%`,
                width: `${(selectionWidth / timelineRef.current?.offsetWidth) * 100}%`,
              }}
            ></div>

            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-3 bg-blue-500 rounded-full z-20 cursor-grab"
              style={{
                left: `${(dragOffset / timelineRef.current?.offsetWidth) * 100}%`,
                width: `${(selectionWidth / timelineRef.current?.offsetWidth) * 100}%`,
              }}
              onMouseDown={handleMouseDown}
              ref={handleRef}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-2 px-[11px] sm:px-[15px] md:px-[18px] lg:px-[22px]">
          {
            [
              { month: 'Jan', year: '2023' }, { month: 'Feb', year: '2023' }, { month: 'Mar', year: '2023' },
              { month: 'Apr', year: '2023' }, { month: 'May', year: '2023' }, { month: 'Jun', year: '2023' },
              { month: 'Jul', year: '2023' }, { month: 'Aug', year: '2023' }, { month: 'Sep', year: '2023' },
              { month: 'Oct', year: '2023' }, { month: 'Nov', year: '2023' }, { month: 'Dec', year: '2023' },
              { month: 'Jan', year: '2024' }, { month: 'Feb', year: '2024' }, { month: 'Mar', year: '2024' },
              { month: 'Apr', year: '2024' }, { month: 'May', year: '2024' }, { month: 'Jun', year: '2024' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col justify-start items-center text-center">
                <span className="text-sm font-bold leading-lg text-left text-blue-900 font-['Inter']">{item.month}</span>
                <span className="text-xs font-normal leading-lg text-left text-gray-400 font-['Inter']">{item.year}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;