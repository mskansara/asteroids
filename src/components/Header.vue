<template>
    <nav>
        <div class="nav-wrapper teal">
            <a href="#" class="brand-logo">Asteroids</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/search">Search</router-link></li>
                <li><router-link to="/searchbydate">Search By Date</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
}
</script>