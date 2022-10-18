from flask import Flask, render_template,request



app = Flask(__name__)




@app.route('/')
def index():
    if(isMobile()):
        return "Not compatible on Mobile"
    else:
        return render_template("Tetris.html")


def isMobile():
    useragent = request.headers.get('User-Agent')
    if("android" in useragent.lower() or "iphone" in useragent.lower()):
        return True
    return False
#0.33776, 0.63621, 0.30951, 0.69973, 0.70221, 3984

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


