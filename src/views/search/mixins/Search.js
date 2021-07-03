import httpService from "../../../service/httpService";

export default {
	data() {
		return {
			searchInputData: "",
			searchedFlag: false,
			searched: false
		}
	},
	methods: {
		searchInputEvent(e) {
			if (e.code == "Enter") {
				this.search();
			}
		},
		async search() {

			if (this.searchInputData == "") {
				return;
			}

			let loader = this.$loading.show({
				container: null,
				canCancel: false,
			});

			try {
				this.opinionDataSource = await this.searchInDB("opinion", {
					title: this.searchInputData,
					text: this.searchInputData
				});
				this.issueDataSource = await this.searchInDB("issue", {
					title: this.searchInputData
				});
				this.topicDataSource = await this.searchInDB("topic", {
					title: this.searchInputData,
					text: this.searchInputData
				});
			} catch (err) {
				console.log(err);
			}

			loader.hide();

		},
		async searchInDB(type, data) {

			let temp = {};

			try {
				temp = await httpService.get(`/api/${type}/byContent`, data);
			} catch (err) {
				this.$bvModal.msgBoxOk("오류 발생! 잠시 후 다시 시도해주세요.", {
					title: "Error",
					size: "mg",
					buttonSize: "mg",
					headerBgVariant: "danger",
					okVariant: "light",
					bodyClass: "longModalContent",
					titleClass: "textWhite",
					centered: true,
				});
				return;
			}
			return temp;
		},
	},
}