<template>
    <b-container fluid>
        <b-row>
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
    props: ['uid'],
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
                
                store.update(this.profile.uid, this.profile).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created")
                    this.$emit('rating-complete')
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