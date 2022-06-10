import { PlusCircleOutlined,EditOutlined,ReloadOutlined} from '@ant-design/icons-vue';
export default {
	name: "ConRight",
	props:["formdata"],
	emits:["on-add","on-update","on-reserve"],
	components:{
		PlusCircleOutlined,
		EditOutlined,
		ReloadOutlined
	},
	setup(props,{emit}) {
		const add = () => {
			emit("on-add")
		}
		
		const update = () => {
			emit("on-update")
		}
		
		const reserve = () => {
			emit("on-reserve")
		}
		
		return {
			add,
			update,
			reserve
		}
	},
	template:`
		<div class="part">
		<a-form layout="horizontal" :model="formdata" :label-col="{span:4}" :wrapper-col="{span:20}">
			<a-form-item label="Id">
				{{formdata.id}}
			</a-form-item>
			<a-form-item label="标题">
				<a-input v-model:value="formdata.title" />
			</a-form-item>
			<a-form-item label="内容">
				<a-textarea v-model:value="formdata.content" />
			</a-form-item>
			<a-form-item>
				<a-row type="flex" justify="center">
					<a-col :span="4" offset="6">
						<a-button type="primary" @click="add" ><plus-circle-outlined />新增</a-button>
					</a-col>
					<a-col :span="4" offset="2">
						<a-button type="primary" ghost @click="update" style="color:skyblue"><edit-outlined />修改</a-button>
					</a-col>
					<a-col :span="4" offset="2">
						<a-button  type="primary" danger ghost @click="reserve" style="color: red"><reload-outlined /> 重置</a-button>
					</a-col>
				</a-row>
			</a-form-item>
		</a-form>
		</div>
	`
}