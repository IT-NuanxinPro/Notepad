import { ref} from "vue";
import ConLeft from "./ConLeft";
import ConRight from "./ConRight";

export default {
	name: "App",
	setup(){
		const title = ref("暖心记事本");
		const searchContent = ref("")
		// const data = ref([]);
		const listData = ref([
			{
				id:1,
				title:"目标1",
				content:"年入百万",
				show:true,
				date:"2022-06-10 12:00:00"
			},
			{
				id:2,
				title:"目标2",
				content:"迎娶白富美",
				show:true,
				date:"2022-06-10 13:00:00"
			},
			{
				id:3,
				title:"目标3",
				content:"彩票中奖五百万",
				show:true,
				date:"2022-06-10 14:00:00"
			},
			{
				id:4,
				title:"目标4",
				content:"今年进大厂",
				show:true,
				date:"2022-06-10 15:00:00"
			},
			{
				id:5,
				title:"目标5",
				content:"面试顺利",
				show:true,
				date:"2022-06-10 16:00:00"
			},
			{
				id:6,
				title:"目标6",
				content:"遇到有缘人",
				show:true,
				date:"2022-06-10 17:00:00"
			}
		])
		const formData = ref({
			id:"",
			title:"",
			content:"",
			show:true,
			date:""
		})
		
	  if(listData.value.length>4){
			  //显示前4条数据
		  listData.value.forEach((item,index)=>{
				if(index>3){
					item.show = false;
				}
	  })
		}
		
		const add = () => {
				const id = Date.now().toString().substr(-5)
			  const data = getTime()
				formData.value.id = id
				formData.value.date = data
			if(formData.value.title!=""){
				listData.value.push(formData.value)
				formData.value = {
					id:"",
					title:"",
					content:"",
					show:true,
					date:""
				}
			}else{
				alert("不允许添加空事项")
			}
			
			if(listData.value.length>4){
				listData.value[listData.value.length-1].show = false;
				// 将新增的数据放入data数组中
				// data.value.push(listData.value[listData.value.length-1]);
			}
			
		}
		
		//获取当前的时间
		const getTime = () => {
			const date = new Date(),
						year = date.getFullYear(),
						month = date.getMonth()+1,
						day = date.getDate(),
						hour = date.getHours(),
						minute = date.getMinutes(),
						second = date.getSeconds();
			
		  //补0
			const m = month<10 ? "0"+month : month;
			const d = day<10 ? "0"+day : day;
			const h = hour<10 ? "0"+hour : hour;
			const min = minute<10 ? "0"+minute : minute;
			const s = second<10 ? "0"+second : second;
			return `${year}-${m}-${d} ${h}:${min}:${s}`
		}
		
		//修改
		const update = ()=>{
			const flag = listData.value.some(item=>{
				return item.id === formData.value.id;
			})
			if(flag){
				listData.value = listData.value.map(item=>{
					if(item.id=== formData.value.id){
						item = Object.assign({},formData.value)
					}
					return item;
				})
			}else {
				alert("你修改的文件不存在,请修改其他的文件")
			}
			// 修改时,时间相应的变化
			listData.value.forEach(item=>{
				if(item.id=== formData.value.id){
					item.date = getTime()
				}
			})
		}
		
		//重置
		const reserve = ()=>{
			formData.value = {
				id:"",
				title:"",
				content:"",
				show:true,
			}
		}
		
		
		// 编辑
		const edit = index =>{
			formData.value = {
				...listData.value[index]
			}
		}
		
		
		// 删除
		const del = id=>{
			listData.value = listData.value.filter(item=>item.id!==id);
		}
		
		// 点击加载更多
		const onLoadMore = ()=>{
			listData.value[listData.value.length-1].show = true;
			listData.value[listData.value.length-2].show = true;
		}
		
		//删除全部事项
		const clear = () => {
			listData.value = [];
		}
		
		const onSearch = () => {
			for (const item of listData.value) {
				if(searchContent.value===""){
					item.show = true
				}else {
					if(item.title.indexOf(searchContent.value) < 0&& item.content.indexOf(searchContent.value)<0){
						item.show = false
					}else {
						item.show = true
					}
				}
			}
		}
		
		return {
			title,
			searchContent,
			formData,
			listData,
			add,
			update,
			edit,
			del,
			clear,
			reserve,
			onSearch,
			onLoadMore
		}
	},
	components:{
		ConLeft,
		ConRight
	},
}