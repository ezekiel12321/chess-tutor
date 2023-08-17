from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import chess.engine
import openai
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from dotenv import load_dotenv

load_dotenv()

email_user = os.getenv('EMAIL_USER')
email_pass = os.getenv('EMAIL_PASS')
open_ai = os.getenv('OPENAI')




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

@app.route('/send-email', methods=['POST'])
def send_email():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Create the email content
    subject = f"Message from {name}"
    body = f"From: {name} <{email}>\n\n{message}"

    msg = MIMEMultipart()
    msg['From'] = email
    msg['To'] = 'norman.zeke11@gmail.com'
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Send the email
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_user, email_pass)
    server.send_message(msg)
    server.quit()

    return {'status': 'success'}



@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():

    if request.method == 'OPTIONS':
        return make_response(('Allowed', 200))
    
    fen = request.json['fen']
    openai.api_key =open_ai
    
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