export default {
	userId: {
		name: "User ID",
		type: "text",
		limit: "6자 이상, 20자 이하로 입력해주세요.",
		placeHolder: "6자 이상, 20자 이하",
		lowNum: 6,
		highNum: 20,
		tooltipShow: false,
		value: ""
	},
	password: {
		name: "Password",
		type: "password",
		limit: "8자 이상, 20자 이하로 입력해주세요.",
		placeHolder: "8자 이상, 20자 이하",
		lowNum: 8,
		highNum: 20,
		tooltipShow: false,
		value: ""
	},
	confirmPassword: {
		name: "Confirm Password",
		type: "password",
		limit: "패스워드가 일치하지 않아요.",
		tooltipShow: false,
		value: ""
	},
	name: {
		name: "Name",
		type: "text",
		tooltipShow: false,
		limit: "20자 이하, 올바른 이름을 입력해주세요.",
		lowNum: 2,
		highNum: 20,
		value: ""
	},
	major: {
		name: "Major",
		type: "text",
		tooltipShow: false,
		limit: "20자 이하, 올바른 전공을 입력해주세요.",
		lowNum: 3,
		highNum: 20,
		value: ""
	},
	studentId: {
		name: "Student ID",
		type: "text",
		tooltipShow: false,
		limit: "올바른 학번을 입력해주세요.",
		lowNum: 5,
		highNum: 12,
		value: ""
	},
	email: {
		name: "Email",
		type: "email",
		limit: "이메일 형식에 맞게 입력해주세요. ex) debatus@debatus.com",
		placeHolder: "ex) debatus@debatus.com",
		tooltipShow: false,
		value: ""
	}
};
