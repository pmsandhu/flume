// import React from 'react'
import { Colors, Controls, FlumeConfig } from 'flume'

export const config = new FlumeConfig()

config
  .addPortType({
    type: 'number',
    name: 'number',
    label: 'Number',
    color: Colors.red,
    controls: [Controls.number({ name: 'value', label: 'Number' })]
  })
  .addPortType({
    type: 'text',
    name: 'text',
    label: 'Text',
    color: Colors.green,
    controls: [Controls.text({ name: 'value', label: 'Text' })]
  })
  .addPortType({
    type: 'boolean',
    name: 'boolean',
    label: 'Boolean',
    color: Colors.blue,
    controls: [Controls.checkbox({ name: 'value', label: 'Boolean' })]
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
        name: 'value',
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
    type: 'text',
    label: 'Text',
    description: 'Outputs a text value',
    initialWidth: 170,
    inputs: ports => [ports.text()],
    outputs: ports => [ports.text()]
  })
  .addNodeType({
    type: 'number',
    label: 'Number',
    description: 'Outputs a number',
    initialWidth: 150,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
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
    type: 'add',
    label: 'Add Numbers',
    description: 'Adds two numbers together',
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: 'num1' }),
      ports.number({ name: 'num2' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.number({ name: 'result' })]
  })
  .addNodeType({
    type: 'subtract',
    label: 'Subtract Numbers',
    description: 'Subtracts one number from another',
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: 'num1' }),
      ports.number({ name: 'num2' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.number({ name: 'result' })]
  })
  .addNodeType({
    type: 'multiply',
    label: 'Multiply Numbers',
    description: 'Multiplies one number by another',
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: 'num1' }),
      ports.number({ name: 'num2' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.number({ name: 'result' })]
  })
  .addNodeType({
    type: 'divide',
    label: 'Divide Numbers',
    description: 'Divides one number by another',
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: 'num1' }),
      ports.number({ name: 'num2' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.number({ name: 'result' })]
  })

  .addNodeType({
    type: 'stringEquals',
    label: 'Text Equals',
    description: 'Outputs if text equals another string of text.',
    initialWidth: 170,
    sortIndex: 33,
    inputs: ports => [
      ports.text({ name: 'text1', label: 'First String' }),
      ports.text({ name: 'text2', label: 'Second String' }),
    ],
    outputs: ports => [ports.boolean({ name: 'result' })]
  })
  .addNodeType({
    type: 'joinText',
    label: 'Join Text',
    description: 'Joins two strings into one string',
    initialWidth: 180,
    inputs: ports => [
      ports.text({ name: 'text1', label: 'First half' }),
      ports.text({ name: 'text2', label: 'Second half' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.text({ name: 'result', label: 'Joined Text' })]
  })
  .addNodeType({
    type: 'textSwitch',
    label: 'Text Switch',
    description: 'Outputs one string if true, or a different string if false',
    initialWidth: 180,
    inputs: ports => [
      ports.boolean({ name: 'boolean', label: 'Test' }),
      ports.text({ name: 'text1', label: 'Text if true' }),
      ports.text({ name: 'text2', label: 'Text if false' })
    ],
    outputs: ports => [ports.text({ name: 'result' })]
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
    type: 'geo_point',
    label: 'Geopoint',
    description: 'Creates a geopoint',
    initialWidth: 180,
    inputs: ports => [
      ports.number({ name: 'lat', label: 'Latitude' }),
      ports.number({ name: 'lon', label: 'Longitude' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ],
    outputs: ports => [ports.geo_point()]
  })
  .addNodeType({
    type: 'aws',
    label: 'AWS Comprehend',
    description: 'AWS Comprehend Function',
    initialWidth: 190,
    inputs: ports => [
      ports.text({ name: 'field', label: 'Field' }),
      ports.aws({ name: 'aws' }),
      ports.text({ name: 'mapping', label: 'Mapping Name' })
    ]
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
      )
    }
  })

 