from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/sorteio', methods=['POST'])
def realizar_sorteio():
    data = request.json
    num_times = data['numTimes']
    num_jogadores = data['numJogadores']

    jogadores = [f"Jogador {i+1}" for i in range(num_times * num_jogadores)]
    random.shuffle(jogadores)

    times = [jogadores[i:i+num_jogadores] for i in range(0, len(jogadores), num_jogadores)]

    return jsonify(times)

if __name__ == '__main__':
    app.run(debug=True)
