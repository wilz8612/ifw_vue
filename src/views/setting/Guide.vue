<template>
	<section>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->

		<el-steps :active="active" simple finish-status="success" style="margin-top: 12px;">
		  <el-step title="网口" icon="el-icon-edit"></el-step>
		  <el-step title="区域" icon="el-icon-upload"></el-step>
		  <el-step title="部署模式" icon="el-icon-picture"></el-step>
			<el-step title="管理" icon="el-icon-upload"></el-step>
		  <el-step title="发现" icon="el-icon-picture"></el-step>
		</el-steps>

    <el-button style="margin-top: 12px;" @click="pre" >上一步</el-button>
    <el-button style="margin-top: 12px; float:right" @click="next" :disabled="this.active===4">下一步</el-button>

		<!--列表-->
		<template>
			<el-table :data="guide.iflist" highlight-current-row v-loading="loading" style="width: 100%;" v-show="this.active==0">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="120" sortable>
				</el-table-column>
				<el-table-column prop="type" label="类型" width="100" >
				</el-table-column>
				<el-table-column  label="是否启用" min-width="200" >
				<template slot-scope="scope">
				<el-switch v-model="scope.row.active"
					active-color="#13ce66"
					active-value="on"
					inactive-value ="off" @change='switchChange($event,scope.row.name)'>
					</el-switch>
				</template>
				</el-table-column>
			 </el-table>



			 <el-row>
		   <el-col :span="24"  v-show="this.active==1" style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addZone'></i></el-col>
		  </el-row>
			<el-table :data="guide.zones" highlight-current-row v-loading="loading" style="width: 100%;" v-show="this.active==1">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="120" sortable>
				</el-table-column>
				<el-table-column prop="member" label="网口成员" width="100" :formatter="formatMember" >
				</el-table-column>
				<el-table-column prop="comments" label="描述" width="120" >
				</el-table-column>
				<el-table-column label="操作" min-width="150">
					<template slot-scope="scope">
						<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
						<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteZone(scope.row)'></i>
					</template>
				</el-table-column>
			</el-table>


<div v-show="this.active==2">
	<el-row>
	 <el-col :span="24"  style="text-align:center;" >
		 <el-radio-group v-model="radio" fill='#409EFF'  text-color='#ffffff' @change='handleChange' >
		 <el-radio label="1">透明模式</el-radio>
		 <el-radio label="2">网关模式</el-radio>
		 <el-radio label="3">混合模式</el-radio>
		</el-radio-group>
	</el-col>
 </el-row>
<div class="boxdiv" v-show="this.radio==='1'">
	<el-row>
	<el-col :span="24"  v-show="this.active==2" style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addTrans'></i></el-col>
 </el-row>
	<el-table :data="guide.top.trans.list" highlight-current-row style="width: 100%;" >
		<el-table-column type="index" width="60">
		</el-table-column>
		<el-table-column prop="name" label="名称" width="120" >
		</el-table-column>
		<el-table-column prop="if_member" label="网口成员" width="100" :formatter="formatifMember" >
		</el-table-column>

		<el-table-column label="操作" min-width="150">
			<template slot-scope="scope">
				<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
				<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteTrans(scope.row.name)'></i>
			</template>
		</el-table-column>
	</el-table>
</div>

	<div class="boxdiv" v-show="this.radio==='2'">
		<el-row>
		<el-col :span="24"   style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addRoute'></i></el-col>
	 </el-row>
		<el-table :data="guide.top.route.list" highlight-current-row style="width: 100%;" >
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="ifname" label="名称" width="120" >
			</el-table-column>

			<el-table-column prop="ip" label="ip地址" width="120" >
			</el-table-column>

			<el-table-column prop="netmask" label="子网掩码" width="120" >
			</el-table-column>


			<el-table-column label="操作" min-width="150">
				<template slot-scope="scope">

					<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
					<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteRoute(scope.row.ifname)'></i>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<div class="boxdiv" v-show="this.radio==='3'">
		<el-row>
		<el-col :span="24"   style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addMixed'></i></el-col>
		</el-row>
		<el-table :data="guide.top.mixed.list" highlight-current-row style="width: 100%;" >
			<el-table-column type="index" width="60">
			</el-table-column>

			<el-table-column prop="name" label="名称" width="120" >
			</el-table-column>

			<el-table-column prop="if_member" label="网口成员" width="120"  :formatter="formatifMember" >
			</el-table-column>

			<el-table-column prop="ip" label="ip地址" width="120" >
			</el-table-column>

			<el-table-column prop="netmask" label="子网掩码" width="120" >
			</el-table-column>


			<el-table-column label="操作" min-width="150">
				<template slot-scope="scope">

					<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
					<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteMixed(scope.row.name)'></i>
				</template>
			</el-table-column>
		</el-table>
	</div>
</div>


			<!-- <el-tabs v-model="activeName" type="card"  class="el-col el-col-24"  style="margin-top:12px;" v-show="this.active==2">
					<el-tab-pane label="透明模式" name="first">
						<el-row>
						<el-col :span="24"  v-show="this.active==2" style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addTrans'></i></el-col>
					 </el-row>
						<el-table :data="guide.top.trans" highlight-current-row style="width: 100%;" >
							<el-table-column type="index" width="60">
							</el-table-column>
							<el-table-column prop="name" label="名称" width="120" >
							</el-table-column>
							<el-table-column prop="if_member" label="网口成员" width="100" :formatter="formatifMember" >
							</el-table-column>

							<el-table-column label="操作" min-width="150">
								<template scope="scope">
									<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
									<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteTrans(scope.row.name)'></i>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="网关模式" name="second">
						<el-row>
						<el-col :span="24"  v-show="this.active==2" style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addRoute'></i></el-col>
					 </el-row>
						<el-table :data="guide.top.route" highlight-current-row style="width: 100%;" >
							<el-table-column type="index" width="60">
							</el-table-column>
							<el-table-column prop="ifname" label="名称" width="120" >
							</el-table-column>

							<el-table-column prop="ip" label="ip地址" width="120" >
							</el-table-column>

							<el-table-column prop="netmask" label="子网掩码" width="120" >
							</el-table-column>


							<el-table-column label="操作" min-width="150">
								<template scope="scope">

									<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
									<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteRoute(scope.row.ifname)'></i>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
          <el-tab-pane label="混合模式" name="third">
						<el-row>
						<el-col :span="24"  v-show="this.active==2" style="text-align:center;">	<i class="fa fa-plus" aria-hidden="true"  style="font-size:20px;color:#67c23a; margin-right:5px;" @click='addMixed'></i></el-col>
					  </el-row>
						<el-table :data="guide.top.mixed" highlight-current-row style="width: 100%;" >
							<el-table-column type="index" width="60">
							</el-table-column>

							<el-table-column prop="name" label="名称" width="120" >
							</el-table-column>

							<el-table-column prop="if_member" label="网口成员" width="120"  :formatter="formatifMember" >
							</el-table-column>

							<el-table-column prop="ip" label="ip地址" width="120" >
							</el-table-column>

							<el-table-column prop="netmask" label="子网掩码" width="120" >
							</el-table-column>


							<el-table-column label="操作" min-width="150">
								<template scope="scope">

									<i class="fa fa-pencil" aria-hidden="true"  style="font-size:20px;color:#3385ff; margin-right:5px;"></i>
									<i class="fa fa-close"  aria-hidden="true"  style="font-size:24px;color:#f00;" @click='deleteMixed(scope.row.name)'></i>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs> -->


 <div class="boxdiv"  v-show="this.active==3">
	<div class="boxdiv" style="width:50%;">
		<el-row>
		<el-col :span="24" >
		<el-checkbox v-model="isout">带外管理</el-checkbox>
		</el-col>
	 </el-row>
		<el-form :model="guide.management.outbound.data" label-width="80px" size="mini" ref="addRouteForm">
			<el-form-item label="ip地址">
				<el-input v-model="guide.management.outbound.data.ip" auto-complete="off"  :disabled="!isout"></el-input>
		 </el-form-item>

		 <el-form-item label="子网掩码">
			 <el-input v-model="guide.management.outbound.data.netmask" auto-complete="off" :disabled="!isout"></el-input>
		</el-form-item>

		<el-form-item label="默认网关">
			<el-input v-model="guide.management.outbound.data.gw" auto-complete="off" :disabled="!isout"></el-input>
	 </el-form-item>

		</el-form>
	</div>


<div class="boxdiv" style="width:50%;">
	<el-row>
	<el-col :span="24" >
	<el-checkbox v-model="isin">带内管理</el-checkbox>
</el-col>
</el-row>
		 <el-form :model="guide.management.inbound.data" label-width="80px" size="mini" ref="addRouteForm">
					 <el-form-item label="网口">
						 <el-select v-model="guide.management.inbound.data.ifname" placeholder="请选择" :disabled="!isin">
						 <el-option
							 v-for="item in iflist"
							 :key="item.value"
							 :label="item.label"
							 :value="item.value">
						 </el-option>
						</el-select>
					 </el-form-item>
					 <el-form-item label="ip地址">
						 <el-input v-model="guide.management.inbound.data.ip" auto-complete="off" :disabled="!isin"></el-input>
					</el-form-item>

					<el-form-item label="子网掩码">
						<el-input v-model="guide.management.inbound.data.netmask" auto-complete="off" :disabled="!isin"></el-input>
				 </el-form-item>

				 <el-form-item label="默认网关">
					 <el-input v-model="guide.management.inbound.data.gw" auto-complete="off"  :disabled="!isin"></el-input>
				</el-form-item>
				 </el-form>
</div>

 </div>


			 <div class="boxdiv" v-show="this.active==4">
			 <el-row>
				 <el-col :span="24" style="text-align:center;" >	 <el-checkbox v-model="checked">开启网络发现</el-checkbox> </el-col>
			 </el-row>
			 <el-row>
				<el-col :span="24" style="text-align:center;" >	  <el-button  type="primary" @click="complete" plain >完成设置</el-button></el-col>
			</el-row>
			</div>


		<el-dialog title="JSON" :visible.sync="addCompleteFormVisible" :close-on-click-modal="false">

		 <div class="boxdiv" v-html='JSON.stringify(guide)'>

		 </div>

		</el-dialog>


				<!--新增界面-->
				<el-dialog title="新增区域" :visible.sync="addZoneFormVisible" :close-on-click-modal="false">
					<el-form :model="addZoneForm" label-width="80px" size="mini" :rules="addFormRules" ref="addZoneForm">
						<el-form-item label="区域名称" prop="name">
							<el-input v-model="addZoneForm.name" style="width:50%" auto-complete="off"></el-input>
						</el-form-item>
						<!-- <el-form-item label="性别">
							<el-radio-group v-model="addForm.sex">
								<el-radio class="radio" :label="1">男</el-radio>
								<el-radio class="radio" :label="0">女</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label="生日">
							<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
						</el-form-item> -->
						<el-form-item label="网口列表">
							<el-transfer v-model="addZoneForm.member" :data="iflist"   :titles="['待选', '已选']"></el-transfer>
				   </el-form-item>
						<el-form-item label="描述">
							<el-input type="textarea" v-model="addZoneForm.comments"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="addZoneFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="addZoneSubmit" :loading="addLoading">提交</el-button>
					</div>
				</el-dialog>


				<el-dialog title="新增透明模式" :visible.sync="addTransFormVisible" :close-on-click-modal="false">
					<el-form :model="addTransForm" label-width="80px" size="mini" ref="addTransForm">
						<el-form-item label="名称" prop="name">
							<el-input v-model="addTransForm.name" style="width:50%" auto-complete="off"></el-input>
						</el-form-item>
						<!-- <el-form-item label="性别">
							<el-radio-group v-model="addForm.sex">
								<el-radio class="radio" :label="1">男</el-radio>
								<el-radio class="radio" :label="0">女</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label="生日">
							<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
						</el-form-item> -->
						<el-form-item label="网口列表">
							<el-transfer v-model="addTransForm.if_member" :data="iflist" :titles="['待选', '已选']"></el-transfer>
					 </el-form-item>

					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="addTransFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="addTransSubmit" :loading="addLoading">提交</el-button>
					</div>
				</el-dialog>


				<el-dialog title="新增网关模式" :visible.sync="addRouteFormVisible" :close-on-click-modal="false">
					<el-form :model="addRouteForm" label-width="80px" size="mini" ref="addRouteForm">
						<el-form-item label="网口">
							<el-select v-model="addRouteForm.ifname" placeholder="请选择">
					    <el-option
					      v-for="item in iflist"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				     </el-select>
						</el-form-item>

						<el-form-item label="ip地址">
							<el-input v-model="addRouteForm.ip" auto-complete="off"></el-input>
					 </el-form-item>

					 <el-form-item label="子网掩码">
						 <el-input v-model="addRouteForm.netmask" auto-complete="off"></el-input>
					</el-form-item>

					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="addRouteFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="addRouteSubmit" :loading="addLoading">提交</el-button>
					</div>
				</el-dialog>


				<el-dialog title="新增混合模式" :visible.sync="addMixedFormVisible" :close-on-click-modal="false">
					<el-form :model="addMixedForm" label-width="80px" size="mini" ref="addMixedForm">
						<el-form-item label="名称">
							<el-input v-model="addMixedForm.name" auto-complete="off"></el-input>
					 </el-form-item>

					 <el-form-item label="网口列表">
	 					<el-transfer v-model="addMixedForm.if_member" :data="iflist"></el-transfer>
	 			  </el-form-item>
						<el-form-item label="ip地址">
							<el-input v-model="addMixedForm.ip" auto-complete="off"></el-input>
					 </el-form-item>
					 <el-form-item label="子网掩码">
						 <el-input v-model="addMixedForm.netmask" auto-complete="off"></el-input>
					</el-form-item>

					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="addMixedFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="addMixedSubmit" :loading="addLoading">提交</el-button>
					</div>
				</el-dialog>

		</template>

	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			// const generateData = _ => {
		  //        const data = [];
		  //        for (let i = 1; i <= 5; i++) {
		  //          data.push({
		  //            key: `eth${i}`,
		  //            label: `eth${i}`,
			// 					 value:`eth${i}`,
		  //            disabled: false
		  //          });
		  //        }
		  //        return data;
		  //      };
			return {
				activeName:'first',
				iflist:[],
				addZoneFormVisible:false,
				addTransFormVisible:false,
				addRouteFormVisible:false,
				addMixedFormVisible:false,
				addCompleteFormVisible:false,
				checked:true,
				radio: '1',
				isout:false,
				isin:false,
				active: 0,
				filters: {
					name: ''
				},
				loading: false,
				users: [
				],
				guide:
				{
					iflist:[],
					zones:[],
					top:{
						trans:{list:[],active:'on'},
						route:{list:[],active:'off'},
						mixed:{list:[],active:'off'}
					},
					management:
					{
						outbound:
							{
								data:
									{
									ip:"",
									mask:"",
									gw:""
								},
							active:"off"
							},
							inbound:
							{
								data:
								{
								ifname:"",
								ip:"",
								mask:"",
								gw:""
							},
								active:"off"
							}
					}
				},
				addZoneForm: {
					name: '',
					member:[],
					comments:''
				},

				addTransForm: {
					name: '',
					if_member:[]
				},

				addRouteForm: {
					ifname: '',
					ip:'',
					netmask:''
				},

				addMixedForm: {
					name: '',
					if_member:[],
					ip:'',
					netmask:''
				},
				guideResult:{},
	      addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			switchChange($event,val)
			{
        let obj = this.iflist.find(v=>v.key===val);
				if($event=='off')
				{
					obj.disabled=true;
					for (let item of this.guide.zones) {
						for (let m of item.member) {
							item.member.splice(item.member.findIndex(v=>v===val),1);
						}
					}
				}
				else
				{
					obj.disabled=false;
				}
			},
			complete()
			{
				this.addCompleteFormVisible = true;
				console.log(JSON.stringify(this.guide));
			},

			pre() {
		     if (this.active > 0)
				 {
				     this.active --;
			   }
	    },
			next() {
		     if (this.active++ > 4)
				 	{
				     this.active = 0;
			 		}
	    },
			//转换
			formatMember: function (row, column) {
				// return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
				return row.member.join(',');
			},
			formatifMember: function (row, column) {
				// return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
				return row.if_member.join(',');
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					this.users = res.data.users;
					this.loading = false;
					//NProgress.done();
				});
			},

      addZone(){
      this.addZoneFormVisible = true;
			this.addZoneForm={
				name: '',
				member:[],
				comments:''
			};
			},

			addZoneSubmit()
			{
       this.$refs.addZoneForm.validate((valid)=>{
				if (valid){
				this.addLoading = true;
				this.guide.zones.push(this.addZoneForm);
				for (let member of this.addZoneForm.member) {
					let aa= this.iflist.find(v=>v.key===member);
					if(aa)
					{
						aa.disabled=true;
					}
				}
				this.addZoneFormVisible=false;
        this.addLoading = false;
			}
		   });
			},

			addTrans(){
			this.addTransFormVisible = true;
			},

			addTransSubmit()
			{
				this.addLoading = true;
				this.guide.top.trans.list.push(this.addTransForm);
				this.addTransFormVisible=false;
				this.addLoading = false;
			},

			addRoute(){
			this.addRouteFormVisible = true;
			},

			addRouteSubmit()
			{
				this.addLoading = true;
				this.guide.top.route.list.push(this.addRouteForm);
				this.addRouteFormVisible=false;
				this.addLoading = false;
			},

			addMixed(){
			this.addMixedFormVisible = true;
			},

			addMixedSubmit()
			{
				this.addLoading = true;
				this.guide.top.mixed.list.push(this.addMixedForm);
				this.addMixedFormVisible=false;
				this.addLoading = false;
			},


			deleteZone(zone)
			{
				let self=this;
				this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
					for (let m of zone.member) {
						let aa= this.iflist.find(v=>v.key===m);
						if(aa)
						{
							aa.disabled=false;
						}
					}

				 self.guide.zones.splice(self.guide.zones.findIndex(v => v.name === zone.name),1);
				}).catch(() => {

				});
			},

			deleteTrans(zone)
			{
				let self=this;
				this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
				self.guide.top.trans.splice(self.guide.top.trans.list.findIndex(v => v.name === zone),1);
				}).catch(() => {

				});
			},

			deleteRoute(zone)
			{
				let self=this;
				this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
				self.guide.top.route.list.splice(self.guide.top.route.list.findIndex(v => v.name === zone),1);
				}).catch(() => {

				});
			},


			deleteMixed(zone)
			{
				let self=this;
				this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
				self.guide.top.mixed.list.splice(self.guide.top.mixed.list.findIndex(v => v.name === zone),1);
				}).catch(() => {

				});
			},

			handleChange(e)
			{
        if(e==='1')
				{
					self.guide.top.trans.active='on';
          self.guide.top.mixed.active='off';
					self.guide.top.route.active='off';
				}
				if(e==='2')
				{
					self.guide.top.route.active='on';
					self.guide.top.trans.active='off';
					self.guide.top.mixed.active='off';
				}
				if(e==='3')
				{
					self.guide.top.mixed.active='on';
					self.guide.top.trans.active='off';
					self.guide.top.route.active='off';
				}

			}
		},
		mounted() {
		//	this.getUser();


			this.guide.iflist.push({
					name: 'eth1',
					type:'物理接口',
					active:'on'
			});

			this.guide.iflist.push({
				name: 'eth2',
				type:'物理接口',
				active:'on'
			})

			this.guide.iflist.push({
					name: 'eth3',
					type:'物理接口',
					active:'on'
			});

			this.guide.iflist.push({
					name: 'eth4',
					type:'物理接口',
					active:'on'
			});

			this.guide.iflist.push({
					name: 'eth5',
					type:'物理接口',
					active:'on'
			});

    let self=this;
			for (let item of this.guide.iflist)
			{
				self.iflist.push({
			             key:item.name,
			             label:item.name,
									 value:item.name,
			             disabled:!(item.active==='on')
			            });
			}


			// this.guide.zones.push({
			// 	name: '区域1',
			// 	member:['eth1','eth2'],
			// 	comments:'sssfdfdf'
			// })
      //
			// this.guide.zones.push({
			// name: '区域2',
			// member:['eth3','eth4'],
			// comments:'sssfdfdf'
			// })
      //
			// this.guide.top.trans.list.push({
			// 	name:'test1',
			//  if_member:['eth1','eth2']
			// })
      //
			// this.guide.top.trans.list.push({
			// 	name:'test2',
			//   if_member:['eth3','eth4']
			// })
      //
			// this.guide.top.route.list.push({
			// 	ifname:'test1',
			//   ip:'1.1.1.1',
			// 	netmask:'1.1.1.1'
			// })
      //
			// this.guide.top.route.list.push({
			// 	ifname:'test2',
			// 	ip:'1.1.1.1',
			// 	netmask:'1.1.1.1'
			// })
      //
			// this.guide.top.mixed.list.push({
			// 	name:'test1',
			//   if_member:['eth1','eth2'],
			// 	ip:'1.1.1.1',
			// 	netmask:'1.1.1.1'
			// })
      //
			// this.guide.top.mixed.list.push({
			// 	name:'test2',
			// 	if_member:['eth3','eth4'],
			// 	ip:'1.1.1.1',
			// 	netmask:'1.1.1.1'
			// })

		}
	};

</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
	.boxdiv{
		border: 1px solid #cabbbb;
		border-radius: 3px;
		transition: 0.2s;
		padding: 24px;
		margin-top:12px;
	}
</style>
