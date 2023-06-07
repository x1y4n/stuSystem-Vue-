<template>
    <timetable
    :afternoon-Length="5"
    :length="12"
    :events="events1"/>
</template>
<script>
import timetable from '../../common/TimeTable'
    export default{
        components:{
            timetable
        },
        data(){
          return {
            info:[],
            events1: [
                
            ],
          }
        },
        created(){
            this.searchTable()
        },
        methods:{
            searchTable(){
                this.$axios(`/api/classtable/table`).then(res=>{
                    this.events1 = res.data.data
                })
                console.log(this.events1)

            }
        }
    }

</script>