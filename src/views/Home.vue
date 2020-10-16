<template>
  <div class="home container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Neo Reference ID</th>
          <th>Designation</th>
          <th>Name</th>
          <th>Is Potentially Hazardous</th>
          <th>Is Sentry Object</th>
          <th>Estimated Diameter (in feet)</th>
          <th>Estimated Diameter (in kilometers)</th>
          <th>Estimated Diameter (in miles)</th>
          <th>Data Arc (in days)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.neo_reference_id}}</td>
            <td>{{item.designation}}</td>
            <td>{{item.name}}</td>
            <td>{{item.is_potentially_hazardous_asteroid}}</td>
            <td>{{item.is_sentry_object}}</td>
            <td>Min:{{item.estimated_diameter.feet.estimated_diameter_min}}, Max:{{item.estimated_diameter.feet.estimated_diameter_max}}</td>
            <td>Min:{{item.estimated_diameter.kilometers.estimated_diameter_min}}, Max:{{item.estimated_diameter.kilometers.estimated_diameter_max}}</td>
            <td>Min:{{item.estimated_diameter.miles.estimated_diameter_min}}, Max:{{item.estimated_diameter.miles.estimated_diameter_max}}</td>
            <td>{{item.orbital_data.data_arc_in_days}}</td>
            <td><button class="btn"><i class="material-icons">add</i></button></td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>
// @ is an alias to /src
  export default {
    name: 'Home',
    data () {
      return {
        data: {
            // id: null,
            // is_potentially_hazardous: null,
            // is_sentry_object: null,
            // neo_reference_id: null,
            // designation: null
            // name: null,
            // estimated_diameter_kilometer: null,
            // estimated_diameter_miles: null,
            // estimated_diameter_feet: null,
            // close_approach_date: null,
            // data_arc_in_days: null
        },
        
      }
    },
    created () {
      let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu'
      window.axios.get(url)
      .then((response) => {
        console.log(response.data.near_earth_objects)
        this.data = response.data.near_earth_objects
      })
    }
  }
</script>
