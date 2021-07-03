export default {
	methods: {
		addIssue() {
			let errorModal = msg => {
				this.$bvModal.msgBoxOk(msg, {
					title: "Inform",
					size: "mg",
					buttonSize: "mg",
					headerBgVariant: "warning",
					okVariant: "warning",
					bodyClass: "longModalContent",
					titleClass: "textWhite",
					centered: true
				});
			};

			this.$bvModal
				.msgBoxConfirm(`Issue "${this.searchInput}"를 등록하시겠습니까?`, {
					title: "Register",
					size: "lg",
					buttonSize: "mg",
					headerBgVariant: "success",
					okVariant: "success",
					cancelVariant: "danger",
					bodyClass: "longModalContent",
					titleClass: "textWhite",
					centered: true
				})
				.then(value => {
					if (value) {
						if (this.searchInput.length > 100) {
							errorModal("제목을 100자 이하로 입력해주세요.");
							return;
						}

						for (let issue of this.relatedIssues) {
							if (issue.id == "NY") {
								errorModal("Issue는 Opinion 당 하나만 등록할 수 있어요.");
								return;
							}
						}

						this.dataSource = [
							{
								issueId: "NY",
								title: this.searchInput
							}
						];
					}
				});
		}
	}
};
