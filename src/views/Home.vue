<template>
  <div class="home">
    <h4 class>Display a list of asteroids with fields of your choice. (10 items) - using Neo - Browse</h4>
  </div>
  
</template>

<script>
// @ is an alias to /src
  export default {
    name: 'Home',
    
    created () {
      let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu'
      window.axios.get(url)
      .then((response) => {
        console.log(response.data.near_earth_objects)
      })
    }
  }
</script>
