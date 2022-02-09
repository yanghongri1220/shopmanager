<template>
	<div class="wrap">
		<el-form class="form" label-position="top" label-width="80px" :model="formdata">
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formdata.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="formdata.password"></el-input>
			</el-form-item>
			<el-button @click="handleLogin()" type="primary" class="btn">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formdata: {
					username: "admin",
					password: "123456"
				}
			}
		},
		mounted() {},
		methods: {
			handleLogin() {
				this.$http.post('login', this.formdata).then((res) => {
					// console.log(res)
					const {
						data,
						meta: {
							msg,
							status
						}
					} = res.data
					if (status == 200) {
						localStorage.setItem("token", data.token)
						this.$message.success(msg)
						this.$router.push({
							name: 'home'
						})
					}
				})
			}
		}
	}
</script>

<style>
	.wrap {
		height: 100%;
		background-color: #42B983;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form {
		width: 40%;
		height: 400px;
		padding: 20px;
		background-color: #D3DCE6;
	}

	.btn {
		width: 100%;
	}
</style>
