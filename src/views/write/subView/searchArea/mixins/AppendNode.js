export default {
	methods: {
		appendNode(e) {
			let sources = {
				issue: this.relatedIssues,
				opinion: this.relatedOpinions,
				material: this.relatedMaterials
			};

			if (sources[e.type].length > 10) {
				this.$toast.add({
					severity: "warn",
					summary: `Related ${e.type}는 10개를 초과할 수 없어요.`,
					life: 1500,
					closable: false
				});
			} else {
				if (this.mainIssueId == e.id) {
					this.$toast.add({
						severity: "warn",
						summary: `이미 메인 이슈로 추가되었어요.`,
						life: 1500,
						closable: false
					});
					return;
				}

				let alreadyInFlag = false;

				for (let item of sources[e.type]) {
					if (e.id == item.id) {
						alreadyInFlag = true;
						break;
					}
				}

				if (alreadyInFlag) {
					this.$toast.add({
						severity: "warn",
						summary: `해당 ${e.type}는 이미 추가되었어요.`,
						life: 1500,
						closable: false
					});
				} else {
					sources[e.type].push(e);

					let target = "update:";

					switch (e.type) {
						case "issue":
							target += "relatedIssues";
							break;
						case "opinion":
							target += "relatedOpinions";
							break;
						case "material":
							target += "relatedMaterials";
							break;
					}

					this.$emit(target, sources[e.type]);

					this.$toast.add({
						severity: "success",
						summary: `${e.type}  추가되었어요.`,
						life: 1500,
						closable: false
					});
				}
			}
		}
	}
};
