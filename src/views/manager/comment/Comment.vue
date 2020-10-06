<template>
    <div class="comment">
        <wyq-fulllayout title="我的评论">
            <!-- {{commentBycus}} -->
            <van-cell-group class="cellgroup">
                <van-cell class="all_comments" title="全部评价" :value="commentBycus.total" />
            </van-cell-group>
            <div class="card">
                <div class="card1">顾客：{{cusInfo.realname}}</div>
                <wyq-comment-item 
                v-for="c in commentBycus.list" 
                :key='c.id' :c="c">
                </wyq-comment-item>
                <div class="commentnull" v-if="commentBycus.list.length==0">
                    <van-empty description="您还没有评论，赶快去评论吧！" />
                </div>
            </div>
        </wyq-fulllayout>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    created() {
        this.FindCustomerById(this.info.id)
        this.findAllCommentsBycus(this.info.id)
    },
    computed: {
        ...mapState('comment',['commentBycus']),
        ...mapState('user',['info', 'cusInfo']),
    },
    methods:{
        ...mapActions('comment',['findAllCommentsBycus']),
        ...mapActions('user',['FindCustomerById']),
    }
}
</script>

<style scoped>
.all_comments{
    margin-top:1em;
    padding: .5em;
    border-radius: 5px;
    background: #f1f1f1;
}
.card1{
  margin: 1em;
}
.cellgroup{
    margin-top: 50px;
}
</style>