<template>
  <div id="app">
    <div class="container">
      <form @submit.prevent="validateForm">
          <input type="text" placeholder="Site name" v-model.lazy="bookmark.name" name="name" v-validate="'required'">
          <div class="error" v-if="errors.has('name')">{{errors.first('name')}}</div>
          <input type="text" placeholder="URL" v-model.lazy="bookmark.url" name="url" v-validate="'required|url'">
          <div class="error" v-if="errors.has('url')">{{errors.first('url')}}</div>
          <input type="text" placeholder="Category" v-model="bookmark.category" name="category">
          <button type="submit">Add bookmark</button>
      </form>
      <ul>
        <li v-for="(item, index) in bookmarks" :key='index'><a :href="item.url">{{item.name}}</a> <span class="category">{{item.category}}</span>
          <div class="delete-icon" @click="removeBookmark(index)"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "App",
    data() {
      return {
        // bookmarks: [{
        //     name: 'Codepen',
        //     url: 'https://codepen.io/',
        //     category: 'Front-end',
        //   },
        //   {
        //     name: 'Dribbble',
        //     url: 'https://dribbble.com/',
        //     category: 'Web Design',
        //   },
        //   {
        //     name: 'Udemy',
        //     url: 'https://www.udemy.com/',
        //     category: 'Education',
        //   },
        // ],
        bookmark: {
          name: '',
          url: '',
          category: '',
        },
        bookmarks: []
      }
    },
    methods: {
      addBookmark() {
        // creating a new bookmark with the form's data
        const newBookmark = {
          name: this.bookmark.name,
          url: this.bookmark.url,
          category: this.bookmark.category,
          uid: uid,
        };
        // pushing the new bookmark to the bookmarks array
        this.bookmarks.push(newBookmark);
        axios.put('data.json', newBookmark)
        //clearing out input fields
        this.bookmark = {
          name: null,
          url: null,
          category: null,
          
        };
      },
      removeBookmark(index) {
        this.bookmarks.splice(index, 1);
      },
      validateForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.addBookmark()
          }
        });
      },
    },
  //registering the validators for each input field


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
  
  input,
  button {
    width: calc(100% - 22px);
    padding: 10px;
    font-size: 1.3em;
  }
  
  button {
    width: 100%;
  }
  
  .category {
    display: inline-block;
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #eeeeee;
    font-size: 0.7em;
  }
  
  .delete-icon {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background: #323333;
    float: right;
    cursor: pointer;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 50%;
      height: 16%;
      top: 42%;
      left: 25%;
      background-color: #E0EDF4;
    }
  }
  
  .form-group--error input,
  .form-group--error textarea,
  .form-group--error input:focus,
  .form-group--error input:hover {
    border-color: #f79483;
  }
  
  .form-group--error .error {
    display: block;
    color: #f57f6c;
  }
</style>
