<template>
  <div>
    <div class="modal-header">
    <h1 class="title">Add a bookmark</h1>
    </div>
    <form @submit.prevent="validateForm">
      <input type="text" placeholder="Site name" v-model.lazy="bookmark.name" name="name" v-validate="'required'" :class="{'has-error': errors.has('name')}">
      <div class="error" v-if="errors.has('name')">{{errors.first('name')}}</div>
      <input type="text" placeholder="URL" v-model.lazy="bookmark.url" name="url" v-validate="'required|url'" :class="{'has-error': errors.has('url')}">
      <div class="error" v-if="errors.has('url')">{{errors.first('url')}}</div>
      <input type="text" placeholder="Category" v-model="bookmark.category" name="category" >
      <div class="actions">
        <button @click="toggleAddForm" class="btn-cancel">Cancel</button>
        <button type="submit" class="btn-submit">Add bookmark</button>
      </div>
    </form>
  </div>
</template>

<script>
  // comment out if saving bookmarks to firebase
  // import axios from 'axios'
  export default {
    name: 'AddBookmark',
    props: ['bookmarks', 'toggleAddForm', 'selectedComponent'],
    data () {
      return {
        bookmark: {
          name: '',
          url: '',
          category: ''
        }
      }
    },
    methods: {
      addBookmark () {
        // creating a new bookmark with the form's data
        const newBookmark = {
          name: this.bookmark.name,
          url: this.bookmark.url,
          category: this.bookmark.category
        }
        // pushing the new bookmark to the bookmarks array
        this.bookmarks.push(newBookmark)

        // comment out if saving bookmarks to firebase
        // axios.post('bookmarks.json', newBookmark)
        //   .catch(error => console.log(error))

        // saving bookmarks with local storage
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));

          
        // clearing out input fields
        this.bookmark = {
          name: '',
          url: '',
          category: ''
        }
        // hiding the form again
        this.toggleAddForm()
      },
      // form validations
      validateForm () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.addBookmark()
          }
        })
      }
    }
  }
</script>


