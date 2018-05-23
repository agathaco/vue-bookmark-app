<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Bookmark Manager</h1>
    </div>
    <div class="container">
      <div class="container-header">
        <h2>Your bookmarks</h2>
        <div class="spacer"></div>
        <button @click="toggleBookmarkForm" class="btn-add">+</button>
      </div>
      <add-bookmark :bookmarks="bookmarks" class="modal" v-if="isShowing" :toggleBookmarkForm="toggleBookmarkForm">
        <h1 slot="title">Add a header</h1>
        <button slot="action" type="submit">Add bookmark</button>
      </add-bookmark>
      <bookmarks-list :bookmarks="bookmarks"></bookmarks-list>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import AddBookmark from './components/AddBookmark';
  import BookmarksList from './components/BookmarksList';
  export default {
    name: "App",
    components: {
      AddBookmark,
      BookmarksList
    },
    data() {
      return {
        bookmarks: [],
        isShowing: false,
      }
    },
    created() {
      this.getBookmarks();
    },
    methods: {
      // getting bookmarks from firebase
      getBookmarks() {
        axios.get('bookmarks.json')
          .then(response => {
            if (response) {
              console.log(response)
              const data = response.data;
              // const bookmarks = [];
              // looping through the data of the response and storing each bookmark in a new array;
              for (let key in data) {
                const bookmark = data[key];
                // storing th firebase id
                bookmark.id = key;
                this.bookmarks.push(bookmark)
              }
              console.log(this.bookmarks)
            }
          })
          .catch(error => console.log(error))
      },
      // show or hide bookmark form
      toggleBookmarkForm() {
        this.isShowing = !this.isShowing;
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
  @import './styles/_variables.scss';
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Lato', Arial, sans-serif;
  }
  
  .app {
    font-size: 1.6rem;
    width: 100%;
    height: 100vh;
    background-color: $background;
    color: $text-color;
  }
  
  .header {
    width: 100%;
    padding: 10px 30px;
    font-size: 1.8rem;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    h1 {
      margin: 0 0 1.2rem 0;
      font-weight: 400;
      color: $red;
    }
  }
  
  .container {
    background: #fff;
    font-family: Arial;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 30px;
  }
  
  .container-header {
    color: white;
    background-color: $red;
    font-size: 1.8rem;
    padding: 40px;
    display: flex;
    align-items: center;
    h2 {
      margin: 0;
    }
  }
  
  .btn-add {
    @include btn-circle(3rem,
    $red,
    white);
  }
  
  p {
    text-align: center;
    padding: 30px 0;
    color: #666;
    margin: 0;
  }
  
  .modal {
    background: cyan;
    color: black;
    padding: 20px;
    width: 500px;
    position: absolute;
  }
  
  .spacer {
    flex: 1;
  }
</style>
