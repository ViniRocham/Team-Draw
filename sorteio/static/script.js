function realizarSorteio() {
    var numTimes = parseInt(document.getElementById('numTimes').value);
    var numJogadores = parseInt(document.getElementById('numJogadores').value);
    
    if (isNaN(numTimes) || isNaN(numJogadores) || numTimes < 1 || numJogadores < 1) {
        alert("Por favor, insira números válidos maiores que zero.");
        return;
    }

    fetch('/sorteio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numTimes: numTimes, numJogadores: numJogadores })
    })
    .then(response => response.json())
    .then(data => {
        exibirResultado(data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function exibirResultado(data) {
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    data.forEach((time, index) => {
        var heading = document.createElement('h2');
        heading.textContent = `Time ${index + 1}`;
        resultadoDiv.appendChild(heading);

        var playersList = document.createElement('ul');
        time.forEach(player => {
            var playerItem = document.createElement('li');
            playerItem.textContent = player;
            playersList.appendChild(playerItem);
        });
        resultadoDiv.appendChild(playersList);
    });
}
