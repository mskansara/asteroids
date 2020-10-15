<template>
  <div class="search">
    <h1 class="teal">This is search by date page</h1>
    <h4>Use the Neo - Feed api endpoint for creating a date component which takes start date and end date from the user. On selecting the dates you need to display a list of asteroids based on their closest approach date to Earth. (10 items in the list as per their closest approach)</h4>
  </div>
</template>

<script>
export default {
  name: "Search-By-Date",

  data () {
    return {
      start_date: '2015-04-28',
      end_date: '2015-04-30'
    }
  },
  created () {
    let url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + this.start_date + '&end_date=' + this.end_date + '&detailed=true&api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu';
    window.axios.get(url)
    .then((response) => {
      console.log(response.data.near_earth_objects)
    })
    .catch((error) => {
      console.log(error)
    }) 
  }
}
</script>
