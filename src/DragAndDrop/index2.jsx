import React, { useState, useCallback } from "react";

const DragAndDrop = () => {
  const [progressItems, setProgressItems] = useState(
    Array.from({ length: 5 }, (_, i) => `item ${i + 1}`)
  );
  const [completedItems, setCompletedItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = useCallback((index, isCompleted) => {
    setDraggedItem({ index, isCompleted });
  }, []);

  const handleDrop = useCallback((targetType) => {
    if (!draggedItem) return;

    const { index, isCompleted } = draggedItem;
    const isMovingToProgress = targetType === "Progress" && isCompleted;
    const isMovingToCompleted = targetType === "Completed" && !isCompleted;

    if (isMovingToProgress) {
      const item = completedItems[index];
      setProgressItems(prev => [...prev, item]);
      setCompletedItems(prev => prev.filter((_, i) => i !== index));
    } else if (isMovingToCompleted) {
      const item = progressItems[index];
      setCompletedItems(prev => [...prev, item]);
      setProgressItems(prev => prev.filter((_, i) => i !== index));
    }

    setDraggedItem(null);
  }, [draggedItem, completedItems, progressItems]);

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const renderItems = (items, isCompleted) =>
    items.map((item, index) => (
      <div
        className="item"
        key={`${item}-${isCompleted}`}
        draggable
        onDragStart={() => handleDragStart(index, isCompleted)}
      >
        {item}
      </div>
    ));

  return (
    <div className="containerMain">
      <div className="part1 common">
        <h1>Progress</h1>
        <div
          className="container"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("Progress")}
        >
          {renderItems(progressItems, false)}
        </div>
      </div>
      <div className="part2 common">
        <h1>Completed</h1>
        <div
          className="container"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("Completed")}
        >
          {renderItems(completedItems, true)}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;