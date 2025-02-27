from flask import Flask, request, jsonify,templating
app = Flask(__name__)

@app.route('/')
def index():
    return templating.render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)