import React from 'react';

import { Colors, Controls, FlumeConfig } from 'flume';

export const config = new FlumeConfig();

config
  .addPortType({
    type: 'integer',
    name: 'integer',
    label: 'Number',
    color: Colors.red,
    controls: [
      Controls.number({
        name: 'integer',
        label: 'Number'
      })
    ]
  })
  .addPortType({
    type: 'float',
    name: 'float',
    label: 'Number',
    color: Colors.red,
    controls: [
      Controls.number({
        name: 'float',
        label: 'Number'
      })
    ]
  })
  .addPortType({
    type: 'keyword',
    name: 'keyword',
    label: 'Text',
    color: Colors.green,
    controls: [
      Controls.text({
        name: 'keyword',
        label: 'Text'
      })
    ]
  })
  .addPortType({
    type: 'boolean',
    name: 'boolean',
    label: 'Boolean',
    color: Colors.blue,
    controls: [Controls.checkbox({ name: 'boolean', label: 'Boolean' })]
  })
  .addPortType({
    type: 'geo_point',
    name: 'geo_point',
    label: 'Geopoint',
    color: Colors.yellow
  })
  .addPortType({
    type: 'aws',
    name: 'aws',
    label: 'AWS Comprehend Function',
    color: Colors.orange,
    controls: [
      Controls.select({
        name: 'aws',
        label: 'AWS Comprehend',
        options: [
          { value: 'getSentiment', label: 'Get Sentiment' },
          { value: 'detectEntity', label: 'Detect Entity' },
          { value: 'detectKeyPhrases', label: 'Detect Key Phrases' },
          { value: 'detectPiiEntities', label: 'Detect Pii Entities' },
          { value: 'detectSyntax', label: 'Detect Syntax' }
        ]
      })
    ]
  })
  .addNodeType({
    type: 'geo_point',
    label: 'Geopoint',
    description: 'Creates a geopoint',
    initialWidth: 180,
    inputs: ports => [
      ports.integer({ name: 'latitude', label: 'Latitude' }),
      ports.integer({ name: 'longitude', label: 'Longitude' }),
      ports.keyword({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.geo_point()]
  })
  .addNodeType({
    type: 'aws',
    label: 'AWS Comprehend',
    description: 'AWS Comprehend Function',
    initialWidth: 190,
    inputs: ports => [
      ports.keyword({ name: 'field' }),
      ports.aws({ name: 'fn' }),
      ports.keyword({ name: 'mapping', label: 'Mapping Name' })
    ]
  })
  .addNodeType({
    type: 'keyword',
    label: 'Text',
    description: 'Outputs a keyword value',
    initialWidth: 170,
    inputs: ports => [ports.keyword()],
    outputs: ports => [ports.keyword()]
  })
  .addNodeType({
    type: 'number',
    label: 'Number',
    description: 'Outputs a number',
    initialWidth: 150,
    inputs: ports => [ports.integer()],
    outputs: ports => [ports.integer()]
  })
  .addNodeType({
    type: 'boolean',
    label: 'Boolean',
    description: 'Outputs a boolean value',
    initialWidth: 150,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })

  .addNodeType({
    type: 'addNumbers',
    label: 'Add Numbers',
    description: 'Adds two numbers together',
    initialWidth: 150,
    inputs: ports => [
      ports.integer({ name: 'num1' }),
      ports.integer({ name: 'num2' })
    ],
    outputs: ports => [ports.integer({ name: 'result' })]
  })
  .addNodeType({
    type: 'subtractNumbers',
    label: 'Subtract Numbers',
    description: 'Subtracts one number from another',
    initialWidth: 150,
    inputs: ports => [
      ports.integer({ name: 'num1' }),
      ports.integer({ name: 'num2' })
    ],
    outputs: ports => [ports.integer({ name: 'result' })]
  })
  .addNodeType({
    type: 'multiplyNumbers',
    label: 'Multiply Numbers',
    description: 'Multiplies one number by another',
    initialWidth: 150,
    inputs: ports => [
      ports.integer({ name: 'num1' }),
      ports.integer({ name: 'num2' })
    ],
    outputs: ports => [ports.integer({ name: 'result' })]
  })
  .addNodeType({
    type: 'divideNumbers',
    label: 'Divide Numbers',
    description: 'Divides one number by another',
    initialWidth: 150,
    inputs: ports => [
      ports.integer({ name: 'num1' }),
      ports.integer({ name: 'num2' })
    ],
    outputs: ports => [ports.integer({ name: 'result' })]
  })
  .addNodeType({
    type: 'mathResult',
    label: 'Math Result',
    description: 'Calculates a math result',
    initialWidth: 130,
    inputs: ports => [ports.integer()]
  })

  .addNodeType({
    type: 'stringEquals',
    label: 'Text Equals',
    description: 'Outputs if text equals another string of text.',
    initialWidth: 170,
    sortIndex: 33,
    inputs: ports => [
      ports.keyword({ name: 'string1', label: 'First String' }),
      ports.keyword({ name: 'string2', label: 'Second String' }),
      ports.boolean({ name: 'caseSensitive' })
    ],
    outputs: ports => [ports.boolean({ name: 'result' })]
  })

  .addNodeType({
    type: 'joinText',
    label: 'Join Text',
    description: 'Joins two strings into one string',
    initialWidth: 180,
    inputs: ports => [
      ports.keyword({ name: 'string1', label: 'First half' }),
      ports.keyword({ name: 'string2', label: 'Second half' }),
      ports.keyword({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.keyword({ name: 'result', label: 'Joined Text' })]
  })
  .addNodeType({
    type: 'textSwitch',
    label: 'Text Switch',
    description: 'Outputs one string if true, or a different string if false',
    initialWidth: 180,
    inputs: ports => [
      ports.boolean({ name: 'test', label: 'Test' }),
      ports.keyword({ name: 'string1', label: 'Text if true' }),
      ports.keyword({ name: 'string2', label: 'Text if false' })
    ],
    outputs: ports => [ports.keyword({ name: 'result' })]
  })
  .addNodeType({
    type: 'and',
    label: 'And',
    description: 'Outputs if two booleans are true',
    initialWidth: 150,
    inputs: ports => [
      ports.boolean({ name: 'bool1' }),
      ports.boolean({ name: 'bool2' })
    ],
    outputs: ports => [ports.boolean({ name: 'result' })]
  })
  .addNodeType({
    type: 'or',
    label: 'Or',
    description: 'Outputs if either boolean is true',
    initialWidth: 150,
    inputs: ports => [
      ports.boolean({ name: 'bool1' }),
      ports.boolean({ name: 'bool2' })
    ],
    outputs: ports => [ports.boolean({ name: 'result' })]
  })
  .addNodeType({
    type: 'compose',
    label: 'Compose',
    description: 'Composes a parameterized string of text',
    initialWidth: 230,
    inputs: ports => data => {
      const template = (data && data.template && data.template.keyword) || '';
      const re = /\{(.*?)\}/g;
      let res,
        ids = [];
      while ((res = re.exec(template)) !== null) {
        if (!ids.includes(res[1])) ids.push(res[1]);
      }
      return [
        ports.keyword({ name: 'template', label: 'Template', hidePort: true }),
        ...ids.map(id => ports.keyword({ name: id, label: id }))
      ];
    },
    outputs: ports => [ports.keyword({ label: 'Message' })]
  })
  .addRootNodeType({
    type: 'row',
    label: 'Row',
    description: 'Represents a row from the data',
    addable: true,
    initialWidth: 180,
    outputs: ports => (inputData, connections, context) => {
      return context.map(val =>
        ports[val.type]({ name: val.name, label: val.name })
      );
    }
  });
