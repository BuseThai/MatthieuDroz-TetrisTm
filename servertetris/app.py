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


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


