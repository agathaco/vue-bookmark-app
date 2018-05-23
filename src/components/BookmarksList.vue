<template>
  <div>
    <ul>
      <li v-for="(item, index) in bookmarks" :key='index'><a :href="item.url">{{item.name}}</a> <span class="category" v-if="item.category !== ''">{{item.category}}</span>
        <div class="spacer"></div>
        {{item}}
        <div class="actions">
          <span @click="editBookmark()"><i class="material-icons">edit</i></span>
          <span @click="removeBookmark(item, index)"><i class="material-icons">delete</i></span>
          
        </div>
      </li>
    </ul>
    <add-bookmark :bookmarks="bookmarks" class="modal" v-if="isShowing">
      <h1 slot="title">Edit a bookmark</h1>
      <button slot="button" type="submit">Save bookmark</button>
    </add-bookmark>
  </div>
</template>

<script>
  import axios from 'axios';
  import AddBookmark from './AddBookmark';
  export default {
    components: {
      AddBookmark
    },
    name: 'BookmarksLst',
    props: ['bookmarks'],
    data() {
      return {
        isShowing: false
      }
    },
    methods: {
      removeBookmark(result, index) {
        // need to remove from firebase too
        axios.delete('bookmarks/' + result.id + '.json')
          .then(response => {
            this.bookmarks.splice(index, 1);
          })
          .catch(error => console.log(error))
      },
      editBookmark() {
        this.isShowing = !this.isShowing;
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
      padding: 20px;
      background-color: white;
      margin-bottom: 10px;
      display: flex;
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
      align-items: center;
    }
    a {
      color: $text-color;
      text-decoration: none;
    }
  }
  
  .actions {
    display: flex;
    align-self: strech;
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
</style>
