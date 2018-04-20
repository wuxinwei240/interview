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
     * 循环公用if 
     * @param {String} ele 当前值
     * @param {Object} hashObj 哈希对象
     * @param {Number} y y轴值
     * @param {Number} x x轴值
     */
    const loopIf = (ele, hashObj, y, x) => {
        if(ele === type){
            hashObj[type].push(ele);
        }
        if(ele === 'e'){
            hashObj.e.push([y, x]);
        }
    }
    /**
     * 共用判断
     * @param {object} hashObj  哈希对象
     * @param {Number} length  长度
     * @param {Array} arr 数组
     */
    const commonIf = (hashObj, length, arr) => {
        if(hashObj[type].length === length && hashObj.e.length === 1 && !eObj[hashObj.e[0].join('')]){
            arr.push(hashObj.e[0]); 
            eObj[hashObj.e[0].join('')] = 'e';
        }
    }
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
            loopIf(ele, hashObj, j, m);
        })
        commonIf(hashObj, data[j].length - 1, rowArr);
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
                    loopIf(childEle, hashObj, m, n);
                }
            })
        })
        commonIf(hashObj, dataLength - 1, colArr);
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
            loopIf(item, hashObj1, m, m);
            item = null;
        }
        //2.东北到西南方向
        for(let n = 0; n < dataLength; n++) {
            let item = data[n][dataLength-n-1]
            loopIf(item, hashObj2, n, dataLength-n-1);
            item = null;
        }
        commonIf(hashObj1, dataLength - 1, diagonalArr);
        commonIf(hashObj2, dataLength - 1, diagonalArr);
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
};

const arr1 = [
['o', 'e', 'e'],
['e', 'x', 'o'],
['x', 'x', 'e']
];
const arr2 = [
    ['x', 'o', 'o'],
    ['x', 'x', 'e'],
    ['e', 'o', 'e']
];
const arr3 = [
    ['x', 'x', 'o'],
    ['e', 'e', 'e'],
    ['e', 'e', 'e']
];
const arr4 = [
    ['o', 'o', 'o'],
    ['e', 'e', 'e'],
    ['e', 'e', 'e']
];
const result1 = someFunction('x', arr1);
const result2 = someFunction('x', arr2);
const result3 = someFunction('x', arr3);
const result4 = someFunction('o', arr4);
console.log(result1, result2, result3, result4)