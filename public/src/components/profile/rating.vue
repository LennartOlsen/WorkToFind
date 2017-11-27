<template>
    <b-container fluid>
        <b-row v-if="profile && rate == false">
            <h3 v-if="profile.averageRating != null">Average rating: <img src="../../assets/star.png" />{{ profile.averageRating }}</h3>
            <h3 v-if="profile.averageRating == null">Average rating: <img src="../../assets/star.png" />0</h3>
        </b-row>
        <b-row v-if="rate == true">
            <div id="star-rating">
                <img src="../../assets/star.png" @click="addRatingToUser(1)" />
                <img src="../../assets/star.png" @click="addRatingToUser(2)" />
                <img src="../../assets/star.png" @click="addRatingToUser(3)" />
                <img src="../../assets/star.png" @click="addRatingToUser(4)" />
                <img src="../../assets/star.png" @click="addRatingToUser(5)" />
            </div>
        </b-row>
    </b-container>
</template>


<script>
import * as settings from '../../settings'
import store from '../../repositories/profiles'

export default {
    name: 'rating',
    props: ['uid', 'rate'],
    data: function(){ 
        return {
            profile: null
        }
    },
    mounted: function(){
        store.get(this.uid).then(profile => {
                    this.profile = profile
                })
    },
    methods: {
        addRatingToUser(numberRating){
            if(numberRating >=0 && numberRating <= 5){

                this.profile.totalRating += numberRating
                this.profile.numberOfRatings += 1
                this.profile.averageRating = this.profile.totalRating / this.profile.numberOfRatings

                console.log(this.profile)
                
                store.update(this.profile.uid, this.profile).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created")
                }
                
            })
            }
        }
    }
}
</script>

<style>
#star-rating img:hover{
    cursor: pointer;
}
</style>