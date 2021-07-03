export default {
	methods: {
		setOpinionData() {
			this.content = {
				title: this.$store.state.opinionModifyData.source.title,
				text: this.$store.state.opinionModifyData.source.text,
			};

			this.$refs.writeContent.setContent(this.content);

			let materials = [];

			for (let material of this.$store.state.opinionModifyData.materials) {
				materials.push({
					id: material.materialId,
					title: material.title,
				});
			}

			let opinions = [];
			for (let opinion of this.$store.state.opinionModifyData.opinions) {
				opinions.push({
					id: opinion.opinionId,
					title: opinion.title
				})
			}

			this.$refs.searchArea.setNodes({
				issues: this.$store.state.opinionModifyData.issues,
				opinions: opinions,
				materials: materials,
			});

			this.relatedIssues = this.$store.state.opinionModifyData.issues;
			this.relatedOpinions = opinions;
			this.relatedMaterials = materials;
		},
		setTopicData() {
			let mainIssueData = {};

			if (this.$route.query.mode == "topic" || this.$route.query.mode == "material") {
				mainIssueData = JSON.parse(this.$route.query.mainIssueData);
			} else if (this.$route.query.mode == "topicReturn") {
				mainIssueData = this.$store.state.topicModifyData.mainIssueData;
				this.content.title = this.$store.state.topicModifyData.source.title;
				this.content.text = this.$store.state.topicModifyData.source.text;
				this.relatedIssues = this.$store.state.topicModifyData.issues;
				this.$refs.writeContent.setContent(this.content);
				this.$refs.searchArea.setNodes({
					issues: this.relatedIssues,
				});
			}
			else if (this.$route.query.mode == "modifyTopic") {
				let modifyData = this.$store.state.topicModifyData;

				let relatedIssues = [];
				for (let issue of modifyData.issues) {
					if (issue.centered) {
						mainIssueData = issue;
					} else {
						relatedIssues.push(issue);
					}
				}

				this.content.title = modifyData.source.title;
				this.content.text = modifyData.source.text;

				this.$refs.writeContent.setContent(this.content);
				this.relatedIssues = relatedIssues;
				this.$refs.searchArea.setNodes({
					issues: this.relatedIssues,
				});
			}

			this.mainIssueTitle = mainIssueData.title;
			this.mainIssueId = mainIssueData.id;
		},
		setRelatedOpinions(data) {
			this.relatedOpinions = JSON.parse(data);
			this.$refs.searchArea.setNodes({
				opinions: this.relatedOpinions,
				issues: [],
				materials: [],
			});
		},
		setRelatedIssues(data) {

			this.relatedIssues = JSON.parse(data);
			this.$refs.searchArea.setNodes({
				opinions: [],
				issues: this.relatedIssues,
				materials: [],
			});
		}
	}
}