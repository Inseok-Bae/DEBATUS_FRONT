import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState()
	],
	state: {
		initialFlag: true,
		homeScreenShow: false,
		opinionScreenShow: false,
		issueScreenShow: false,
		topicScreenShow: false,
		loginFlag: false,
		userId: "not1",
		writer: "not2",
		opinionModifyData: {
			source: {},
			opinions: [],
			issues: [],
			materials: []
		},
		topicModifyData: {
			source: {},
			issues: []
		},
		currentIssueTitle: "",
		topicAnswered: false,
		writingState: false,
		writingStateMode: "",
		mainImageShow: true,
		routerTransition: "",
		windowSize: 0,
		windowScroll: 0,
		landingFlag: true,
	},
	mutations: {
		setInitialFlag(state) {
			state.initialFlag = false;
		},
		setHomeScreenShow(state, payload) {
			state.homeScreenShow = payload;
		},
		setOpinionScreenShow(state, payload) {
			state.opinionScreenShow = payload;
		},
		setIssueScreenShow(state, payload) {
			state.issueScreenShow = payload;
		},
		setTopicScreenShow(state, payload) {
			state.topicScreenShow = payload;
		},
		setLoginFlag(state, payload) {
			state.loginFlag = payload;
		},
		setUserId(state, payload) {
			state.userId = payload;
		},
		setWriter(state, payload) {
			state.writer = payload;
		},
		setOpinionModifyData(state, payload) {
			state.opinionModifyData = payload;
		},
		setTopicModifyData(state, payload) {
			state.topicModifyData = payload;
		},
		setWritingState(state, payload) {
			state.writingState = payload;
		},
		setWritingStateMode(state, payload) {
			state.writingStateMode = payload;
		},
		setTopicAnswered(state, payload) {
			state.topicAnswered = payload;
		},
		setMainImageShow(state, payload) {
			state.mainImageShow = payload;
		},
		setRouterTransition(state, payload) {
			state.routerTransition = payload;
		},
		setCurrentIssueTitle(state, payload) {
			state.currentIssueTitle = payload;
		},
		setWindowSize(state, payload) {
			state.windowSize = payload;
		},
		setWindowScroll(state, payload) {
			state.windowScroll = payload;
		}
	},
	actions: {},
	modules: {}
});
