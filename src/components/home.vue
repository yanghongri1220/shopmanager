<template>
	<div class="content">
		<el-container>
			<el-header>
				<el-row class="headClass" type="flex" align="middle">
					<el-col :span="4">
						<img src="../assets/logo.png" alt="">
					</el-col>
					<el-col :span="18" class="title">
						<h2>电商后台管理系统</h2>
					</el-col>
					<el-col :span="2" class="exit">
						<a href="#" @click.prevent="comeLogin()">退出</a>
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu default-active="2" unique-opened class="el-menu-vertical-demo" active-text-color="#00aaff">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>用户管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1"><i class="el-icon-s-grid"></i>用户列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>权限管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="2-1"><i class="el-icon-s-grid"></i>角色列表</el-menu-item>
								<el-menu-item index="2-2"><i class="el-icon-s-grid"></i>权限列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>商品管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="3-1"><i class="el-icon-s-grid"></i>商品列表</el-menu-item>
								<el-menu-item index="3-2"><i class="el-icon-s-grid"></i>分类参数</el-menu-item>
								<el-menu-item index="3-3"><i class="el-icon-s-grid"></i>商品分类</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="4">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>订单管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="4-1"><i class="el-icon-s-grid"></i>订单列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="5">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>数据统计</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="5-1"><i class="el-icon-s-grid"></i>数据报表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		beforeCreate() {
			if (!localStorage.getItem("token")) {
				this.$router.push({
					path: '/login'
				})
			}
		},
		methods: {
			comeLogin() {
				this.$router.push({
					path: '/login'
				})
				localStorage.clear()
				this.$message.success('退出登陆')
			},

		}
	}
</script>

<style>
	.content {
		height: 100%;
	}

	.el-header {
		padding: 0;
		height: auto !important;
	}

	.headClass {
		width: 100%;
		background-color: #B4BCCC;
	}

	.title {
		text-align: center;
	}

	.exit a {
		text-decoration: none;
	}
</style>
