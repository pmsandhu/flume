import React from 'react';
import { NodeEditor } from 'flume';

import { config } from './FlumeConfig';
import { engine } from './Engine';
import { row } from './Data';

export function App() {
  const nodeEditor = React.useRef();

  const onClick = () => {
    const nodes = nodeEditor.current.getNodes();
    engine(nodes, config.nodeTypes);
  };

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <button onClick={onClick}>APPLY</button>
      <span> Right click to add node</span>
      <br />
      <br />
      <NodeEditor
        ref={nodeEditor}
        nodeTypes={config.nodeTypes}
        portTypes={config.portTypes}
        defaultNodes={[{ x: -330, y: -360, type: 'row', initialWidth: 90 }]}
        context={row}
      />
    </div>
  );
}
