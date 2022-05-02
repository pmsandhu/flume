import React from "react";
import { FlumeConfig, Colors, Controls, NodeEditor } from "flume";

export const config = new FlumeConfig()
config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.green,
    controls: [
      Controls.text({
        name: "string",
        label: "Text"
      })
    ]
  })
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: 'compose',
    label: 'Compose',
    description: "Composes a parameterized string of text",
    initialWidth: 230,
    inputs: ports => data => {
      const template = (data && data.template && data.template.string) || '';
      const re = /\{(.*?)\}/g;
      let res, ids = []
      while ((res = re.exec(template)) !== null) {
        if (!ids.includes(res[1])) ids.push(res[1]);
      }
      return [
        ports.string({ name: "template", label: "Template", hidePort: true }),
        ...ids.map(id => ports.string({ name: id, label: id }))
      ];
    },
    outputs: ports => [ports.string({ label: 'Message' })]
  })