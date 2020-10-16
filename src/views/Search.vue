<template>
  <div class="search container">
    <hr>

    
    <div class="row">
        <div class="col s12 m6 offset-l3">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Search By ID</span>
                    <label for="asteroid_id">Asteroid ID</label>
                    <input type="text" id="asteroid_id" v-model="id">
                </div>
                <div class="card-action">
                    <button class="btn" @click="searchById()">Search</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row" v-if="flag">
        <hr>
        <h3>Details</h3>
        <table class="centered responsive">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>{{this.data.id}}</td>
                </tr>
                <tr>
                    <td>Neo Reference ID</td>
                    <td>{{this.data.neo_reference_id}}</td>
                </tr>
                <tr>
                    <td>Designation</td>
                    <td>{{this.data.designation}}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{{this.data.name}}</td>
                </tr>
                <tr>
                    <td>Is Potentially Hazardous</td>
                    <td>{{this.data.is_potentially_hazardous_asteroid}}</td>
                </tr>
                <tr>
                    <td>Is Sentry Object</td>
                    <td>{{this.data.is_sentry_object}}</td>
                </tr>
                <tr>
                    <td>Estimated Diameter (in feet)</td>
                    <td>Min:{{this.data.estimated_diameter.feet.estimated_diameter_min}}, Max:{{this.data.estimated_diameter.feet.estimated_diameter_max}}</td>
                </tr>
                <tr>
                    <td>Estimated Diameter (in kilometers)</td>
                    <td>Min:{{this.data.estimated_diameter.kilometers.estimated_diameter_min}}, Max:{{this.data.estimated_diameter.kilometers.estimated_diameter_max}}</td>
                </tr>
                <tr>
                    <td>Estimated Diameter (in miles)</td>
                    <td>Min:{{this.data.estimated_diameter.miles.estimated_diameter_min}}, Max: {{this.data.estimated_diameter.miles.estimated_diameter_max}}</td>
                </tr>
                <tr>
                    <td>Data Arc (in days)</td>
                    <td>{{this.data.orbital_data.data_arc_in_days}}</td>
                </tr>
            </tbody>
        </table>
        <br>
        <button class="btn"><i class="material-icons" v-if="!favourite">add</i><i class="material-icons" v-else>check</i></button>
    </div>

    
  </div>
</template>


<script>
export default {
    name: 'Search',
    data () {
        return {
            id: null,
            flag: false,
            data: {},
            favourite: false
        }
    },
    created () {
        this.flag = false;
    },
    methods: {
        searchById () {
            let url = 'https://api.nasa.gov/neo/rest/v1/neo/' + this.id + '?api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu';
            window.axios.get(url)
            .then((response) => {
                this.flag = true
                console.log(response.data)
                this.data = response.data;
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>>
