import httpService from "../../../service/httpService";

export default {
	methods: {
		async getDataSource(id) {
			try {
				this.dataSource = await httpService.get("/api/topic/byId", {
					id: id
				});

				if (this.dataSource.text !== null) {
					this.textList = this.dataSource.text.split("\\n");
				}
				if (this.dataSource.answeredText !== null) {
					this.answeredTextList = this.dataSource.answeredText.split("\\n");
				}

				let issueModels = await httpService.get("/api/issue/byTopicId", {
					id: id
				});

				for (let issueModel of issueModels) {
					issueModel.issue.centeredFlag = issueModel.centeredFlag;
					issueModel.issue.history = issueModel.hotOpinions;
					this.issues.push(issueModel.issue);
				}

				if (this.dataSource.answeredFlag) {
					this.feedbackIssue = await httpService.get(
						"/api/issue/getTopicFeedBackIssue",
						{
							topicId: id
						}
					);

					let feedbackDatas = await httpService.get("/api/data", {
						issueId: this.feedbackIssue.issueId
					});

					for (let opinion of feedbackDatas.opinions) {
						if (Number(dataSource.stand[opinion.opinionId])) {
							this.prosOpinions.push(opinion);
						} else {
							this.consOpinions.push(opinion);
						}
					}
				}

				let modifyDataIssues = [];

				for (let issue of this.issues) {
					modifyDataIssues.push({
						id: issue.issueId,
						title: issue.title,
						centered: issue.centeredFlag
					});
				}

				this.$store.commit("setWriter", this.dataSource.writer);
				this.$store.commit("setTopicAnswered", this.dataSource.answeredFlag);

				if (!this.$store.state.writingState) {
					this.$store.commit("setTopicModifyData", {
						source: this.dataSource,
						issues: modifyDataIssues
					});
				}
			} catch (err) {
				console.log(err);
				this.$store.commit("setTopicScreenShow", false);
				this.$bvModal
					.msgBoxOk(
						"알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
						{
							title: "Error",
							size: "mg",
							buttonSize: "mg",
							headerBgVariant: "danger",
							okVariant: "light",
							bodyClass: "longModalContent",
							titleClass: "textWhite",
							centered: true
						}
					)
					.then(val => {
						this.$router.push({ name: "home" });
						return;
					});
			}
		}
	}
};
