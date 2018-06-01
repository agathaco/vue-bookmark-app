<template>
  <div>
    <ul>
      <li v-for="(item, index) in bookmarks" :key='index'><a :href="item.url" v-tooltip="{content:item.url, delay: { show: 200, hide: 200}, placement: 'right', offset: 10}">{{item.name}}</a> <span class="category" v-if="item.category !== ''">{{item.category}}</span>
        <div class="spacer"></div>
        <div class="actions">
          <span @click="openBookmarkForm(index)"><i class="material-icons">edit</i></span>
          <span @click="removeBookmark(item, index)"><i class="material-icons">delete</i></span>
        </div>
      </li>
    </ul>
    <bookmark-form :currentBookmark="currentBookmark" class="modal-container" v-if="isEditShowing" :selectedComponent="selectedComponent" :toggleEditForm='toggleEditForm' :bookmarks='bookmarks'></bookmark-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import BookmarkForm from './BookmarkForm'
  export default {
    components: {
      BookmarkForm
    },
    name: 'BookmarksList',
    props: ['bookmarks', 'selectedComponent'],
    data() {
      return {
        isEditShowing: false,
        editedComponent: this.selectedComponent, // to avoid directly mutating a prop
        currentBookmark: {
          name: '',
          url: '',
          category: ''
        }
      }
    },
    methods: {
      removeBookmark(item, index) {
        // removing from array and firebase
        axios.delete('bookmarks/' + item.id + '.json')
          .then(response => {
            this.bookmarks.splice(index, 1)
          })
          .catch(error => console.log(error))
      },
      openBookmarkForm(index) {
        // showing the modal
        this.toggleEditForm()
        // changing dynaming component to 'Edit bookmark' and updating the global variable
        this.editedComponent = 'editBookmark'
        this.$emit('changedcomponent', this.editedComponent)
        // Getting current item index
        this.currentBookmark = this.bookmarks[index]
      },
      toggleEditForm() {
        this.isEditShowing = !this.isEditShowing
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './../styles/_variables.scss';
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    & li {
      padding: 30px;
      background-color: white;
      margin-bottom: 10px;
      display: flex;
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
      align-items: center;
      border-radius: $radius;
    }
    a {
      color: $text-color;
      text-decoration: none;
      font-weight: 700;
      &:hover {
        transition: all 0.3s ease;
        color: darken($text-color, 10%);
      }
      &:active {
        color: darken($text-color, 10%);
      }
      &:focus {
        border: none;
        outline: 0;
        color: $text-color;
      }
    }
  }
  
  .actions {
    display: flex;
    align-self: strech;
    margin-top: 0;
    & span {
      padding: 0 5px;
      font-size: 0.8em;
      i {
        color: $light-grey;
      }
      cursor: pointer;
      text-decoration: underline;
    }
  }
  
  .category {
    display: inline-block;
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #eeeeee;
    font-size: 0.7em;
  }
  

</style>
