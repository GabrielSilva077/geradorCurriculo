import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
interface DraggableSectionProps {
  id: string;
  children: ReactNode;
  isDragging?: boolean;
}
export function DraggableSection({
  id,
  children
}: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return <div ref={setNodeRef} style={style} className={`relative group ${isDragging ? 'z-50' : 'z-0'}`}>
      {/* Drag Handle */}
      <motion.div className={`
          absolute -left-8 top-4 w-6 h-6 flex items-center justify-center
          rounded cursor-grab active:cursor-grabbing
          opacity-0 group-hover:opacity-100 transition-opacity
          ${isDragging ? 'opacity-100' : ''}
        `} whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.95
    }} {...attributes} {...listeners}>
        <GripVertical size={20} className={`
            text-gray-400 hover:text-gray-600 transition-colors
            ${isDragging ? 'text-blue-500' : ''}
          `} />
      </motion.div>

      {/* Content with visual feedback during drag */}
      <div className={`
          transition-all duration-200
          ${isDragging ? 'shadow-2xl ring-2 ring-blue-500 ring-opacity-50 scale-[1.02]' : ''}
        `}>
        {children}
      </div>
    </div>;
}