import { useState, useCallback, useRef } from 'react';

// Drag and Drop with Reorder

const DragDrop = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Drag me 1' },
    { id: 2, text: 'Drag me 2' },
    { id: 3, text: 'Drag me 3' }
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const listRef = useRef();

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Required!
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((dropIndex) => {
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    
    // Remove dragged item
    newItems.splice(draggedIndex, 1);
    // Insert at drop position
    newItems.splice(dropIndex, 0, draggedItem);
    
    setItems(newItems);
    setDraggedIndex(null);
  }, [items, draggedIndex]);

  const handleDragEnd = () => setDraggedIndex(null);

  return (
    <div className="p-8 max-w-md mx-auto bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-8">Drag & Drop</h1>
      
      <ul 
        ref={listRef}
        className="w-full max-w-sm bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl space-y-2"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={`p-4 rounded-xl cursor-move transition-all ${
              draggedIndex === index
                ? 'bg-yellow-400/80 scale-105 shadow-lg'
                : 'bg-white/50 hover:bg-white/70 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {item.text} #{index + 1}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-white/80 text-sm">
        Drag items to reorder ✨ Native HTML5
      </p>
    </div>
  );
};

export default DragDrop;
