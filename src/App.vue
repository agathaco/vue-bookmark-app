<template>
  <div id="app">
    <div class="container">
      <form @submit.prevent="addBookmark">
        <div class="form-group" :class="{ 'form-group--error': $v.bookmarks.name.$error }">
        <input type="text" placeholder="Site name" v-model.lazy="$v.bookmarks.name.$model" name="name">
        <p class="error" v-if="$v.bookmarks.name.$error">Please enter a name</p></div>
        <input type="text" placeholder="URL" v-model.lazy="bookmarks.url" name="url">
        <p v-if="$v.bookmarks.url.$error">Please enter a valid URL.</p>
        <input type="text" placeholder="Category" v-model="bookmarks.category" name="category">
        <button @submit.prevent="addBookmark" @click="validateForm">Add bookmark</button>
      </form>
      <ul>
        <li v-for="(item, index) in bookmarks" :key='index'><a :href="item.url">{{item.name}}</a> <span class="category">{{item.category}}</span>
          <div class="delete-icon" @click="remove(index)"></div>
        </li>
      </ul>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
  // imports needed validators from vuelidate
  import {
    required,
    url
  } from 'vuelidate/lib/validators';
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
        bookmarks: {
          name: '',
          url: '',
          category: '',
        }
      }
    },
    methods: {
      addBookmark() {
        // pushing the new bookmark to the array
        const bookmark = {
          name: this.name,
          url: this.url,
          category: this.category,
        };
        // this.bookmarks.push(bookmark);
        //clearing input fields
      },
      remove(id) {
        this.bookmarks.splice(id, 1);
      },
      validateForm() {
        this.$v.$touch();
      }
    },
    computed: {
      formIsValid() {
        return this.name !== '' && this.url !== '';
      },
    },
    validations: {
      bookmarks: {
        name: {
          required,
        },
        url: {
          required,
          url
        }
      }
    }
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
.form-group--error input, .form-group--error textarea, .form-group--error input:focus, .form-group--error input:hover {
    border-color: #f79483;
  }
  .form-group--error .error {
    display: block;
    color: #f57f6c;
}
</style>
