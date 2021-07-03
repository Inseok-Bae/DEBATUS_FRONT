import httpService from "../../../service/httpService";

export default {
	data() {
		return {
			lis: ["opinion", "issue", "topic"],
			dataLoaded: false,
			topicDataSource: [],
			issueDataSource: [],
			opinionDataSource: [],
			_topicDataSource: [],
			_issueDataSource: [],
			_opinionDataSource: [],
			totalPages: {},
			pages: {},
		}
	},
	async created() {
		this.errorModal = (msg) => {
			this.$bvModal.msgBoxOk(msg, {
				title: "Inform",
				size: "mg",
				buttonSize: "mg",
				headerBgVariant: "warning",
				okVariant: "warning",
				bodyClass: "longModalContent",
				titleClass: "textWhite",
				centered: true,
			});
		};

		this.dataLoaded = true;

		await this.getUserDataSources();

	},
	methods: {
		async getUserDataSources() {

			try {
				for (let li of this.lis) {
					let source = await httpService.get(`/api/required/${li}/byUserId`);
					switch (li) {
						case "opinion":
							this.opinionDataSource = source;
							break;
						case "issue":
							this.issueDataSource = source;
							break;
						case "topic":
							this.topicDataSource = source;
							break;
					}
				}
			} catch (err) {
				this.errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
			}

		}
	},
}