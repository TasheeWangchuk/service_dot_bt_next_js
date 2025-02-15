import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Check, Loader2 } from 'lucide-react';

interface ItemListProps {
  title: string;                          // Title of the list (e.g., "Services", "Skills")
  items: string[];                        // Initial items
  onAdd?: (item: string) => Promise<void>;    // Handler for adding items
  onRemove?: (index: number) => Promise<void>; // Handler for removing items
  placeholder?: string;                   // Placeholder text for input
  className?: string;                     // Additional container className
  maxItems?: number;                      // Maximum number of items allowed
  gridCols?: number;                      // Number of grid columns (default: 2)
  loading?: boolean;                      // Loading state
}

const ItemList: React.FC<ItemListProps> = ({
  title,
  items: initialItems = [],
  onAdd,
  onRemove,
  placeholder = "Add new item",
  className = "",
  maxItems = Infinity,
  gridCols = 4,
  loading: externalLoading = false,
}) => {
  const [items, setItems] = useState<string[]>(initialItems);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleAddItem = async () => {
    if (newItem.trim() && items.length < maxItems) {
      setIsLoading(true);
      try {
        if (onAdd) {
          await onAdd(newItem.trim());
        }
        setItems([...items, newItem.trim()]);
        setNewItem("");
      } catch (error) {
        console.error(`Error adding ${title.toLowerCase()}:`, error);
      }
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (index: number) => {
    try {
      if (onRemove) {
        await onRemove(index);
      }
      setItems(items.filter((_, i) => i !== index));
    } catch (error) {
      console.error(`Error removing ${title.toLowerCase()}:`, error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newItem.trim()) {
      handleAddItem();
    }
  };

  const gridClassName = `grid grid-cols-1 md:grid-cols-${gridCols} gap-4`;

  return (
    <div className={`p-6 bg-gray-100 rounded-md ${className}`}>
      <div className="flex items-center justify-between mb-8">
        {/* <h2 className="text-xl font-bold text-gray-800">{title}</h2> */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-green-600">Done</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2 text-orange-500" />
              <span className="text-orange-600">Edit</span>
            </>
          )}
        </button>
      </div>

      {(isLoading || externalLoading) && !items.length ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className={gridClassName}>
          {items.map((item, index) => (
            <div
              key={index}
              className="relative group p-4 bg-gray-50 rounded-xl transition-all duration-300
                hover:bg-gray-100 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">{item}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      p-1 rounded-full hover:bg-red-100"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 
                border border-gray-200 rounded-lg focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={items.length >= maxItems}
            />
            <button
              onClick={handleAddItem}
              disabled={!newItem.trim() || isLoading || items.length >= maxItems}
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg
                transition-colors duration-200 hover:bg-orange-600 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50
                disabled:cursor-not-allowed disabled:hover:bg-blue-500"
            >
              Add {title.slice(0, -1)}
            </button>
          </div>
          {items.length >= maxItems && (
            <p className="mt-2 text-sm text-red-500">
              Maximum number of items ({maxItems}) reached
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemList;