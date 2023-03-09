from datetime import datetime
from flask import Flask
from flask_cors import CORS
from flask import jsonify,request



app = Flask(__name__)
CORS(app)

# In-memory storage for forum posts
posts=[]
@app.route('/forum/post', methods=['GET', 'POST'])
def handle_post():
    if request.method =='GET':
        return jsonify(posts)
    elif request.method == 'POST':
        data = request.get_json()
        new_post= {
            'title': data['title'],
            'body': data['body'],
            'timestamp':datetime.now().strftime("%m/%d/%Y %H:%M:%S")      }
        posts.append(new_post)
        return 'OK'

@app.route('/forum/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = {
        'title': data['title'],
        'body': data['body'],
        'id': len(posts)+1,
        'timestamp': datetime.now().strftime("%m/%d/%Y %H:%M:%S")
    }
    posts.append(new_post)
    return jsonify({'post': new_post}), 201


#@app.route('/forum/posts/:id', methods=['POST'])
#def create_post(id):
    # iterate over posts list
    # check if post.id == id
    # if yes then change post.body to data['body'], and post.title to data['title']
    # no need to call append

if __name__ == '__main__':
    app.run(debug=True)
