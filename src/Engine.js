const getRootNode = nodes =>
  nodes[Object.values(nodes).find(n => n.root === true).id]

export const engine = (nodes, nodeTypes) => {
  const root = getRootNode(nodes)
  console.log(Object.entries(root.connections.outputs))

  Object.entries(root.connections.outputs).forEach(([field, input]) => {
    input.forEach(({ nodeId, portName }) => {
      nodes[nodeId].inputData[portName].value = `row.${field}`
    })
  })

  let fn = `function transformRow(row, aws) {` + '\n\t'

  Object.values(nodes)
    .filter(val => !val.root && Object.values(val.inputData).every(val => val.value))
    .forEach(val => {
      if (val.type === 'aws' && !fn.startsWith('async')) fn = `async ${fn}`
      fn += `${resolveNodes(val)}\n\t`
    })

  fn += 'return row \n}'
  console.log(fn)
  return fn
}

export const resolveNodes = ({ type, inputData }) => {
  const mapping = inputData?.mapping?.value.startsWith('row')
    ? `[${inputData?.mapping?.value}]`
    : `.${inputData?.mapping?.value}`

  switch(type) {
    case 'and':
      return `row${mapping} = Boolean(${inputData.bool1.value} && ${inputData.bool2.value})`
    case 'or':
      return `row${mapping} = Boolean(${inputData.bool1.value} || ${inputData.bool2.value})`
    case 'textEquals':
      return `row${mapping} = ${inputData.text1.value} === ${inputData.text2.value}`
    case 'textSwitch':
      return `row${mapping} = ${inputData.boolean.value} ? ${inputData.text2.value} : ${inputData.text2.value}`

    case 'textJoin':
      return `row${mapping} = ${inputData.text1.value} + ${inputData.text2.value}`

    case 'add':
      return `row${mapping} = ${inputData.num1.value} + ${inputData.num2.value}`
    case 'subtract':
      return `row${mapping} = ${inputData.num1.value} - ${inputData.num2.value}`
    case 'multiply':
      return `row${mapping} = ${inputData.num1.value} * ${inputData.num2.value}`
    case 'divide':
      return `row${mapping} = ${inputData.num1.value} / ${inputData.num2.value}`

    case 'geo_point':
      return `row${mapping} = { lat: ${inputData.lat.value}, lon: ${inputData.lon.value} }`

    case 'aws':
      return `row$${mapping} = await aws.${[inputData.aws.value]}(${inputData.field.value})`

    case 'rename':
      return `row${mapping} = ${inputData.field.value} \n` +
        `delete row[${inputData.field.value}]`
    case 'delete':
      return `delete row[${inputData.field.value}]`
    default:
      return ''
  }
}
