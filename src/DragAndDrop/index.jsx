import { useState } from "react";

const DragAndDrop = () => {
  const items = Array.from({ length: 5 }, (_, i) => `item ${i + 1}`);
  const [progressItems, setProgressItems] = useState(items);
  const [completedItem, setCompletedItem] = useState([]);
  const [currentDragItem, setCurrentDragItem] = useState(null);

  const dragStart = (index, isCompleted = false) => {
    setCurrentDragItem({ index, isCompleted });
  };

  const dragEnd = (type) => {
    if (!currentDragItem) return;

    const { index, isCompleted } = currentDragItem;

    if (type === "Progress" && isCompleted) {
      // Move from completed to progress
      const itemToMove = completedItem[index];
      setProgressItems((p) => [...p, itemToMove]);
      setCompletedItem((p) => p.filter((_, i) => i !== index));
    } else if (type === "Completed" && !isCompleted) {
      // Move from progress to completed
      const itemToMove = progressItems[index];
      setCompletedItem((p) => [...p, itemToMove]);
      setProgressItems((p) => p.filter((_, i) => i !== index));
    }

    setCurrentDragItem(null);
  };

  return (
    <div className="containerMain">
      <div className="part1 common">
        <h1>Progress</h1>
        <div
          className="container"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={() => dragEnd("Progress")}
        >
          {progressItems.map((item, index) => (
            <div
              className="item"
              key={item}
              draggable
              onDragStart={() => dragStart(index, false)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="part2 common">
        <h1>Completed</h1>
        <div
          className="container"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={() => dragEnd("Completed")}
        >
          {completedItem.map((item, index) => (
            <div
              className="item"
              key={item}
              style={{ userSelect: "none" }}
              draggable
              onDragStart={() => dragStart(index, true)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
