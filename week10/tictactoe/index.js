var patten = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
var color = 1;
var board = document.getElementById('board');

function show() {
    board.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = 
                patten[i][j] === 2 ? 'X' :
                patten[i][j] === 1 ? 'O' : '';
            cell.addEventListener('click', () => move(j, i));
            board.appendChild(cell);
        }
        board.appendChild(document.createElement('br'));
    }
}
function check(patten, color) {
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (patten[i][j] != color) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (patten[j][i] != color) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (patten[j][j] != color) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (patten[j][2 - j] != color) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    return false;
}
function move(x, y) {
    if (patten[y][x] !== 0) return;
    patten[y][x] = color;
    if (check(patten, color)) {
        alert(color === 2 ? 'X is win' : 'O is win');
    }
    color = 3 - color;
    show();
    computeMove() 
}

function clone(patten) {
    return JSON.parse(JSON.stringify(patten));
}
function computeMove() {
    let choice = bestChoice(patten, color);
    if (choice.point) {
        patten[choice.point[1]][choice.point[0]] = color;
    }
    if (check(patten, color)) {
        alert(color === 2 ? 'X is win' : 'O is win');
    }
    color = 3 - color;
    show();
}
function willWin(patten, color) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patten[i][j] !== 0) continue;
            let tmp = clone(patten);
            tmp[i][j] = color;
            if (check(tmp, color)) {
                return [j, i];
            }
        }
    }
    return null;
}
let openings = new Map();
openings.set([[0,0,0], [0,0,0], [0,0,0]].toString() + '1', { point: [1, 1], result: 0 });
openings.set([[0,0,0], [0,1,0], [0,0,0]].toString() + '2', { point: [1, 1], result: 0 });

function bestChoice(patten, color) {
    if (openings.has(patten.toString() + color)) {
        openings.get(patten.toString() + color);
    }
    let point = willWin(patten, color);
    if (point) {
        return {
            point: point,
            result: 1
        }
    }
    let result = -1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patten[i][j] !== 0) continue;
            let tmp = clone(patten);
            tmp[i][j] = color;
            let opp = bestChoice(tmp, 3 - color);
            if (-opp.result >= result) {
                point = [j, i];
                result = -opp.result;
            }
        }
    }
    return {
        point: point,
        result: point ? result : 0
    }
}
show(patten);