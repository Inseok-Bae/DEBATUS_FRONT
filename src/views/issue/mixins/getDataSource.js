import httpService from "../../../service/httpService";

export default {
	data() {
		return {
			issueDataSource: {},
			topicDataSource: [],
			noTopic: false,
			consOpinions: [],
			prosOpinions: [],
			consRecommend: 0,
			prosRecommend: 0,
			materialDataSource: []
		};
	},
	methods: {
		async getDataSource() {
			this.$store.commit("setIssueScreenShow", true);

			this.issueDataSource = {};
			this.consOpinions = [];
			this.prosOpinions = [];

			let dataSource = {};

			try {
				dataSource = await httpService.get("/api/data", {
					issueId: this.$route.query.id
				});
				this.$store.commit("setWriter", dataSource.writer);
			} catch (err) {
				this.$store.commit("setIssueScreenShow", false);
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

			this.issueDataSource = dataSource.issue;

			let consRecommendSum = 0,
				prosRecommendSum = 0;

			for (let opinion of dataSource.opinions) {
				if (Number(dataSource.stand[opinion.opinionId])) {
					this.prosOpinions.push(opinion);
					prosRecommendSum += opinion.recommendCount;
				} else {
					this.consOpinions.push(opinion);
					consRecommendSum += opinion.recommendCount;
				}
			}

			this.consRecommend = parseInt(
				this.consOpinions.length == 0
					? 0
					: consRecommendSum / this.consOpinions.length
			);
			this.prosRecommend = parseInt(
				this.prosOpinions.length == 0
					? 0
					: prosRecommendSum / this.prosOpinions.length
			);

			console.log(encodeURI(this.issueDataSource.materialIds));

			if (this.issueDataSource.materialIds !== null) {
				try {
					this.materialDataSource = await httpService.get("/api/material", {
						ids: encodeURI(this.issueDataSource.materialIds)
					});
				} catch (err) {
					this.$bvModal.msgBoxOk("오류 발생! 잠시 후 다시 시도해주세요.", {
						title: "Inform",
						size: "mg",
						buttonSize: "mg",
						headerBgVariant: "warning",
						okVariant: "warning",
						bodyClass: "longModalContent",
						titleClass: "textWhite",
						centered: true
					});
				}
			}

			this.topicDataSource = await httpService.get("/api/topic/byIssueId", {
				id: this.$route.query.id
			});
			if (this.topicDataSource.length === 0) {
				this.noTopic = true;
			}
			this.$store.commit("setCurrentIssueTitle", this.issueDataSource.title);

			setTimeout(() => {
				this.$store.commit("setIssueScreenShow", false);
			}, 300);
		}
	}
};
