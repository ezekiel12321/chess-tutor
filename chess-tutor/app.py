from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import chess.engine
import openai
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    header['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    return response

@app.route('/hello')
def hello():
    return 'hello'


@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():

    if request.method == 'OPTIONS':
        return make_response(('Allowed', 200))
    
    fen = request.json['fen']
    openai.api_key = os.getenv('OPENAI_API_KEY')
    
    engine = chess.engine.SimpleEngine.popen_uci('/opt/homebrew/bin/stockfish')
    board = chess.Board(fen)
    result = engine.play(board,chess.engine.Limit(time = 2.0))
    best_move = result.move
    engine.quit()

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=f"The current state of the board is: {fen}. The chess engine recommended the move {best_move}. Can you explain why this might be a good move?",
        
        max_tokens=1000,
        
        
            )
    explanation = response.choices[0].text.strip()

    

    return {'best move': str(best_move), 'analysis': explanation}

if __name__ == '__main__':
    app.run(debug=True, port=5000)