<template>
  <div class="search">
    <h1>This is search page</h1>
    <h4>Create a mechanism for searching a specific asteroid based on its ID.</h4>
  </div>
</template>


<script>
export default {
    name: 'Search',
    data () {
        return {
            id: 3729835,
            is_potentially_hazardous_asteroid: null,
            is_sentry_object: null,
            neo_reference_id: null,
            name: null,
            designation: null,
            estimated_diameter: {}
        }
    },
    created () {
        let url = 'https://api.nasa.gov/neo/rest/v1/neo/' + this.id + '?api_key=Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu';
        window.axios.get(url)
        .then((response) => {
            console.log(response.data)
            this.is_potentially_hazardous_asteroid = response.data.is_potentially_hazardous_asteroid
            this.is_sentry_object = response.data.is_sentry_object
            this.neo_reference_id = response.data.neo_reference_id
            this.name = response.data.name
            this. designation = response.data.designation
            this.estimated_diameter = response.data.estimated_diameter
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
</script>>
