function AdjacencyMatrix(index, nodes) {

  const length = nodes.length;

  const nodesFirst = new Array();
  const res = new Array();


  nodes.forEach(i => {
    i.forEach(j => {

      nodesFirst.push(j);
    })
  })

  let answer = getRes(index, 0, 1, nodesFirst, length)
  if (answer !== -1) {
    let answerArray = new Array(Math.floor(answer / length), answer % length)
    res.push(answerArray)
  }

  answer = getRes(index, 0, length, nodesFirst, length)

  if (answer !== -1) {
    let answerArray = new Array(Math.floor(answer / length), answer % length)

    res.push(answerArray)
  }

  for (let i = 1; i < nodesFirst.length; i++) {


    if (i % length === 0) {
      answer = getRes(index, i, 1, nodesFirst, length)
      if (answer !== -1) {
        let answerArray = new Array(Math.floor(answer / length), answer % length)

        res.push(answerArray)
      }
    } else if (i < length) {
      answer = getRes(index, i % length, length, nodesFirst, length)
      if (answer !== -1) {
        let answerArray = new Array(Math.floor(answer / length), answer % length)

        res.push(answerArray)
      }
    }



  }

  answer = getRes(index, 0, length + 1, nodesFirst)

  if (answer !== -1) {
    res.push(Math.floor(answer / length), answer % length)
  }

  answer = getRes(index, length - 1, length - 1, nodesFirst)

  if (answer !== -1) {
    res.push(Math.floor(answer / length), answer % length)
  }

  return res



}

function getRes(n, start, tolerance, nodes, length) {

  let answer = -1,
    count = 0

  if (nodes[start] !== 'e' && n !== nodes[start]) {
    return answer
  }


  for (let i = start; i < nodes.length && count < length; i += tolerance) {

    count++

    if (nodes[i] !== n && nodes[i] !== 'e') {
      break;
    }

    if (nodes[i] === 'e' && answer === -1) {
      answer = i
    } else if (nodes[i] === 'e' && answer !== -1) {
      answer = -1
      break;
    }


  }

  return answer
}

module.exports = AdjacencyMatrix