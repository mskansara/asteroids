<template>
  <div class="search container">
    <hr>
    <div class="row">
        <div class="col s12 m6 offset-l3">
        <div class="card">
            <div class="card-content">
                <span class="card-title">Search By Date</span>
                <form v-on:submit.prevent="searchByDate">
                   <label for="start_date">Start Date</label>
                  <input type="text" class="datepicker" id="start_date" v-model="start_date" placeholder="YYYY-MM-DD" required>
                  <label for="end_date">End Date</label>
                  <input type="text" class="datepicker" id="end_date" v-model="end_date" placeholder="YYYY-MM-DD" required>
                  <button class="btn">Search</button>
                </form>
               
            </div>
        </div>
        </div>
    </div>
    
    <div class="row" v-if="flag">
      <hr>
      <h3>Details</h3>
      <table class="centered">
        <thead>
          <tr>
            <th>Close Approach Date</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key=item.name>
            <td>{{item.close_approach_data[0].close_approach_date}}</td>
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "Search-By-Date",

  data () {
    return {
      start_date: '',
      end_date: '',
      data: [],
      flag: false
    }
  },

  created () {
      this.flag = false;
      document.addEventListener('onload', function() {
        var elems = document.querySelectorAll('.datepicker');
        var options = {
          format: 'yyyy-mm-dd'
        }
        var instances = M.Datepicker.init(elems, options);
      }); 
  },

  methods: {
    searchByDate () {
      let url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + this.start_date + '&end_date=' + this.end_date + '&detailed=true&api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu';
      window.axios.get(url)
      .then((response) => {
        var data = response.data.near_earth_objects
        var x;
        var y;
        var nest = []
        for(x in data) {
          // console.log(data[x])
          nest = data[x]
          for(y in nest){
            // console.log(nest[y].id)
            this.data.push(nest[y])
          }
        }
        
        this.flag = true;
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          timer: 5000
        })
      }) 
    }
  }
}
</script>
