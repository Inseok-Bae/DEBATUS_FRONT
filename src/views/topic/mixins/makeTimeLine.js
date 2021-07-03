import * as d3 from "d3";

export default {
	data() {
		return {
			history: [],
			timelineContent: {},
		}
	},
	mounted() {
		d3.select("#timeLineTooltip").style("opacity", 0);
	},
	methods: {
		makeHistoryData() {

			let opinions = [];

			for (let issue of this.issues) {

				let issuewrittenDate = /(.*)T/.exec(issue.writtenDate)[1];

				this.history.push({ type: "issueWrited", date: issuewrittenDate, id: issue.issueId, title: issue.title, dateNum: Number(issuewrittenDate.replaceAll("-", "")), y: 70 });

				for (let his of issue.history) {
					let alreadyInFlag = false;

					for (let opinion of opinions) {
						if (opinion.opinionId == his.opinionId) {
							alreadyInFlag = true;
							break;
						}
					}

					if (!alreadyInFlag) {
						opinions.push(his);
					}
				}
			}

			for (let opinion of opinions) {
				opinion.writtenDate = /(.*)T/.exec(opinion.writtenDate)[1];
				let temp = { type: "opinionWrited", date: opinion.writtenDate, id: opinion.opinionId, title: opinion.title, dateNum: Number(opinion.writtenDate.replaceAll("-", "")), y: 100 };
				this.history.push(temp);
			}

			let topicwrittenDate = /(.*)T/.exec(this.dataSource.writtenDate)[1];

			this.history.push({ type: "topicWrited", date: topicwrittenDate, dateNum: Number(topicwrittenDate.replaceAll("-", "")), y: 40 });

			if (this.dataSource.answeredFlag !== undefined) {
				if (this.dataSource.answeredFlag) {
					let topicAnsweredDate = /(.*)T/.exec(this.dataSource.answeredDate)[1];
					this.history.push({ type: "answered", date: topicAnsweredDate, dateNum: Number(topicAnsweredDate.replaceAll("-", "")), y: 40 });
				}
			}

			this.history.sort((h1, h2) => { return h1.dateNum - h2.dateNum });

			let interval = 0;

			for (let i = 0; i < this.history.length - 1; i++) {
				interval += this.history[i + 1].dateNum - this.history[i].dateNum;
			}

			this.history[0].x = 100;

			for (let i = 1; i < this.history.length; i++) {
				this.history[i].x = this.history[i - 1].x + 100 + (this.history[i].dateNum - this.history[i - 1].dateNum) / interval * 300;
			}

			d3.select("#timelineSVG").style("width", this.history[this.history.length - 1].x + this.history[0].x + 100 + "px");
		},
		makeHistoryLine() {

			d3.select(".timelineContent").remove();

			this.timelineContent = d3.select("#timelineSVG").append("g").attr("class", "timelineContent");

			this.timelineContent.selectAll("line")
				.data(this.history)
				.enter()
				.append("line")
				.attr("x1", (d, i) => {
					if (i > 0) {
						return this.history[i - 1].x;
					} else {
						return d.x;
					}
				}).attr("y1", (d, i) => {
					if (i > 0) {
						return this.history[i - 1].y;
					} else {
						return d.y;
					}
				}).attr("x2", (d) => d.x).attr("y2", (d) => d.y)
				.style("stroke", "silver")
				.style("stroke-width", "1");
		},
		makeHistoryDots() {
			this.timelineContent.selectAll("circle")
				.data(this.history)
				.enter()
				.append("circle")
				.attr("class", "historyDots")
				.attr("opacity", 1)
				.attr("id", (d) => "dot" + d.dateNum + d.type + d.id)
				.attr("cx", (d) => d.x)
				.attr("cy", (d) => d.y)
				.attr("r", "5")
				.attr("fill", (d) => {
					switch (d.type) {
						case "opinionWrited":
							return "#B1E000";
							break;
						case "topicWrited":
							return "#FF7100";
							break;
						case "issueWrited":
							return "#B301FA";
							break;
						case "answered":
							return "red";
							break;
					}
				});

			this.timelineContent.selectAll("rect")
				.data(this.history)
				.enter()
				.append("rect")
				.attr("x", (d) => d.x - 20)
				.attr("y", (d) => d.y - 20)
				.attr("width", 40)
				.attr("height", 40)
				.attr("fill", "white")
				.attr("opacity", 0)
				.each((d, i, g) => {
					let rect = d3.select(g[i]).on("mouseover", (e) => {

						d3.selectAll(".historyDots").transition().attr("opacity", 0.1);
						d3.select('#dot' + d.dateNum + d.type + d.id).transition().attr("opacity", 1);
						rect.style("cursor", "pointer");

						if (d.type == "opinionWrited" || d.type == "issueWrited") {
							d3.select("#timeLineTooltip").transition().duration(200).style("opacity", .9);
							d3.select("#timeLineTooltip").html(d.title).style("left", (e.pageX + 20) + "px").style("top", e.pageY + "px");

						}
					});
					d3.select(g[i]).on("mouseout", () => {
						d3.selectAll(".historyDots").transition().attr("opacity", 1);
						rect.style("cursor", "default");
						d3.select("#timeLineTooltip").transition().duration(200).style("opacity", 0);
					});
					d3.select(g[i]).on("click", () => {
						switch (d.type) {
							case "opinionWrited":
								this.$router.push({ name: "opinion", query: { id: d.id } });
								break;
							case "issueWrited":
								this.$router.push({ name: "issue", query: { id: d.id } });
								break;
						}
					})
				});


		},
		makeHistoryAxis() {
			let axis = this.timelineContent.append("g")
				.attr("class", "axis");

			axis.selectAll("text")
				.data(this.history)
				.enter()
				.append("text")
				.attr("x", (d) => d.x)
				.attr("y", 170)
				.attr("font-size", "12")
				.attr("text-anchor", "middle")
				.attr("fill", "grey")
				.text((d) => d.date);

			axis.append("line")
				.attr("x1", this.history[0].x - 50)
				.attr("x2", this.history[this.history.length - 1].x + 50)
				.attr("y1", 140)
				.attr("y2", 140)
				.attr("stroke", "grey")
				.attr("stroke-width", 0.5);

			axis.append("g")
				.selectAll("line")
				.data(this.history)
				.enter()
				.append("line")
				.attr("x1", (d) => d.x)
				.attr("x2", (d) => d.x)
				.attr("y1", 140)
				.attr("y2", 147)
				.attr("stroke", "grey")
				.attr("stroke-width", 0.5);

		},
		makeRealHistoryAxis() {
			let scale = d3.scaleTime()
				.domain([new Date(this.history[0].date), new Date(this.history[this.history.length - 1].date)])
				.range([this.history[0].x - 40, this.history[this.history.length - 1].x]);

			let xAxis = d3.axisBottom().scale(scale).tickFormat(d3.timeFormat('20%y년 %m월 %d일'));

			this.timelineContent.append("g").attr("class", "axis").attr("transform", "translate(20, 150)").call(xAxis);
		},
		makeHistoryText() {

			for (let h of this.history) {
				if (h.type == "answered") {
					this.timelineContent.append("text")
						.attr("class", "historyText")
						.attr("text-anchor", "middle")
						.attr("fill", "red")
						.attr("x", h.x).attr("y", h.y - 20)
						.text("답변 완료");

				} else if (h.type == "topicWrited") {
					this.timelineContent.append("text")
						.attr("class", "historyText")
						.attr("text-anchor", "middle")
						.attr("fill", "orange")
						.attr("x", h.x).attr("y", h.y - 20)
						.text("Topic 생성");
				}
			}
			d3.selectAll(".historyText").attr("font-size", "12");
		}
	}

}