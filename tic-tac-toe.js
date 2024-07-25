document.addEventListener('DOMContentLoaded', () => {
    const playerSetup = document.getElementById('player-setup');
    const game = document.getElementById('game');
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const startGameButton = document.getElementById('start-game');
    const player1NameInput = document.getElementById('player1-name');
    const player1SymbolSelect = document.getElementById('player1-symbol');
    const player2NameInput = document.getElementById('player2-name');
    const player2SymbolSelect = document.getElementById('player2-symbol');
    const cells = [];
    let currentPlayer = 'X';
    let gameActive = true;
    let player1 = { name: '', symbol: 'X' };
    let player2 = { name: '', symbol: 'O' };

    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentPlayer;
        cell.style.backgroundColor = currentPlayer === player1.symbol ? '#ffdddd' : '#ddffdd';

        if (checkWin(currentPlayer)) {
            const winner = currentPlayer === player1.symbol ? player1.name : player2.name;
            status.textContent = `${winner} wins!`;
            gameActive = false;
            showConfetti();
            return;
        }
        if (cells.every(cell => cell.textContent !== '')) {
            status.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === player1.symbol ? player2.symbol : player1.symbol;
        status.textContent = `${currentPlayer === player1.symbol ? player1.name : player2.name}'s turn`;
    }

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => cells[index].textContent === player)
        );
    }

    function showConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#ffffff';
        });
        currentPlayer = player1.symbol;
        gameActive = true;
        status.textContent = `${player1.name}'s turn`;
    }

    function startGame() {
        player1.name = player1NameInput.value || 'Player 1';
        player1.symbol = player1SymbolSelect.value;
        player2.name = player2NameInput.value || 'Player 2';
        player2.symbol = player2SymbolSelect.value;

        if (player1.symbol === player2.symbol) {
            alert('Players cannot have the same symbol!');
            return;
        }

        playerSetup.style.display = 'none';
        game.style.display = 'block';
        currentPlayer = player1.symbol;
        status.textContent = `${player1.name}'s turn`;
        resetGame();
    }

    startGameButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    initializeBoard();
});
