import React from 'react';
import { TreeNode } from './TreeNode';

export const FileExplorer = ({ data, onUpdate }) => {
  const handleDelete = (nodeToDelete) => {
    const deleteNode = (nodes) => {
      return nodes.filter((node) => node !== nodeToDelete).map((node) => ({
        ...node,
        children: node.children ? deleteNode(node.children) : undefined
      }));
    };
    onUpdate(deleteNode(data));
  };

  const handleAdd = (parentNode, type) => {
    const newName = type === 'file' ? 'New File' : 'New Folder';
    const newNode = {
      name: newName,
      type,
      ...(type === 'folder' ? { children: [] } : {})
    };

    const addNode = (nodes) => {
      if (parentNode === null) {
        return [...nodes, newNode];
      } else {
        return nodes.map((node) => {
          if (node === parentNode) {
            return {
              ...node,
              children: [...(node.children || []), newNode]
            };
          }
          return {
            ...node,
            children: node.children ? addNode(node.children) : undefined
          };
        });
      }
    };

    onUpdate(addNode(data));
  };

  const handleRename = (node, newName) => {
    const renameNode = (nodes) => {
      return nodes.map((n) => {
        if (n === node) {
          return { ...n, name: newName };
        }
        return {
          ...n,
          children: n.children ? renameNode(n.children) : undefined
        };
      });
    };
    onUpdate(renameNode(data));
  };

  const isFileSystemEmpty = data.length === 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="w-1/4 bg-gray-800 rounded-lg shadow-lg p-4 h-full">
        <h2 className="text-xl font-semibold mb-4">File Explorer</h2>
        <div className="border rounded bg-gray-700 h-full">
          {isFileSystemEmpty ? (
            <div className="text-center p-4 text-gray-400">
              <p>No files or folders available. Add a new folder.</p>
              <button
                onClick={() => handleAdd(null, 'folder')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Folder
              </button>
            </div>
          ) : (
            data.map((node, index) => (
              <TreeNode
                key={`${node.name}-${index}`}
                node={node}
                level={0}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onRename={handleRename}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
