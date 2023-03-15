
import json
import time
from datetime import datetime
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS, cross_origin



app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
CORS(app)

# In-memory storage for forum posts
posts=[]
next_id= 1
votes={}
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
    postid  = len(posts)+1
    
    posts.append(new_post)

    print('id')
    print(postid)
    votes[postid]=0
    print('votes ow')
    print(votes)
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

@app.route('/forum/post/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_delete_post(id):
    global next_id

    if request.method == 'DELETE':
        for post in posts:
            if post['id'] == id:
                posts.remove(post)
                return '', 204
        return jsonify({'error': 'Post not found'}), 404


@app.route('/forum/posts/<int:postId>/replies/<int:replyId>', methods=['DELETE'])
def delete_reply(postId, replyId):
  post_index = next((i for i, post in enumerate(posts) if post["id"] == postId), None)
  if post_index is not None:
    reply_index = next((i for i, reply in enumerate(posts[post_index]["replies"]) if reply["id"] == replyId), None)
    if reply_index is not None:
      del posts[post_index]["replies"][reply_index]
      return jsonify({'message': 'Reply deleted successfully.'})
    else:
      return jsonify({'error': 'Reply not found.'}), 404
  else:
    return jsonify({'error': 'Post not found.'}), 404


@app.route('/forum/posts/upvote', methods=['GET'])
def upvote_post():
    return jsonify(votes)


@app.route('/forum/post/<int:id>/upvote', methods=['POST'])
def upvotes(id):
    if id in votes:
        votes[id] += 1
        return jsonify({'votes': votes[id]})
    else:
        return jsonify({'error': 'Post not found.'}), 404


    return '', 204

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response


@app.route('/profile')
def my_profile():
    response_body = {
        'time': time.time(),
        "name": "Invictus",
        "about" :"This is our CS35L Project "
    }

    return response_body

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

if __name__ == '__main__':
    app.run(debug=True)


