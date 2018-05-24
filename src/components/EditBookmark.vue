<template>
  <div>
    <div class="modal-header">
      <h1 class="title">Edit bookmark</h1>
    </div>
    <form @submit.prevent="validateForm">
      <input type="text" placeholder="Site name" v-model.lazy="currentBookmark.name" name="name" v-validate="'required'">
      <div class="error" v-if="errors.has('name')" :class="{'has-error': errors.has('name')}">{{errors.first('name')}}</div>
      <input type="text" placeholder="URL" v-model.lazy="currentBookmark.url" name="url" v-validate="'required|url'" :class="{'has-error': errors.has('url')}">
      <div class="error" v-if="errors.has('url')">{{errors.first('url')}}</div>
      <input type="text" placeholder="Category" v-model="currentBookmark.category" name="category">
      <div class="actions">
        <div @click="toggleEditForm" class="btn-cancel">Cancel</div>
        <button type="submit" class="btn-submit">Save changes</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'EditBookmark',
    props: [
      'currentBookmark',
      'toggleBookmarkForm',
      'selectedComponent',
      'toggleEditForm'
    ],
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
      editBookmark () {
        console.log('edited')
        this.toggleEditForm()
        // posting the changes to firebase
        axios
          .put(
            'bookmarks/' + this.currentBookmark.id + '.json',
            this.currentBookmark
          )
          .catch(error => console.log(error))
      },
      // form validations
      validateForm () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.editBookmark()
          }
        })
      }
    }
  }
</script>

