import React, { useState } from 'react';
import { FiChevronRight, FiChevronDown, FiFolder, FiFile, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export const TreeNode = ({ node, level, onDelete, onAdd, onRename }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleRename = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onRename(node, newName);
      setIsEditing(false);
    }
  };

  return (
    <div className="select-none">
      <div
        className="group flex items-center gap-1 py-1 px-2 hover:bg-gray-600 rounded transition-colors"
        style={{ paddingLeft: `${level * 1.5}rem` }}
      >
        <div className="flex items-center gap-1">
          {node.type === 'folder' && (
            <button 
              onClick={handleToggle} 
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <FiChevronDown className="w-4 h-4" />
              ) : (
                <FiChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          {node.type === 'folder' ? (
            <FiFolder className="w-4 h-4 text-blue-500" />
          ) : (
            <FiFile className="w-4 h-4 text-gray-500" />
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleRename} className="flex-1">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsEditing(false);
                  setNewName(node.name);
                }
              }}
            />
          </form>
        ) : (
          <span className="flex-1 px-2">{node.name}</span>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {node.type === 'folder' && (
            <>
              <button
                onClick={() => onAdd(node, 'file')}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Add File"
              >
                <FiPlus className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => onAdd(node, 'folder')}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Add Folder"
              >
                <FiFolder className="w-4 h-4 text-green-600" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Rename"
          >
            <FiEdit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(node)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              onDelete={onDelete}
              onAdd={onAdd}
              onRename={onRename}
            />
          ))}
        </div>
      )}
    </div>
  );
};
