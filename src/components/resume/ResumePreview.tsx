import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { MinimalClean } from '../templates/MinimalClean';
import { TechDeveloper } from '../templates/TechDeveloper';
import { CreativeModern } from '../templates/CreativeModern';
import { ExecutiveClassic } from '../templates/ExecutiveClassic';
import { DarkModePro } from '../templates/DarkModePro';
import { Timeline } from '../templates/Timeline';
import { CleanSidebar } from '../templates/CleanSidebar';
import { Infographic } from '../templates/Infographic';
import { ElegantPremium } from '../templates/ElegantPremium';
import { CompactOnePage } from '../templates/CompactOnePage';
export function ResumePreview() {
  const {
    resumeData,
    selectedTemplate,
    sectionOrder,
    updateSectionOrder
  } = useResume();
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8 // Prevent accidental drags when selecting text
    }
  }), useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  }), useSensor(KeyboardSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    const {
      active,
      over
    } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id as any);
      const newIndex = sectionOrder.indexOf(over.id as any);
      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      updateSectionOrder(newOrder);
    }
  };
  const renderTemplate = () => {
    const templateProps = {
      data: resumeData,
      sectionOrder,
      onDragEnd: handleDragEnd,
      sensors
    };
    switch (selectedTemplate) {
      case 'minimal-clean':
        return <MinimalClean {...templateProps} />;
      case 'tech-developer':
        return <TechDeveloper {...templateProps} />;
      case 'creative-modern':
        return <CreativeModern {...templateProps} />;
      case 'executive-classic':
        return <ExecutiveClassic {...templateProps} />;
      case 'dark-mode-pro':
        return <DarkModePro {...templateProps} />;
      case 'timeline':
        return <Timeline {...templateProps} />;
      case 'clean-sidebar':
        return <CleanSidebar {...templateProps} />;
      case 'infographic':
        return <Infographic {...templateProps} />;
      case 'elegant-premium':
        return <ElegantPremium {...templateProps} />;
      case 'compact-one-page':
        return <CompactOnePage {...templateProps} />;
      default:
        return <MinimalClean {...templateProps} />;
    }
  };
  return <div className="w-full h-full overflow-auto bg-gray-100 p-4 md:p-8 flex justify-center items-start">
      <div className="origin-top transform scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.75] xl:scale-[0.85] transition-transform duration-300 ease-in-out shadow-2xl">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
            {renderTemplate()}
          </SortableContext>
        </DndContext>
      </div>
    </div>;
}