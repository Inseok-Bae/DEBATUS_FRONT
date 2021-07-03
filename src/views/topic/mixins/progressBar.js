import * as d3 from "d3";

export default {
	data() {
		return {
			meetNum: 100,
			maxWidth: 95,
			gauge: 0,

		}
	},
	methods: {
		calcuateGauge() {
			this.gauge = Number(this.dataSource.votingCount) / this.meetNum * this.maxWidth;
			this.gauge = this.gauge > this.maxWidth ? this.maxWidth : this.gauge;

			if (this.gauge == this.maxWidth) {
				this.voteButtonShow = false;
				d3.select("#progressBar").transition(300).attr("width", "100%");
			} else {
				this.voteButtonShow = true;
			}

		},
		makeBar() {

			d3.select("#progressBar").attr("width", "87%");

			d3.select("#progressBar")
				.append("rect")
				.attr("width", this.maxWidth + "%")
				.attr("height", 3)
				.attr("fill", "silver")
				.attr("x", 0)
				.attr("y", 7.5);

			this.calcuateGauge();

			d3.select("#progressBar")
				.append("rect")
				.attr("id", "gaugeBar")
				.attr("width", this.gauge + "%")
				.attr("height", 3)
				.attr("fill", "#FF7100")
				.attr("x", 0)
				.attr("y", 7.5);

			d3.select("#progressBar")
				.append("text")
				.attr("id", "progressMeet")
				.attr("x", "95%")
				.attr("y", 14)
				.attr("font-size", 15)
				.attr("font-weight", "1000")
				.attr("font-style", "italic")
				.attr("fill", () => (this.gauge == this.maxWidth) ? "#FF7100" : "silver")
				.text(this.meetNum + "!");

			d3.select("#progressBar")
				.append("text")
				.attr("id", "progressNum")
				.attr("x", this.gauge + "%")
				.attr("y", 25)
				.attr("font-size", 15)
				.attr("font-weight", "500")
				.attr("fill", "#FF7100")
				.attr("display", () => this.gauge == this.maxWidth ? "none" : "block")
				.text(this.dataSource.votingCount);
		},

	}
}