<template>
    <div class="login container">
        <hr>
        <div class="row">
            <div class="col l6 m12 s12 center-align offset-l3">
                <div class="card z-depth-4">
                    <div class="card-content">
                        <h3>Login</h3>
                        <form class="form" v-on:submit.prevent="login">
                            <div class="row">
                                <div class="input-field col l12 m12 s12 black-text">
                                    <i class="material-icons prefix teal-text">mail_outline</i>
                                    <input name="email_id" type="text" id="email" class="validate" v-model="email_id">
                                    <label for="email_id">Email ID</label>

                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col l12 m12 s12 black-text">
                                    <i class="material-icons prefix teal-text">fingerprint</i>
                                    <input name="password" type="password" id="password" class="validate" autocomplete="off" v-model="password">
                                    <label for="password">Password</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col l12 m12 s12" id="loginSubmitBtnRow">
                                    <button class="btn-large waves-effect waves-light" id="loginSubmitBtn" type="submit" name="submit">Login<i class="material-icons right">send</i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    data() {
        return {
            email_id: null,
            password: null
        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email_id, this.password)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>