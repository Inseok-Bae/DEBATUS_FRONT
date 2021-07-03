import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
	{
		path: "/home",
		name: "home",
		component: () => import(/* webpackChunkName: "home" */ "../views/home/Main")
	},
	{
		path: "/search",
		name: "search",
		meta: {
			transitionName: "slide-left"
		},
		component: () =>
			import(/* webpackChunkName: "search" */ "../views/search/Main")
	},
	{
		path: "/myPage",
		name: "myPage",
		meta: {
			transitionName: "slide-right"
		},
		component: () =>
			import(/* webpackChunkName: "search" */ "../views/myPage/Main")
	},
	{
		path: "/write",
		name: "write",
		meta: {
			transitionName: "slide-left"
		},
		component: () =>
			import(/* webpackChunkName: "write" */ "../views/write/Main")
	},
	{
		path: "/topic",
		name: "topic",
		meta: {
			transitionName: "slide-down"
		},
		component: () =>
			import(/* webpackChunkName: "topic" */ "../views/topic/Main")
	},
	{
		path: "/issue",
		name: "issue",
		meta: {
			transitionName: "slide-left"
		},
		component: () =>
			import(/* webpackChunkName: "issue" */ "../views/issue/Main")
	},
	{
		path: "/opinion",
		name: "opinion",
		meta: {
			transitionName: "slide-right"
		},
		component: () =>
			import(/* webpackChunkName: "opinion" */ "../views/opinion/Main")
	},
	{
		path: "/material",
		name: "material",
		meta: {
			transitionName: "slide-down"
		},
		component: () =>
			import(/* webpackChunkName: "material" */ "../views/material/Main")
	},
	{
		path: "/signIn",
		name: "signIn",
		meta: {
			transitionName: "slide-right"
		},
		component: () =>
			import(/* webpackChunkName: "opinion" */ "../views/signIn/Main")
	},
	{
		path: "/login",
		name: "login",
		meta: {
			transitionName: "slide-right"
		},
		component: () =>
			import(/* webpackChunkName: "opinion" */ "../views/login/Main")
	},
	{
		path: "/info",
		name: "info",
		meta: {
			transitionName: "slide-left"
		},
		component: () =>
			import(/* webpackChunkName: "opinion" */ "../views/info/Main")
	},
	{
		path: "/mobile",
		name: "mobile",
		component: () =>
			import(/* webpackChunkName: "opinion" */ "../views/Mobile.vue")
	},
	{
		path: "*",
		name: "exception",
		redirect: { name: "home" }
	}
];

const router = new VueRouter({
	mode: "history",
	routes
});

router.beforeEach((to, from, next) => {
	let transitionName = "";

	if (to.name == "home") {
		switch (from.name) {
			case "opinion":
				transitionName = "slide-left";
				break;
			case "issue":
				transitionName = "slide-right";
				break;
			case "topic":
				transitionName = "slide-down";
				break;
			default:
				transitionName = "slide-up";
		}
	} else {
		if (to.name === "issue" && from.name === "topic") {
			transitionName = "slide-up";
		} else {
			transitionName = to.matched[0].meta.transitionName;
		}
	}

	store.commit("setRouterTransition", transitionName);

	next();
});

export default router;
