export default {
	computed: {
		maxRecommend() {
			if (this.relatedOpinions[0] !== undefined) {
				let result = Number(this.dataSource.recommendCount);

				for (let item of this.relatedOpinions) {
					if (Number(item.recommendCount) > result) {
						result = Number(item.recommendCount);
					}
				}

				if (this.nodeRecommend > result) {
					result = this.nodeRecommend;
				}

				return result;
			} else {
				return null;
			}
		},
		minRecommend() {
			if (this.relatedOpinions[0] !== undefined) {
				let result = Number(this.dataSource.recommendCount);

				for (let item of this.relatedOpinions) {
					if (Number(item.recommendCount) < result) {
						result = Number(item.recommendCount);
					}
				}

				if (this.nodeRecommend < result) {
					result = this.nodeRecommend;
				}

				return result;
			} else {
				return null;
			}
		},
	}
}