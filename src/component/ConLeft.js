import {computed, ref} from "vue";
import {DeleteOutlined,LoadingOutlined,FormOutlined} from "@ant-design/icons-vue"
export default{
	name:"ConLeft",
	props:["list"],
	emits:["on-edit","on-del","on-clear","on-loadmore"],
	components:{
		DeleteOutlined,
		LoadingOutlined,
		FormOutlined,
	},
	setup(props,{emit}){
		 const loading = ref(true);
		 const val = ref(4);
		 let count = ref(6);
		 const desc = ref(["不重要 ","一般  ","重要  ","非常重要","特别重要"]);
	   const edit= index=>{
		  emit("on-edit",index)
	   }
		 
		 const del = id=>{
			 emit("on-del",id)
		}
		
		const clear = ()=>{
		   emit("on-clear")
		}
		
		const onLoadMore = ()=>{
			 emit("on-loadmore");
		}
		
		setTimeout(()=>{
			loading.value = false;
		},1500)
		
		const onChange = checked => {
			loading.value = !checked;
		};
		 
		 // 对数据进行监听
		  count = computed(()=>{
			 return props.list.length;
		 })
		
		
	
		 
		return {
			 edit,
			 del,
			onChange,
			loading,
			clear,
			onLoadMore,
			count,
			val,
			desc
		}
	},
	template:`
		<div class="part">
		   <a-switch :checked="!loading" @change="onChange" /> <br>
		   <a-row type="flex" v-if="!loading" justify="center">
			   <a-col :span="8" style="font-size: 16px">
				   <span>总共有 <strong>{{count}}</strong> 条事项</span>
			   </a-col>
				 <a-col :span="4" offset="10">
					 <a-button type="primary" @click="clear"><delete-outlined />清空所有</a-button>
				 </a-col>
		   </a-row>
		     <a-list :data-source="list" >
					 <template #loadMore>
						 <div
								 v-if="!loading"
								 :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
						 >
							 <a-button @click="onLoadMore" type="default" v-show="count"><loading-outlined />点击加载更多</a-button>
						 </div>
					 </template>
			     <template #renderItem="{item,index}">
				     <a-list-item v-if="item.show" key="item.title">
							 <a-skeleton :loading="loading" active  :paragraph="{ rows: 1 }" />
					    
								 <a-list-item-meta  v-if="!loading" :description="item.content.length>10 ?item.content.substring(0,10)+'...':item.content ">
									 <template #title>{{item.title}}</template>
								 </a-list-item-meta>
							 <a-list-item-meta v-if = "!loading" :description = "item.date"></a-list-item-meta>
							 <a-rate v-if = "!loading" v-model:value="val" :tooltips="desc"  style="font-size: 13px;transform: translateX(-10px)"/>
							 <span v-if = "!loading" class="ant-rate-text" >{{ desc[val - 1] }}</span>
								 <template #actions v-if="!loading">
									 <a key="edit" @click="edit(index)"><form-outlined />编辑</a>
									 <a key="del" style="color: #d63031" @click="del(item.id)"><delete-outlined />删除</a>
								 </template>
				     </a-list-item>
			     </template>
		     </a-list>
		</div>
	`
}