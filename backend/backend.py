
from datetime import datetime
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify,request



app = Flask(__name__)
CORS(app)

# In-memory storage for forum posts
posts=[]
next_id= 1
@app.route('/forum/post', methods=['GET', 'POST'])
def handle_post():
    global next_id

    if request.method =='GET':
        return jsonify(posts)
    elif request.method == 'POST':
        data = request.get_json()
        new_post= {
            'title': data['title'],
            'body': data['body'],
            #'replies':daa
            'timestamp':datetime.now().strftime("%m/%d/%Y %H:%M:%S")      }
        posts.append(new_post)
        next_id += 1
        return jsonify(posts)
    

@app.route('/forum/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = {
        'title': data['title'],
        'body': data['body'],
        'id': len(posts)+1,
        'replies':[],
        'timestamp': datetime.now().strftime("%m/%d/%Y %H:%M:%S")
    }
    posts.append(new_post)
    return jsonify({'post': new_post}), 201


@app.route('/forum/post/<int:id>', methods=['GET','PUT'])
def update_post(id):
    print('id',id)
    data = request.get_json()
    for post in posts:
        if post['id'] == id:
            post['title'] = data['title']
            post['body'] = data['body']
            return jsonify({'post':post})
    return jsonify({'error':'Post not found'}), 404

@app.route('/forum/posts/<int:id>/replies', methods=['POST'])
def create_reply(id):
    data = request.get_json()
    for post in posts:
        if post['id'] == id:
            reply = {
                'id': len(post['replies']) + 1,
                'body': data['body'],
                'timestamp': datetime.now().strftime("%m/%d/%Y %H:%M:%S")
            }
            post['replies'].append(reply)
            return jsonify({'reply': reply})
    return jsonify({'error': 'Post not found'}), 404

@cross_origin()
@app.route('/forum/post/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_delete_post(id):
    global next_id

    if request.method == 'DELETE':
        for post in posts:
            if post['id'] == id:
                posts.remove(post)
                return '', 204
        return jsonify({'error': 'Post not found'}), 404





if __name__ == '__main__':
    app.run(debug=True)


