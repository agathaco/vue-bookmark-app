<template>
    <ul>
      <li v-for="(item, index) in bookmarks" :key='index'><a :href="item.url">{{item.name}}</a> <span class="category">{{item.category}}</span>
        <div class="delete-icon" @click="removeBookmark(index)"></div>
      </li>
    </ul>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'BookmarksLst',
    props: ['bookmarks'],
    data() {
      return {
      }
    },
    methods: {
      removeBookmark(result, index) {
        // need to remove from firebase too
        axios.delete('bookmarks.json', {
            params: {}
          })
          .then(response => {
            this.bookmarks.splice(index, 1);
          })
          .catch(error => console.log(error))
      },
    }
  }
</script>

<style lang="scss" scoped>
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
