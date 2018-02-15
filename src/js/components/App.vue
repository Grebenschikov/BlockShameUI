<template lang="html">
    <div class="">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">BlockShame</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li v-for="page in pages">
                <router-link :to="page.toLocaleLowerCase()">{{ page }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view/>
    </div>
</template>

<script>
export default {
  data(){
    return {
      pages:[ 'Hash', 'Block', 'BlockChain', 'Distributed', 'Tokens', 'Coinbase']
    }
  }
}
</script>

<style lang="css">
  nav .is-active{
    font-weight: 600;
  }
  .router-link{
    cursor: pointer;
  }
</style>
