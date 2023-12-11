/*-
Filename: complex_code_example.js

This code is a complex example that demonstrates the implementation of a fictional social media platform with various features and functionalities.
*/

// Class representing a user in the social media platform
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.friends = [];
    this.posts = [];
  }

  addFriend(user) {
    this.friends.push(user);
  }

  createPost(content) {
    const post = new Post(this, content);
    this.posts.push(post);
    return post;
  }
}

// Class representing a post made by a user
class Post {
  constructor(user, content) {
    this.user = user;
    this.content = content;
    this.likes = 0;
    this.comments = [];
  }

  addLike() {
    this.likes++;
  }

  addComment(user, text) {
    const comment = new Comment(user, text);
    this.comments.push(comment);
    return comment;
  }
}

// Class representing a comment made on a post
class Comment {
  constructor(user, text) {
    this.user = user;
    this.text = text;
  }
}

// Main function to demonstrate the social media platform
function main() {
  const user1 = new User("John Doe", "johndoe@example.com", "password1");
  const user2 = new User("Jane Smith", "janesmith@example.com", "password2");

  user1.addFriend(user2);
  user2.addFriend(user1);

  const post1 = user1.createPost("Hello, friends! How are you all doing?");
  const post2 = user2.createPost("Hey, John! I'm doing great!");

  post2.addLike();
  post2.addLike();
  post2.addLike();

  post1.addComment(user2, "Hey John! It's been a while since we caught up. Let's meet soon!");

  console.log(`User: ${user1.name}`);
  console.log(`Friends: ${user1.friends[0].name}`);
  console.log(`Posts: ${user1.posts[0].content}`);
  console.log(`Comments: ${user1.posts[0].comments[0].text}`);

  console.log(`User: ${user2.name}`);
  console.log(`Friends: ${user2.friends[0].name}`);
  console.log(`Posts: ${user2.posts[0].content}`);
  console.log(`Likes: ${user2.posts[0].likes}`);

  console.log(`Total users: ${User.count}`);
}

main();