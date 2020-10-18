<template>
    <div class="signup container">
        <hr>
        <div class="row">
            <div class="col l6 m12 s12 center-align offset-l3">
                <div class="card z-depth-4">
                    <div class="card-content">
                        <h3>Sign Up</h3>
                        <form class="form" v-on:submit.prevent="signup">
                            <div class="row">
                                <div class="input-field col l12 m12 s12 black-text">
                                    <i class="material-icons prefix teal-text">mail_outline</i>
                                    <input name="email_id" type="email" id="email_id" v-model="email_id" required>
                                    <label for="email_id">Email ID</label>

                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col l12 m12 s12 black-text">
                                    <i class="material-icons prefix teal-text">fingerprint</i>
                                    <input name="password" type="password" id="password" autocomplete="off" v-model="password" required>
                                    <label for="password">Password</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col l12 m12 s12 black-text">
                                    <i class="material-icons prefix teal-text">fingerprint</i>
                                    <input name="confirm_password" type="password" id="confirm_password" v-model="confirm_password" class="validate" autocomplete="off" required>
                                    <label for="confirm_password">Confirm Password</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col l12 m12 s12" id="loginSubmitBtnRow">
                                    <button class="btn-large waves-effect waves-light" id="loginSubmitBtn" type="submit" name="submit">Sign Up<i class="material-icons right">send</i></button>
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
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            email_id: '',
            password: '',
            confirm_password: ''
        }
    },
    methods: {
        signup() {
            if(this.password != this.confirm_password) {
                Swal.fire({
                    title: 'Password Error',
                    text: 'Confirm Password is not correct',
                    icon: 'error',
                    timer: 5000
                })
            } else {
                firebase.auth().createUserWithEmailAndPassword(this.email_id, this.password).then((user) =>{
                    console.log(user)
                    this.$router.replace('/favourites');
                    Swal.fire({
                        title: 'Account Created',
                        icon: 'success',
                        timer: 5000
                    })
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Failed to create account',
                        icon: 'error',
                        timer: 5000
                    })
                })
            }
            
        }
    }
}
</script>