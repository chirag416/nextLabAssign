// utils/fileSystemUtils.js

export const parseJsonToFileSystem = (data) => {
    const parseNode = (key, value) => {
      if (Array.isArray(value)) {
        return {
          name: key,
          type: 'folder',
          children: value.map((file) => ({
            name: file,
            type: 'file'
          }))
        };
      } else if (typeof value === 'object') {
        return {
          name: key,
          type: 'folder',
          children: Object.entries(value).map(([childKey, childValue]) =>
            parseNode(childKey, childValue)
          )
        };
      }
      return { name: key, type: 'file' };
    };
  
    return Object.entries(data).map(([key, value]) => parseNode(key, value));
  };
  