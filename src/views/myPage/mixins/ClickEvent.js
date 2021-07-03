import * as d3 from "d3";

export default {
	data() {
		return {
			colorSet: {
				topic: "#FF7100",
				issue: "#B301FA",
				opinion: "#B1E000"
			},
			selectedType: "",
			defaultBgColor: "#c0c0c030",
			defaultLabelColor: "black",
			eflag: true,
			sizeSet: {
				opinionListWidth: 0,
				issueListWidth: 0,
				topicListHeight: 0,
				contentBottomHeight: 0,

				topicIconHeight: 0,
				opinionIconWidth: 0,
				opinionIconHeight: 0,
				opinionIconTop: 0,
			}
		}
	},
	mounted() {
		this.init();
		for (let li of this.lis) {
			d3.select(`#${li}Area`).on("mouseenter", () => {
				d3.select(`#${li}label`).transition().style("color", this.colorSet[li]);
				this.delatedEvent(this.clickEvent, li, 1);
			}).on("mouseleave", () => {
				d3.select(`#${li}label`).transition().style("color", this.defaultLabelColor);
			});
		};

		d3.select("#bgCover").on("mouseenter", () => {
			this.delatedEvent(this.init, "", 1);
		})

	},
	methods: {
		delatedEvent(func, param, repeatedCount) {
			if (repeatedCount == 5) {
				return;
			}
			if (this.eflag) {
				this.eflag = false;
				func(param);
				setTimeout(() => {
					this.eflag = true;
				}, 350);
			} else {
				setTimeout(() => {
					this.delatedEvent(func, param, repeatedCount += 1);
				}, 100);
			}
		},
		init() {
			this.iconColorInit();
			d3.select("#contentTop").transition().duration(300).style("height", "30%");
			d3.select("#contentBottom").transition().duration(300).style("height", "70%");
			d3.select("#issueArea").transition().duration(300).style("width", "50%");
			d3.select("#opinionArea").transition().duration(300).style("width", "50%");
			d3.select("#topicIcon").transition().duration(300).style("height", "100px");
			d3.select("#opinionIcon").transition().duration(300).style("height", "100%").style("width", "90px");
			d3.select("#opinionIcon").transition().duration(300).style("height", "100%").style("width", "90px").style("top", "-20%");

			this.selectedType = "";
		},
		clickEvent(type) {

			this.iconColorInit();

			this.selectedType = type;


			switch (type) {
				case "opinion":
					this.sizeSet.opinionListWidth = "85%";
					this.sizeSet.issueListWidth = "15%";
					this.sizeSet.topicListHeight = "10%";
					this.sizeSet.contentBottomHeight = "90%";

					this.sizeSet.topicIconHeight = "40px";
					this.sizeSet.opinionIconWidth = "50px";
					this.sizeSet.opinionIconHeight = "30%";
					this.sizeSet.opinionIconTop = "0%";
					break;
				case "issue":
					this.sizeSet.opinionListWidth = "15%";
					this.sizeSet.issueListWidth = "85%";
					this.sizeSet.topicListHeight = "10%";
					this.sizeSet.contentBottomHeight = "90%";

					this.sizeSet.topicIconHeight = "40px";
					this.sizeSet.opinionIconWidth = "auto";
					this.sizeSet.opinionIconHeight = "25%";
					this.sizeSet.opinionIconTop = "40px";
					break;
				case "topic":
					this.sizeSet.opinionListWidth = "50%";
					this.sizeSet.issueListWidth = "50%";
					this.sizeSet.topicListHeight = "90%";
					this.sizeSet.contentBottomHeight = "10%";

					this.sizeSet.topicIconHeight = "40px";
					this.sizeSet.opinionIconWidth = "auto";
					this.sizeSet.opinionIconHeight = "100%";
					this.sizeSet.opinionIconTop = "0px";
					break;
			}

			d3.select("#contentTop").transition().duration(300).style("height", this.sizeSet.topicListHeight);
			d3.select("#contentBottom").transition().duration(300).style("height", this.sizeSet.contentBottomHeight);
			d3.select("#topicArea").transition().duration(300).style("background-color", "topic" == type ? this.defaultBgColor : this.colorSet["topic"] + "50");
			d3.select("#issueArea").transition().duration(300).style("width", this.sizeSet.issueListWidth).style("background-color", "issue" == type ? this.defaultBgColor : this.colorSet["issue"] + "50");
			d3.select("#opinionArea").transition().duration(300).style("width", this.sizeSet.opinionListWidth).style("background-color", "opinion" == type ? this.defaultBgColor : this.colorSet["opinion"] + "50");
			d3.select("#topicIcon").transition().duration(300).style("height", this.sizeSet.topicIconHeight);
			d3.select("#opinionIcon").transition().duration(300).style("height", this.sizeSet.opinionIconHeight).style("width", this.sizeSet.opinionIconWidth).style("top", this.sizeSet.opinionIconTop);

		},
		iconColorInit() {
			for (let li of this.lis) {

				d3.select(`#${li}label`).style("color", this.defaultLabelColor);

				if (li == "topic") {
					d3.selectAll(".home" + li).attr("fill", this.colorSet[li]);
				} else if (li == "opinion") {
					d3.selectAll(".home" + li).attr("stroke", this.colorSet[li]);
				} else {
					d3.select(".home" + li).style("background-color", this.colorSet[li]);
				}

				d3.select(`#${li}Area`).style("background-color", this.defaultBgColor);

			}
		}
	}

}