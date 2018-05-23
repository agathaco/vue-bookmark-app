<template>
  <div id="app">
    <div class="container">
      <add-bookmark :bookmarks="bookmarks"></add-bookmark>
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
      }
    },
  }
</script>

<style lang="scss">
  .container {
    background: #fff;
    font-family: Arial;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 30px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    & li {
      padding: 20px;
      font-size: 1.3em;
      background-color: #E0EDF4;
      margin-bottom: 2px;
      color: #3E5252;
    }
  }
  p {
    text-align: center;
    padding: 30px 0;
    color: #666;
    margin: 0;
  }

  .category {
    display: inline-block;
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #eeeeee;
    font-size: 0.7em;
  }
  

</style>
