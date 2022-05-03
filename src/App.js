import React from 'react';
import { NodeEditor } from 'flume';

import { config } from './FlumeConfig';
import { engine } from './Engine';
import { row } from './Data';

export function App() {
  const nodeEditor = React.useRef();
  const [generatedCode, setGeneratedCode] = React.useState('')

  const onClick = () => {
    const nodes = nodeEditor.current.getNodes();
    const code = engine(nodes, config.nodeTypes);
    setGeneratedCode(code)

  };

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <button onClick={onClick}>APPLY</button>
      <span> Right click to add node</span>
      <br />
      <br />
      <div style={{ height: '75vh'}}>

      <NodeEditor
        ref={nodeEditor}
        nodeTypes={config.nodeTypes}
        portTypes={config.portTypes}
        defaultNodes={[{ x: -900, y: -330, type: 'row', initialWidth: 90 }]}
        context={row}
      />
      </div>
      <pre>{generatedCode}</pre>
    </div>
  );
}
