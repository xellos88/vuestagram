import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
    state(){
        return{
            boardData:[],//게시글 데이터 저장
            lastId: '', //가장 마지막에 로드된 게시물의 ID
            addBtnFlg:true,
            tabFlg: 0, //탭UI flg:0:메인,1:필터,2:작성
            imgUrl:'',//이미지 url
            filter:'',
        }
    },
    mutations:{
        //초기 데이터 셋팅용
        createBoardData(state, data){
            state.boardData = data;
            this.commit('changeLastId', data[data.length-1].id);
        },
        //더보기 데이터 셋팅용
        addBoardData(state, data){
            state.boardData.push(data);
            this.commit('changeLastId', data.id);
        },
        //lastId 변경
        changeLastId(state, id){
            state.lastId=id;
        },
        // 탭UI Flg 변경
        changeTabFlg(state, num){
            state.tabFlg = num;
        },
        //이미지 URL 변경
        changeImgUrl(state, imgUrl){
            state.imgUrl= imgUrl;
        },
        //필터명 변경
        changeFilter(state,filter){
            state.filter=filter;
        },
        //필터 초기화
        clearState(state){
            state.filter='';
            state.imgUrl='';
        }
    },
    actions:{
        getMainList(context){
            axios.get('http://192.168.0.66/api/boards')
            .then(res=>{
                context.commit('createBoardData',res.data);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getMoreList(context){
                axios.get('http://192.168.0.66/api/boards/'+context.state.lastId)
                .then(res=>{
                    if (res.data) {
                    context.commit('addBoardData',res.data);
                    }else{
                        context.state.addBtnFlg = false;
                        alert('없음');
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
    }
})

export default store