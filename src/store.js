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
            content:'',
            img:'',
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
        },
        changeImg(state, img){
            state.img = img;
        },
        // 작성글데이터셋팅용
        addWriteData(state,data){
            state.boardData.unshift(data);
        }
    },
    actions:{
        //메인 게시글 습득
        getMainList(context){
            axios.get('http://192.168.0.66/api/boards')
            .then(res=>{
                context.commit('createBoardData',res.data);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //게시글 추가 습득
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
            },
        //게시글작성
        writeContent(context){
            const data={
                name:'박진영',
                filter:context.state.filter,
                img:context.state.img,
                content:context.state.content
            };
            console.log(data)
            const header={
                headers:{
                    'Content-Type' : 'multipart/form-data',
                }
            };
            axios.post('http://192.168.0.66/api/boards',data, header)
            .then( res => {
                // console.log(res);
                context.commit('addWriteData', res.data);
                context.commit('changeTabFlg',0);
                context.commit('clearState');
            })
            .catch(err=>{
                console.log(err);
            })
        },
    }
})

export default store