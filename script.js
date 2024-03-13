document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const playerSymbol = '〇'; // プレイヤーの記号
    const cpuSymbol = '×'; // CPUの記号

    // ゲームボードの状態を管理する配列
    let boardState = ['', '', '', '', '', '', '', '', ''];

    // プレイヤーがマス目をクリックしたときの処理
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = parseInt(cell.id.split('-')[1]);
            if (boardState[index] === '') {
                cell.textContent = playerSymbol;
                boardState[index] = playerSymbol;

                if (checkWin(playerSymbol)) {
                    message.textContent = playerSymbol + 'の勝ちです！';
                    disableCells();
                } else if (checkDraw()) {
                    message.textContent = '引き分けです！';
                } else {
                    // CPUのターン
                    setTimeout(cpuTurn, 500);
                }
            }
        });
    });

    // CPUのターン
    function cpuTurn() {
        let emptyCells = boardState.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const selectedCell = document.getElementById('cell-' + randomIndex);
        selectedCell.textContent = cpuSymbol;
        boardState[randomIndex] = cpuSymbol;

        if (checkWin(cpuSymbol)) {
            message.textContent = cpuSymbol + 'の勝ちです！';
            disableCells();
        } else if (checkDraw()) {
            message.textContent = '引き分けです！';
        }
    }

    // 勝利条件をチェックする関数
    function checkWin(symbol) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
            [0, 4, 8], [2, 4, 6] // 斜め
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] === symbol && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }

    // 引き分けをチェックする関数
    function checkDraw() {
        return boardState.every(cell => cell !== '');
    }

    // マス目をクリックできないようにする関数
    function disableCells() {
        cells.forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
    }
});
