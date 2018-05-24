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
  import AddBookmark from './AddBookmark'
  import EditBookmark from './EditBookmark'
  export default {
    components: {
      AddBookmark,
      EditBookmark
    },
    name: 'BookmarksForm',
    props: ['bookmarks', 'toggleAddForm', 'selectedComponent', 'toggleEditForm', 'currentBookmark'],
    data () {
      return {
        bookmark: {
          name: '',
          url: '',
          category: ''
        }
      }
    }
  }
</script>

<style lang="sass-loader">
  @import './../styles/_variables.scss';
  input {
    width: 100%;
    padding: 15px;
    border: 1px solid $light-grey;
    outline: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    border-radius: $radius;
  };
  
  .actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
  
  form {
    padding: 20px;
  }
  
  .has-error,
  .has-error:focus,
  .has-error:hover {
    border-color:$red;
  }
  
  .error {
    margin: 1rem 0;
    color: $red;
    font-family: Lato, Arial, sans-serif;
    font-size: 1.2rem;
    margin: 0 0 1.5rem 0;
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
    width: 600px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    margin: 0;
    position: absolute;
    border-radius: $radius;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    transition: all .3s ease;
    .modal-header {
      width: 100%;
      padding: 20px;
      background: #eeeeee;
      border-radius: $radius $radius 0 0;
      h1 {
        margin: 0.5rem 0 0.5rem 0;
        color: $text-color;
        display: block;
        text-shadow: 0 1px 2px rgba(0,0,0,0.1)
      }
    }
  }
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
</style>
