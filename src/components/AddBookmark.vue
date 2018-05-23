<template>
  <div>
    <div class="modal">
    <slot name="title"></slot>
    <form @submit.prevent="validateForm">
      <input type="text" placeholder="Site name" v-model.lazy="bookmark.name" name="name" v-validate="'required'">
      <div class="error" v-if="errors.has('name')">{{errors.first('name')}}</div>
      <input type="text" placeholder="URL" v-model.lazy="bookmark.url" name="url" v-validate="'required|url'">
      <div class="error" v-if="errors.has('url')">{{errors.first('url')}}</div>
       <input type="text" placeholder="Category" v-model="bookmark.category" name="category">
      <div class="actions">
        <button @click="toggleBookmarkForm()" class="btn-cancel">Cancel</button>
        <slot name="action"></slot>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
  
    name: 'BookmarksLst',
    props: ['bookmarks', 'toggleBookmarkForm'],
    data() {
      return {
        bookmark: {
          name: '',
          url: '',
          category: '',
        },
      }
    },
    methods: {
      addBookmark() {
        // creating a new bookmark with the form's data
        const newBookmark = {
          name: this.bookmark.name,
          url: this.bookmark.url,
          category: this.bookmark.category,
        };
        // pushing the new bookmark to the bookmarks array
        this.bookmarks.push(newBookmark);
        // sending to firebase
        axios.post('bookmarks.json', newBookmark)
          .catch(error => console.log(error))
        //clearing out input fields
        this.bookmark = {
          name: '',
          url: '',
          category: '',
        };
      },
      // form validations
      validateForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.addBookmark()
          }
        });
      },
    }
  }
</script>

<style lang="sass-loader" scoped>
  @import './../styles/_variables.scss';
  input {
    width: 100%;
    padding: 20px;
    border: 1px solid #BDC6CC;
    outline:0;
    margin-bottom: 1rem;
    font-size:1.2rem;
  }
  .actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
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
  .error {
    margin: 1rem 0;
    color: $red;
  }
</style>
