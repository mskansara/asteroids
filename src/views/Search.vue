<template>
  <div class="search container">
    <hr>

    
    <div class="row">
        <div class="col s12 m6 offset-l3">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Search By ID</span>
                    <form v-on:submit.prevent="searchById">
                        <label for="asteroid_id">Asteroid ID</label>
                        <input type="text" id="asteroid_id" v-model="id" required>
                        <button class="btn">Search</button>
                    </form>
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
        <button class="btn" v-if="favourite == false" @click="addToFavourite()"><i class="material-icons">add</i></button>
        <button class="btn disabled" v-else><i class="material-icons">check</i></button>
    </div>

    
  </div>
</template>


<script>
import firebase from 'firebase';

import Swal from 'sweetalert2';
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
                this.data = response.data;
                var user = firebase.auth().currentUser;
                if(user) {
                    const db = firebase.firestore();
                    db.collection("asteroids")
                    .where('user_id', '==', user.uid).where('asteroid_id', '==', this.data.id)
                    .get()
                    .then((response) => {
                        if (response.empty) {
                            this.favourite = false;
                        }
                        else {
                            this.favourite = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } 
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Wrong ID',
                    icon: 'error',
                    timer: 5000
                })
            })
        },
        addToFavourite() {
            var user = firebase.auth().currentUser;
            if(user) {
                const db = firebase.firestore();
                db.collection("asteroids")
                .add({
                    user_id: user.uid,
                    asteroid_id: this.data.id,
                    is_potentially_hazardous: this.data.is_potentially_hazardous_asteroid,
                    neo_reference_id: this.data.neo_reference_id,
                    designation: this.data.designation,
                    name: this.data.name,
                    estimated_diameter_kilometer_min: this.data.estimated_diameter.kilometers.estimated_diameter_min,
                    estimated_diameter_kilometer_max: this.data.estimated_diameter.kilometers.estimated_diameter_max,
                    estimated_diameter_miles_min: this.data.estimated_diameter.miles.estimated_diameter_min,
                    estimated_diameter_miles_max: this.data.estimated_diameter.miles.estimated_diameter_max,
                    estimated_diameter_feet_min: this.data.estimated_diameter.feet.estimated_diameter_min,
                    estimated_diameter_feet_max: this.data.estimated_diameter.feet.estimated_diameter_max,
                    is_sentry_object: this.data.is_sentry_object,
                    data_arc_in_days: this.data.orbital_data.data_arc_in_days
                })
                .then((response) => {
                    this.favourite = true;
                        Swal.fire({
                            title: 'Added to Favourites',
                            icon: 'success',
                            timer: 5000
                        })
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Could not add to favourites',
                        icon: 'error',
                        timer: 5000
                    })
                })
            } else {
                Swal.fire({
                    title: 'Please log in to add',
                    icon: 'error',
                    timer: 5000
                })
            }
        }
    }
}
</script>>
