<template>
	<el-card class="box-card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="searchUsers">
			<el-col :span="8">
				<el-input clearable @clear="clearInput" placeholder="请输入内容" v-model="query" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
				</el-input>
			</el-col>
			<el-col :span="6" :offset="1">
				<el-button type="primary" @click="addUsers">添加用户</el-button>
			</el-col>
		</el-row>
		<el-table height=400 :data="tableData" style="width: 100%;margin-bottom: 20px;">
			<el-table-column prop="id" label="#" width="60">
			</el-table-column>
			<el-table-column prop="username" label="姓名" width="100">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="180">
			</el-table-column>
			<el-table-column prop="mobile" label="电话" width="180">
			</el-table-column>
			<el-table-column label="创建日期" width="180">
				<template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
			</el-table-column>
			<el-table-column prop="mg_state" label="用户状态" width="100">
				<template slot-scope="scope">
					<el-switch @change="changeState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66"
						inactive-color="#ff4949">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button size="small" plain type="primary" icon="el-icon-edit" @click="editUsers(scope.row.id)"
						circle></el-button>
					<el-button size="small" plain type="danger" icon="el-icon-delete" @click="deleteUsers(scope.row.id)"
						circle>
					</el-button>
					<el-button @click="showRole(scope.row)" size="small" plain type="success" icon="el-icon-check"
						circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
			:page-sizes="[2, 4, 6, 8]" :page-size="4" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<el-dialog title="添加用户" :visible.sync="dialogVisible">
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" :label-width="formLabelWidth">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消</el-button>
				<el-button type="primary" @click="commiAddUsers()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑用户" :visible.sync="editUsersDialog">
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input disabled v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" :label-width="formLabelWidth">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeEditDialog">取 消</el-button>
				<el-button type="primary" @click="editUsersSure()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="分配角色" :visible.sync="roleRialog">
			<el-form>
				<el-form-item label="用户名" :label-width="formLabelWidth">
					{{roleusername}}
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth">
					{{currRoleId}}
					<el-select v-model="currRoleId">
						<el-option disabled label="请选择" :value="-1"></el-option>
						<el-option v-for="(val,index) in roleNameArr" :key="index" :label="val.roleName"
							:value="val.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="roleRialog = false">取 消</el-button>
				<el-button type="primary" @click="roledialogFormVisible()">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				searchInput: '',
				tableData: [],
				query: '',
				pagenum: 1,
				pagesize: 4,
				total: -1,
				dialogVisible: false,
				form: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				formLabelWidth: "100px",
				editUsersDialog: false,
				roleRialog: false,
				roleusername: '',
				roleNameArr: [],
				getroleId: '',
				defaultValue: -1,
				currRoleId: -1,
				usersId: -1
			}
		},
		created() {
			this.getTableData()
		},
		methods: {
			//获取表格数据
			async getTableData() {
				this.$http.defaults.headers.common['Authorization'] = localStorage.getItem("token");
				const res = await this.$http.get(
					`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
				// console.log(res)
				const {
					data: {
						total,
						users
					},
					meta: {
						mas,
						status
					}
				} = res.data
				this.tableData = users
				this.total = total
				// console.log(this.total)
				// console.log(this.tableData)
			},
			// 分页方法
			handleSizeChange(val) {
				this.pagenum = 1
				// console.log(`每页 ${val} 条`);
				this.pagesize = val
				this.getTableData()
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pagenum = val
				this.getTableData()
			},
			// 搜索用户名
			searchUsers() {
				this.getTableData()
			},
			// 清空搜索输入框
			clearInput() {
				this.getTableData()
			},
			// 添加用户
			addUsers() {
				this.dialogVisible = true
			},
			async commiAddUsers() {
				if (this.form.username == '' || this.form.password == '') {
					this.$message.error('请输入用户名密码')
					return
				}
				// } else {
				const res = await this.$http.post('users', this.form)
				// console.log(res)
				const {
					data,
					meta: {
						msg,
						status
					}
				} = res.data
				if (status == 201) {
					this.getTableData()
					this.$message.success(msg)
				}
				this.dialogVisible = false
				this.form = {}
				// }
			},
			closeDialog() {
				this.dialogVisible = false
			},
			// 删除用户
			deleteUsers(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const res = await this.$http.delete(`users/${id}`)
					this.$message.success(res.data.meta.msg)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 编辑用户
			async editUsers(id) {
				this.editUsersDialog = true
				const res = await this.$http.get(`users/${id}`)
				// console.log(res.data)
				const {
					data,
					meta: {
						msg,
						status
					}
				} = res.data
				if (status == 200) {
					this.form = data
				}
			},
			closeEditDialog() {
				this.editUsersDialog = false
			},
			async editUsersSure() {
				const res = await this.$http.put(`users/${this.form.id}`, this.form)
				// console.log(res.data)
				const {
					data,
					meta: {
						msg,
						status
					}
				} = res.data
				if (status == 200) {
					this.$message.success('编辑成功')
					this.editUsersDialog = false
					this.getTableData()
				}
			},
			// 修改用户状态
			async changeState(user) {
				// console.log(user)
				const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
				const {
					meta: {
						msg,
						status
					}
				} = res.data
				// console.log(res.data)
				if (status == 200) {
					this.$message.success(msg)
				}
			},
			// 分配角色
			async showRole(user) {
				this.roleRialog = true
				this.usersId = user.id
				// 获取角色名
				this.$http.get(`roles`).then((res) => {
					// console.log(res.data)
					this.roleNameArr = res.data.data
				})
				// const res = await this.$http.put(`users/${user.id}`)
				this.roleusername = user.username
				// 根据用户id查询用户
				const res2 = await this.$http.get(`users/${user.id}`)
				// console.log(res2)
				this.currRoleId = res2.data.data.rid
				// this.getroleId = res.data.data.role_id
				// this.$http.get(`roles/${this.getroleId}`).then((res) => {
				// 	// console.log(res)
				// 	const {
				// 		data,
				// 		meta: {
				// 			msg,
				// 			status
				// 		}
				// 	} = res.data
				// 	if (status == 200) {
				// 		// console.log(data.roleId)
				// 		this.defaultValue = data.roleId
				// 		this.currRoleId = data.roleId
				// 	}
				// })

			},
			// 提交角色修改
			async roledialogFormVisible() {
				// console.log(this.currRoleId)
				const res = await this.$http.put(`users/${this.usersId}/role`, {
					rid: this.currRoleId
				})
				console.log(res)
				this.roleRialog = false
				if (res.data.meta.status == 200) {
					this.$message.success(res.data.meta.msg)
				}

			}
		}
	}
</script>

<style>
	.box-card {
		height: 100%;
	}

	.searchUsers {
		margin-top: 20px;
	}
</style>
