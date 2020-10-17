<template>
    <div class="favourite container">
        <h3>Favorites will be shown here</h3>
        <p v-for="item in data" :key=item.id>{{item.user_id}}</p>
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