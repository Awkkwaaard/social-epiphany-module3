<template lang="html">
  <div id="app">
    <!-- LOGO --> <!--Penelope began this section -->
    <img src="./assets/logo.png" height="150">
    <button class="add-post" @click="toggleCreatePanel()">Add Post</button>
    <!--Tag line--> <!--Penelope completed this section-->
    <p>Find a friend! Share an epiphany event! Socialise! Do this at Social Epiphany today.</p>
    <hr />
    <div class="list" v-for="(post) in posts" :key="post.id">
      <h3>
        {{ post.userName }}
        <!--Buttons--> <!--Penelope completed this section-->
        <!--Delete button goes here-->
        <button class="button" :style="{ background: '#fff', color: '#BF00FF' }"
          @click="toggleDeletePanel(post)">Delete</button>
        <!--Edit button goes here-->
        <button class="button" :style="{ background: '#fff', color: '#BF00FF' }" @click="getPostData(post)">Edit</button>
        <button class="button" :style="{ background: '#fff', color: '#BF00FF' }"
          @click="toggleViewPanel(post)">View</button>
      </h3>
      <h4>{{ post.title }}</h4>
      <p>{{ post.body }}</p>
    </div>
    <!--Penelope Completed this section-->
    <!--Show Add Post Section Begins--> <!--Penelope began and completed this section-->
    <div class="modal" v-if="showAddPost">
      <div class="modal-content">
        <span @click="showAddPost = false" class="close">&times;</span>
        <!--Add new post goes here-->
        <h3>Add New Post</h3>
        <hr />
        <form>
          <!--UserName goes here-->
          <label class="label">UserName:</label><br>
          <input type="text" id="userName" v-model="postData.userName" autoComplete="off" class="input-box">
          <br>
          <!--Title goes here-->
          <label class="label">Title:</label><br>
          <input type="text" v-model="postData.title" id="title" autoComplete="off" class="input-box">
          <br>
          <!--Description goes here-->
          <label class="label">Description:</label><br>
          <input type="text" v-model="postData.body" id="body" autoComplete="off" class="description-box">
          <br>
          <!--Submit button goes here-->
          <button class="submit-btn" @click.prevent="createPost()" type="submit">Add Post</button>
        </form>
      </div>
      <!--Show Add Post Section ends--> <!--Penelope completed and ended this section-->
    </div>
    <!--Show Edit post begins--> <!--Cynta began and completed this section-->
    <div class="modal" v-if="showEditPost">
      <div class="modal-content">
        <span @click="editClosePanel(postData)" class="close">&times;</span>
        <!--Edit post-->
        <h3>Edit the Post</h3>
        <hr />
        <!--Edit Form begins here--> <!--Cynta completed this section-->
        <form>
          <!--UserName goes here-->
          <label class="label">UserName</label><br>
          <input type="text" v-model="postData.userName" id="userName" class="input-box">
          <br>
          <!--Title goes here-->
          <label class="label">Title</label><br>
          <input type="text" v-model="postData.title" id="title" class="input-box">
          <br>
          <!--Description goes here-->
          <label class="label">Description</label><br>
          <input type="text" v-model="postData.body" id="body" class="input-box">
          <br>
          <!--Update Button goes here-->
          <button class="update-btn" @click.prevent="updatePost(postData)" type="submit">Update</button>
        </form>
        <!--Edit form ends here-->
      </div>
    </div>
    <!--Cynta ended and completed this section-->
    <!--Show delete post begins here--> <!--Cynta began and completed this section-->
    <div class="modal" v-if="showDeletePost">
      <div class="modal-content">
        <span @click="showDeletePost = false" class="close">&times;</span>
        <!--Delete the post heading goes here-->
        <h3>Delete the post</h3>
        <hr />
        <!--styling-->
        <p :style="{ margin: '20px 0 10px 0' }">Are you sure you want to delete the post?</p>
        <button class="submit-btn" :style="{ background: '#BF00FF' }" @click.prevent="deletePost(postData)" type="submit">
          Yes
        </button>
        <!--Submit button goes here-->
        <button class="submit-btn" @click="showDeletePost = false" type="submit">
          No
        </button>
      </div>
      <!--Show delete post ends here --> <!--Cynta completed and ended this section-->
    </div>
    <!--Show view post begins here --> <!--Penelope began and completed this section-->
    <div class="modal" v-if="showViewPost">
      <div class="modal-content">
        <span @click="viewClosePanel()" class="close">&times;</span>
        <!--View post goes here-->
        <h3>View Post</h3>
        <hr />
        <!--List-->
        <div class="list">
          <h3>{{ this.postData.userName }}</h3>
          <h4>{{ this.postData.title }}</h4>
          <p>{{ this.postData.body }}</p>
        </div>
        <!--Styling--> <!--Penelope completed this section-->
        <div :style="{ padding: '5px 0 5px 7px', display: 'flex', background: 'white', margin: '5px' }"
          v-for="comment in comments" :key="comment.id">
          <img :style="{ margin: '8px 5px 0 0', background: 'lightblue', borderRadius: '0.4rem' }" width="40px"
            height="40px" />
          <div>
            <h3>{{ comment.author }}</h3>
            <p>{{ comment.message }}</p>
          </div>
        </div>
        <!--Author label goes here-->
        <label class="label">Author</label><br>
        <input type="text" id="name" v-model="commentData.author" autoComplete="off" class="input-box"><br>
        <!--Comment label goes here-->
        <label class="label">Comment</label><br>
        <input type="text" id="comment" v-model="commentData.message" autoComplete="off" class="input-box"><br>
        <!--Submit button goes here-->
        <button class="submit-btn" @click.prevent="submitComment()" type="submit">Comment</button>
      </div>
    </div>
  </div>
</template>
<!--Penelope ended and completed this section-->
<!--Cynta & Penelope collaborated this code together-->
<script>
import axios from "axios";
//Form details
export default {
  data() {
    return {
      posts: [],
      comments: [],
      postData: {
        id: "",
        userName: "",
        title: "",
        body: "",
      },
      commentData: {
        postId: "",
        author: "",
        message: "",
      },
      showAddPost: false,
      showEditPost: false,
      showDeletePost: false,
      showViewPost: false,
    };
  },
//Code sandbox link
  methods: {
    fetchPosts() {
      axios
        .get("https://ch589.sse.codesandbox.io/posts/")
        .then((response) => {
          this.posts = response.data.reverse();
        })
        .catch(() => {
          console.warn("Something went wrong for getting post");
        });
    },
    fetchComments() {
      axios
        .get(
          `https://ch589.sse.codesandbox.io/comments?postId=${this.postData.id}`
        )
        .then((response) => {
          this.comments = response.data.reverse();
        })
        .catch(() => {
          console.warn("Something went wrong for getting comments");
        });
    },
    //Show AddPost - Penelope
    toggleCreatePanel() {
      this.showAddPost = true;
    },
    //Show EditPost - Penelope
    toggleEditPanel() {
      this.showEditPost = true;
    },
    //Show DeletePost - Penelope
    toggleDeletePanel(post) {
      this.showDeletePost = true;
      this.postData.id = post.id;
    },
    //View Post - Cynta
    toggleViewPanel(post) {
      this.commentData.postId = post.id;
      this.postData.id = post.id;
      this.postData.userName = post.userName;
      this.postData.title = post.title;
      this.postData.body = post.body;
      this.fetchComments();
      this.showViewPost = true;
    },
    //Edit postData - Penelope
    editClosePanel(postData) {
      axios
        .put(`https://ch589.sse.codesandbox.io/posts/${postData.id}`, {
          userName: this.postData.userName,
          title: this.postData.title,
          body: this.postData.body,
        })
        .then(() => {
          this.fetchPosts();
          this.postData.id = "";
          this.postData.userName = "";
          this.postData.title = "";
          this.postData.body = "";
          this.showEditPost = false;
        });
    },
    //View Close Panel - Cynta
    viewClosePanel() {
      this.showViewPost = false;
      this.postData.id = "";
      this.postData.userName = "";
      this.postData.title = "";
      this.postData.body = "";
    },
    //createPost - Cynta
    createPost() {
      axios
        .post("https://ch589.sse.codesandbox.io/posts/", this.postData)
        .then(() => {
          this.fetchPosts();
          this.postData.id = "";
          this.postData.userName = "";
          this.postData.title = "";
          this.postData.body = "";
          this.showAddPost = false;
        });
    },
    //getPost Data - Cynta
    getPostData(post) {
      this.toggleEditPanel();
      this.postData.userName = post.userName;
      this.postData.title = post.title;
      this.postData.body = post.body;
      this.postData.id = post.id;
    },
    //update Post - Penelope
    updatePost(postData) {
      axios
        .put(`https://ch589.sse.codesandbox.io/posts/${postData.id}`, {
          userName: this.postData.userName,
          title: this.postData.title,
          body: this.postData.body,
        })
        .then(() => {
          this.fetchPosts();
          this.postData.id = "";
          this.postData.userName = "";
          this.postData.title = "";
          this.postData.body = "";
          this.showEditPost = false;
        });
    },
    //deletePost - Penelope
    deletePost(postData) {
      axios
        .delete(`https://ch589.sse.codesandbox.io/posts/${postData.id}`)
        .then(() => {
          this.fetchPosts();
          this.postData.id = "";
          this.postData.userName = "";
          this.postData.title = "";
          this.postData.body = "";
          this.showDeletePost = false;
        });
    },
    //SubmitComment - Cynta
    submitComment() {
      axios
        .post("https://ch589.sse.codesandbox.io/comments/", this.commentData)
        .then(() => {
          this.fetchComments();
          this.commentData.postId = this.postData.id;
          this.commentData.author = "";
          this.commentData.message = "";
        });
    },
  },

  mounted: function () {
    this.fetchPosts();
  },
};
</script>
