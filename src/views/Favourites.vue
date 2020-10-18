<template>
    <div class="favourite container">
        <div class="row" v-if="data.length == 0">
            <h4>You have not added any favourites</h4>
        </div>
        <div v-else>
            <h3>Favorites</h3>
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
                    <td>{{item.asteroid_id}}</td>
                    <td>{{item.neo_reference_id}}</td>
                    <td>{{item.designation}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.is_potentially_hazardous}}</td>
                    <td>{{item.is_sentry_object}}</td>
                    <td>Min:{{item.estimated_diameter_feet_min}}, Max:{{item.estimated_diameter_feet_max}}</td>
                    <td>Min:{{item.estimated_diameter_kilometer_min}}, Max:{{item.estimated_diameter_kilometer_max}}</td>
                    <td>Min:{{item.estimated_diameter_miles_min}}, Max:{{item.estimated_diameter_miles_max}}</td>
                    <td>{{item.data_arc_in_days}}</td>
                    
                </tr>
            </tbody>
        </table>
        </div>
        
    </div>
</template>


<script>
    import firebase from 'firebase';
    export default {
        data () {
            return {
                data: []
            }
        },
        created() {
            let user = firebase.auth().currentUser;
            const db = firebase.firestore();
            db.collection("asteroids")
            .where('user_id', '==' ,user.uid)
            .get()
            .then((response) => {
                response.forEach(element => {
                    console.log(element.data());
                    this.data.push(element.data());
                });
            })
            .catch((error) => {
                console.log(error)
            })

        }
    }
</script>>