import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialColumns = {
  todo: {
    name: "To Do",
    items: [
      { id: "1", content: "Design Homepage" },
      { id: "2", content: "Develop API" },
    ],
  },
  inprogress: {
    name: "In Progress",
    items: [{ id: "3", content: "Testing" }],
  },
  done: {
    name: "Done",
    items: [{ id: "4", content: "Deploy" }],
  },
};

const KANBAN_KEY = 'dashgenie_kanban';

function KanbanCard({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white dark:bg-gray-700 rounded p-3 mb-3 shadow cursor-pointer"
      title={content}
    >
      {content}
    </div>
  );
}

const Kanban = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(KANBAN_KEY);
    return saved ? JSON.parse(saved) : initialColumns;
  });
  const [search, setSearch] = useState('');

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    localStorage.setItem(KANBAN_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    let fromCol, toCol, fromIdx, toIdx;
    Object.entries(columns).forEach(([colId, col]) => {
      col.items.forEach((item, idx) => {
        if (item.id === active.id) {
          fromCol = colId;
          fromIdx = idx;
        }
        if (item.id === over.id) {
          toCol = colId;
          toIdx = idx;
        }
      });
    });

    if (fromCol && toCol) {
      if (fromCol === toCol) {
        const newItems = arrayMove(columns[fromCol].items, fromIdx, toIdx);
        setColumns({
          ...columns,
          [fromCol]: { ...columns[fromCol], items: newItems },
        });
      } else {

        const fromItems = [...columns[fromCol].items];
        const toItems = [...columns[toCol].items];
        const [moved] = fromItems.splice(fromIdx, 1);
        toItems.splice(toIdx, 0, moved);
        setColumns({
          ...columns,
          [fromCol]: { ...columns[fromCol], items: fromItems },
          [toCol]: { ...columns[toCol], items: toItems },
        });
      }
    }
  };

  const getFilteredColumns = () => {
    if (!search) return columns;
    const filtered = {};
    Object.entries(columns).forEach(([colId, col]) => {
      filtered[colId] = {
        ...col,
        items: col.items.filter(item => item.content.toLowerCase().includes(search.toLowerCase())),
      };
    });
    return filtered;
  };
  const filteredColumns = getFilteredColumns();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 rounded border dark:bg-gray-900 dark:text-gray-100"
          title="Type to filter tasks"
        />
      </div>
      <div className="flex gap-4">
        {Object.entries(filteredColumns).map(([colId, col]) => (
          <div
            key={colId}
            className="bg-gray-100 dark:bg-gray-800 rounded p-4 w-72 min-h-[300px]"
          >
            <h3 className="font-semibold mb-4">{col.name}</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={col.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {col.items.map((item) => (
                  <KanbanCard key={item.id} id={item.id} content={item.content} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;