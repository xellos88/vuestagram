<template>
    <div>
        <div class="post" v-for="(data, i) in $store.state.boardData" :key="i">
            <!-- <div class="post-img">{{ data.img }}</div> -->
            <div class="post-img" :class="data.filter" :style="{backgroundImage : `url('${data.img}')`}"></div>
            <div class="post-content">
                <p>좋아요{{ data.likes }}</p>
                <p>{{ data.name }} <strong>{{ data.content }}</strong></p>
                <p>시간:{{ data.created_at }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'PostComponent',
}
</script>
<style>
    
</style>