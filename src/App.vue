<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Bookmark Manager</h1>
    </div>
    <div class="container">
      <div class="container-header">
        <h2>Your bookmarks</h2>
        <div class="spacer"></div>
        <button @click="openAddForm" class="btn-add">+</button>
      </div>
      <bookmark-form :bookmarks="bookmarks" v-if="isShowing" :toggleAddForm="toggleAddForm" :selectedComponent="selectedComponent"></bookmark-form>
      <bookmarks-list :bookmarks="bookmarks" :selectedComponent="selectedComponent" @changedcomponent="selectedComponent = $event"></bookmarks-list>
    </div>
  </div>
</template>

<script>
  // comment out if getting bookmarks from firebase
  // import axios from 'axios'
  import BookmarkForm from './components/BookmarkForm'
  import BookmarksList from './components/BookmarksList'
  export default {
    name: 'App',
    components: {
      BookmarkForm,
      BookmarksList
    },
    data () {
      return {
        isShowing: false,
        selectedComponent: 'addBookmark',
        bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      }
    },
    // comment out if getting bookmarks from firebase
    // created () {
    //   this.getBookmarks()
    // },
    methods: {
      // comment out if getting bookmarks from firebase
      // getBookmarks () {
        // axios.get('bookmarks.json')
        //   .then(response => {
        //     if (response) {
        //       console.log(response)
        //       const data = response.data
        //       // looping through the data of the response and storing each bookmark in a new array;
        //       for (let key in data) {
        //         const bookmark = data[key]
        //         // storing th firebase id
        //         bookmark.id = key
        //         this.bookmarks.push(bookmark)
        //       }
        //     }
        //   })
        //   .catch(error => console.log(error))

        // local storage
        // const items = JSON.parse(localStorage.getItem('items')) || [];
      // },
      // showing or hiding new bookmark form
      toggleAddForm () {
        this.isShowing = !this.isShowing
      },
      openAddForm () {
        this.selectedComponent = 'addBookmark'
        this.toggleAddForm()
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
  @import './styles/_variables.scss';
  @import './../node_modules/material-design-icons/iconfont/material-icons.css';
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
    font-size: 1.8rem;
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
      text-shadow: 0 1px 2px rgba(0,0,0,0.1)
    }
  }
  
  .container {
    font-family: Arial;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 30px;
  }
  
  .container-header {
    color: white;
    background: linear-gradient(to bottom right, $red 40%, $orange 100%);
    font-size: 1.8rem;
    padding: 40px;
    display: flex;
    align-items: center;
    border-radius: $radius;
    h2 {
      margin: 0;
      text-shadow: 0 1px 1px rgba(0,0,0,0.1);
      letter-spacing: 0.1rem;
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
  
  .spacer {
    flex: 1;
  }
  
  .btn-submit {
    @include button-builder($red,
    white);
  }
  
  .btn-cancel {
    @include button-builder(transparent,
    grey);
  }
    .tooltip {
    display: block !important;
    z-index: 10000;
    font-size: 1.8rem;
    left:4rem;
    .tooltip-inner {
      background:$text-color;
      color: white;
      border-radius: $radius;
      padding: 5px 10px 4px;
    }
    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: $text-color;
    }
  }
</style>
