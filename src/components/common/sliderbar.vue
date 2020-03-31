<template>
    <div class="sliderbar">
        <div class="identity">
            <img :src="img" alt="photo" class="photo" />
            <p>{{identity}}</p>
        </div>
        <div class="menus">
            <router-link
                class="menu"
                v-for="menu in menuList"
                :to="{ name: menu.name }"
                :key="menu.name">
                {{menu.text}}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'sliderbar',
  props: {
    img: String,
    identity: String,
    menuList: Array // name, text
  }
}
</script>

<style lang="less" scoped>
.sliderbar {
    width:160px;
    flex-shrink: 0;
    background-color: #1295d9;
    text-align: center;
    .identity {
      margin: 15px 10px 10px;
      .photo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      p{
        font-size: 16px;
        line-height: 20px;
        font-weight: bold;
        margin: 5px 0 15px;
      }
    }
    .menus {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        position: sticky;
        top: 80px;
        .menu {
            height: 50px;
            line-height: 50px;
            text-align: center;
            text-decoration: none;
            font-size: 14px;
            font-weight: 100;
            color: #fff;
            background-color: #0a6aa4;
            border-bottom: 1px solid #1295d9;
        }
        .menu.router-link-active {
            background-color: #013e6b;
        }
    }
}
</style>
