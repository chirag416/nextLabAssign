import React, { useState } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { parseJsonToFileSystem } from './utils/fileSystemUtils';

const initialData = {
  Documents: [
    "Document1.jpg",
    "Document2.jpg",
    "Document3.jpg"
  ],
  Desktop: [
    "Screenshot1.jpg",
    "videopal.mp4"
  ],
  Downloads: {
    Drivers: [
      "Printerdriver.dmg",
      "cameradriver.dmg"
    ],
    Applications: [
      "Webstorm.dmg",
      "Pycharm.dmg",
      "FileZila.dmg",
      "Mattermost.dmg"
    ],
    "chromedriver.dmg": []
  }
};

function App() {
  const [fileSystem, setFileSystem] = useState(parseJsonToFileSystem(initialData));

  return (
    <div>
      <FileExplorer data={fileSystem} onUpdate={setFileSystem} />
    </div>
  );
}

export default App;
