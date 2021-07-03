import httpService from "../../../service/httpService";

export default {
	methods: {
		async publish() {
			let errorModal = msg => {
				this.$bvModal.msgBoxOk(msg, {
					title: "Error",
					size: "mg",
					buttonSize: "mg",
					headerBgVariant: "danger",
					okVariant: "light",
					bodyClass: "longModalContent",
					titleClass: "textWhite",
					centered: true
				});
			};

			if (this.content.title.length > 100) {
				errorModal("제목을 100자 이하로 입력해주세요.");
				return;
			}

			if (this.content.title.length === 0) {
				errorModal("제목을 입력해주세요.");
				return;
			}

			if (this.content.text.length === 0) {
				errorModal("내용을 입력해주세요.");
				return;
			}

			if (
				this.mode == "topic" ||
				this.mode == "modifyTopic" ||
				this.mode == "topicReturn"
			) {
				this.publishTopic(errorModal);
			} else if (this.mode == "material") {
				this.publishMaterial(errorModal);
			} else if (this.mode == "answer") {
				this.answer(errorModal);
			} else {
				if (this.relatedIssues.length == 0) {
					errorModal("최소 1개 이상의 Issue를 추가해주세요.");
					return;
				}

				let loader = this.$loading.show({
					container: null,
					canCancel: false
				});

				let materialIds = [];
				let issues = [];
				let opinionIds = [];

				for (let material of this.relatedMaterials) {
					materialIds.push(Number(material.id));
				}

				for (let issue of this.relatedIssues) {
					if (issue.id == "NY") {
						let realId = await httpService.post("/api/required/issue", {
							title: issue.title,
							consCount: 0,
							prosCount: 0
						});
						issue.id = realId;
					}

					issues.push({ issueId: Number(issue.id), stand: issue.stand });
				}

				for (let opinion of this.relatedOpinions) {
					opinionIds.push(Number(opinion.id));
				}

				let param = {
					opinion: {
						title: this.content.title,
						text: this.content.text,
						materialIds: JSON.stringify(materialIds),
						recommendCount: 0
					},
					relatedOpinionIds: opinionIds,
					relatedIssues: issues
				};

				if (this.mode == "modify") {
					param.opinion.opinionId = this.$store.state.opinionModifyData.source.opinionId;
				}

				try {
					let savedOninionId = undefined;

					if (this.mode == "modify") {
						savedOninionId = await httpService.patch(
							"/api/required/opinion",
							param
						);
					} else {
						savedOninionId = await httpService.post(
							"/api/required/opinion",
							param
						);
					}

					if (savedOninionId !== undefined) {
						setTimeout(() => {
							loader.hide();
							this.published = true;
							this.$router.push({
								name: "opinion",
								query: { id: savedOninionId }
							});
						}, 1000);
					} else {
						loader.hide();
						errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
					}
				} catch (err) {
					loader.hide();
					errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
				}
			}
		},
		async publishTopic(errorModal) {
			let loader = this.$loading.show({
				container: null,
				canCancel: false
			});

			let relatedIssues = [];

			relatedIssues.push({
				issueId: this.mainIssueId,
				centeredFlag: 1
			});

			for (let issue of this.relatedIssues) {
				relatedIssues.push({
					issueId: issue.id,
					centeredFlag: 0
				});
			}

			let topicData = {
				title: this.content.title,
				text: this.content.text
			};

			if (this.mode == "modifyTopic") {
				topicData.topicId = this.$store.state.topicModifyData.source.topicId;
			}

			try {
				let savedTopicId = undefined;

				if (this.mode == "modifyTopic") {
					savedTopicId = await httpService.patch("/api/required/topic", {
						topic: topicData,
						relatedIssues: relatedIssues
					});
				} else {
					savedTopicId = await httpService.post("/api/required/topic", {
						topic: topicData,
						relatedIssues: relatedIssues
					});
				}

				if (savedTopicId !== undefined) {
					setTimeout(() => {
						loader.hide();
						this.published = true;
						this.$router.push({ name: "topic", query: { id: savedTopicId } });
					}, 1000);
				} else {
					loader.hide();
					errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
				}
			} catch {
				loader.hide();
				errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
			}
		},
		async answer(errorModal) {
			let loader = this.$loading.show({
				container: null,
				canCancel: false
			});

			if (this.content.title.length > 100) {
				errorModal("제목을 100자 이하로 입력해주세요.");
				return;
			}

			try {
				let answeredTopicId = await httpService.post(
					"/api/required/topic/answer",
					{
						topicId: this.$route.query.id,
						title: this.content.title,
						text: this.content.text
					}
				);

				setTimeout(() => {
					loader.hide();
					this.published = true;
					this.$router.push({ name: "topic", query: { id: answeredTopicId } });
				}, 1000);
			} catch (err) {
				errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
				loader.hide();
				return;
			}
		},
		async publishMaterial(errorModal) {
			let loader = this.$loading.show({
				container: null,
				canCancel: false
			});

			if (this.content.title.length > 100) {
				errorModal("제목을 100자 이하로 입력해주세요.");
				return;
			}

			try {
				let materialId = await httpService.post("/api/required/material", {
					material: {
						title: this.content.title,
						text: this.content.text
					},
					issueId: this.mainIssueId
				});
				setTimeout(() => {
					loader.hide();
					this.published = true;
					this.$router.push({
						name: "material",
						query: { id: materialId }
					});
				}, 1000);
			} catch (err) {
				errorModal("오류 발생! 잠시 후 다시 시도해주세요.");
				return;
			}
		}
	}
};
