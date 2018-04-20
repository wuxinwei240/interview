/**
 * homework
 * @param {String} type 
 * @param {Array} data 
 * return [[],[]]
 */
const someFunction = (type, data) => {
    let rowArr = [];
    let colArr = [];
    let diagonalArr = [];
    let eObj = {};
    let returnArr = null;
    const dataLength = data.length;
    /**
     * 行
     * @param {Number} j
     */
    const row = (j) => {
        let hashObj = {
            [`${type}`]: [],
            'e' : [],
        };
        data[j].forEach((ele, m) => {
            if(ele === type){
                hashObj[type].push(ele);
            }
            if(ele === 'e'){
                hashObj.e.push([j, m]);
            }
        })
        if(hashObj[type].length === data[j].length - 1 && hashObj.e.length === 1 && !eObj[hashObj.e[0].join('')]){
            rowArr.push(hashObj.e[0]); 
            eObj[hashObj.e[0].join('')] = 'e';
        }
        hashObj = null;
    }
    /**
     * 栏
     * @param {Number} i
     */
    const col = (i) => {
        let hashObj = {
            [`${type}`]: [],
            'e' : [],
        };
        data.forEach((ele, m) => {
            data[m].forEach((childEle, n) => {
                if(n === i){
                    if(childEle === type){
                        hashObj[type].push(ele);
                    }
                    if(childEle === 'e'){
                        hashObj.e.push([m, n]);
                    }
                }
            })
        })
        if(hashObj[type].length === dataLength - 1 && hashObj.e.length === 1 && !eObj[hashObj.e[0].join('')]){
            colArr.push(hashObj.e[0]);  
            eObj[hashObj.e[0].join('')] = 'e';
        }
        hashObj = null;
    }
    /**
     * 对角   对角分2种
     * 1.西北到东南方向
     * 2.东北到西南方向
     * 先筛选出对角元素。
     */
    const diagonal = () => {
        let hashObj1 = {
            [`${type}`]: [],
            'e' : [],
        };
        let hashObj2 = {
            [`${type}`]: [],
            'e' : [],
        };
        // 1.西北到东南方向
        for(let m = 0 ; m < dataLength; m++) {
            let item = data[m][m];
            if(item === type){
                hashObj1[`${type}`].push(item);
            }   
            if(item === 'e'){
                hashObj1.e.push([m, m]);
            }
            item = null;
        }
        //2.东北到西南方向
        for(let n = 0; n < dataLength; n++) {
            let item = data[n][dataLength-n-1]
            if(item === type){
                hashObj2[`${type}`].push(item);
            }
            if(item === 'e'){
                hashObj2.e.push([n, dataLength-n-1]);
            }
            item = null;
        }
        if(hashObj1[type].length === dataLength - 1 && hashObj1.e.length === 1 && !eObj[hashObj1.e[0].join('')]){
            diagonalArr.push(hashObj1.e[0]);  
            eObj[hashObj1.e[0].join('')] = 'e';
        }
        if(hashObj2[type].length === dataLength - 1 && hashObj2.e.length === 1 && !eObj[hashObj2.e[0].join('')]){
            diagonalArr.push(hashObj2.e[0]);  
            eObj[hashObj2.e[0].join('')] = 'e';
        }
        hashObj1 = null;
        hashObj2 = null;
    }
    data.forEach((ele, j) => {
        ele.forEach((childEle, i) => { 
            if(childEle === type) {
                row(j); col(i);
            }
        });
    });
    diagonal();
    returnArr = rowArr.concat(colArr, diagonalArr);
    console.log(eObj);
    rowArr = null;
    colArr = null;
    diagonalArr = null;
    eObj = null;
    return returnArr;
}

const arr1 = [
['o', 'e', 'e'],
['e', 'x', 'x'],
['x', 'x', 'e']];

const result = someFunction('x', arr1);
console.log(result)