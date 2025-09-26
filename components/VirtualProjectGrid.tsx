'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: 'completed' | 'ongoing';
  description: string;
}

interface VirtualProjectGridProps {
  projects: Project[];
  searchQuery: string;
  highlightSearchTerms: (text: string, query: string) => React.ReactNode;
}

export default function VirtualProjectGrid({
  projects,
  searchQuery,
  highlightSearchTerms
}: VirtualProjectGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  // Determine number of columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Calculate rows from projects
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += columns) {
    rows.push(projects.slice(i, i + columns));
  }

  // Setup virtualizer for rows
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 380, // Estimated height of each row
    overscan: 2, // Render 2 rows outside of view for smoother scrolling
  });

  return (
    <div
      ref={parentRef}
      className="h-[800px] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-1`}>
                {row.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-[#00C9C9] transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col h-[350px]"
                  >
                    {/* Card Content - Flex grow to push footer down */}
                    <div className="px-6 pt-6 pb-4 flex-grow flex flex-col">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                        </span>
                        <span className="text-sm text-gray-500">{project.year}</span>
                      </div>

                      {/* Project Name */}
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#005F73] transition-colors">
                        {highlightSearchTerms(project.name, searchQuery)}
                      </h3>

                      {/* Description - Fixed height with line clamp */}
                      <div className="mb-4 min-h-[2.5rem]">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {highlightSearchTerms(project.description, searchQuery)}
                        </p>
                      </div>

                      {/* Project Details - Push to bottom of card content */}
                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Type</span>
                          <span className="text-sm font-medium text-gray-700 text-right">
                            {highlightSearchTerms(project.type, searchQuery)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Location</span>
                          <span className="text-sm font-medium text-gray-700">
                            {highlightSearchTerms(project.location, searchQuery)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Capacity</span>
                          <span className="text-sm font-medium text-[#005F73]">{project.capacity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Value Footer - Always at bottom */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Project Value</span>
                        <span className="text-lg font-bold text-[#005F73]">{project.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Empty cells for incomplete rows */}
                {Array.from({ length: columns - row.length }).map((_, i) => (
                  <div key={`empty-${virtualRow.index}-${i}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}