<template>
  <transition name="modal">
    <div class="modal-container">
      <div class="modal">
        <!-- dynamic component -->
        <component :is="selectedComponent" :bookmarks="bookmarks" :toggleAddForm="toggleAddForm" :toggleEditForm='toggleEditForm' :currentBookmark="currentBookmark"></component>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';
  import AddBookmark from './AddBookmark';
  import EditBookmark from './EditBookmark';
  export default {
    components: {
      AddBookmark,
      EditBookmark
    },
    name: 'BookmarksForm',
    props: ['bookmarks', 'toggleAddForm', 'selectedComponent', 'toggleEditForm', 'currentBookmark'],
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
      // addBookmark() {
      //     // creating a new bookmark with the form's data
      //     const newBookmark = {
      //         name: this.bookmark.name,
      //         url: this.bookmark.url,
      //         category: this.bookmark.category,
      //     };
      //     // pushing the new bookmark to the bookmarks array
      //     this.bookmarks.push(newBookmark);
      //     // sending to firebase
      //     axios.post('bookmarks.json', newBookmark)
      //         .catch(error => console.log(error))
      //     //clearing out input fields
      //     this.bookmark = {
      //         name: '',
      //         url: '',
      //         category: '',
      //     };
      // },
      // form validations
      // validateForm() {
      //     this.$validator.validateAll().then(result => {
      //         if (result) {
      //             this.addBookmark()
      //         }
      //     });
      // },
    }
  }
</script>

<style lang="sass-loader">
  @import './../styles/_variables.scss';
  input {
    width: 100%;
    padding: 20px;
    border: 1px solid #BDC6CC;
    outline: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
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
  
  .modal-container {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    transition: opacity .3s ease;
  }
  
  .modal {
    background: white;
    color: black;
    padding: 20px;
    width: 600px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    margin: 0;
    position: absolute;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    transition: all .3s ease;
  }
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal,
  .modal-leave-active .modal {
    /* -webkit-transform: scale(1.1);
      transform: scale(1.1); */
  }
</style>
