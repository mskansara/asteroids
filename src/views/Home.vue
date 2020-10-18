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
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>
// @ is an alias to /src
  import firebase from 'firebase';
  export default {
    name: 'Home',

    data () {
      return {
        data: {},
      }
    },

    created () {
      let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu'
      window.axios.get(url)
      .then((response) => {
        this.data = response.data.near_earth_objects
      })
    },

    methods: {
      addToFavourite(item) {
        var user = firebase.auth().currentUser;
        if(user) {
          const db = firebase.firestore();
          db.collection("asteroids")
          .add({
            user_id: user.uid,
            asteroid_id: item.id,
            is_potentially_hazardous: item.is_potentially_hazardous_asteroid,
            neo_reference_id: item.neo_reference_id,
            designation: item.designation,
            name: item.name,
            estimated_diameter_kilometer_min: item.estimated_diameter.kilometers.estimated_diameter_min,
            estimated_diameter_kilometer_max: item.estimated_diameter.kilometers.estimated_diameter_max,
            estimated_diameter_miles_min: item.estimated_diameter.miles.estimated_diameter_min,
            estimated_diameter_miles_max: item.estimated_diameter.miles.estimated_diameter_max,
            estimated_diameter_feet_min: item.estimated_diameter.feet.estimated_diameter_min,
            estimated_diameter_feet_max: item.estimated_diameter.feet.estimated_diameter_max,
            is_sentry_object: item.is_sentry_object,
            data_arc_in_days: item.orbital_data.data_arc_in_days
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error)
          })
        } else {
          alert("You need to log in first")
        }
      }
    }
  }
</script>
