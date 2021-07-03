import * as d3 from "d3";

export default {
	methods: {
		appendScore() {

			let lenSum = this.prosOpinions.length + this.consOpinions.length,
				recommendSum = this.consRecommend + this.prosRecommend,
				prosSize = (this.prosOpinions.length / lenSum + (recommendSum == 0 ? 0 : this.prosRecommend / recommendSum)) * 40 + 20,
				consSize = (this.consOpinions.length / lenSum + (recommendSum == 0 ? 0 : this.consRecommend / recommendSum)) * 40 + 20

			for (let stand of ["prosScore", "consScore"]) {

				d3.select("#" + stand + "svg").remove();

				let svg = d3.select("#" + stand)
					.append("svg")
					.attr("id", stand + "svg")
					.attr("width", "100%")
					.attr("height", "100%")
					.style("background-color", "white")
					.on("mouseover", () => {
						svg.transition()
							.style("background-color", "#B301FA10")
							.style("cursor", "pointer");

						d3.select("#prosScoreNumber")
							.transition()
							.text((this.prosRecommend == 0 ? 0 : this.prosRecommend));

						d3.select("#consScoreNumber")
							.transition()
							.text((this.consRecommend == 0 ? 0 : this.consRecommend));

						d3.select("#prosScoreLabel")
							.transition()
							.text("평균 추천 수");

						d3.select("#consScoreLabel")
							.transition()
							.text("평균 추천 수");

					})
					.on("mouseleave", () => {
						if ((stand == "prosScore" && !this.prosScoreClicked) || (stand == "consScore" && !this.consScoreClicked)) {
							svg.transition()
								.style("background-color", "white")
								.style("cursor", "default");
						}

						d3.select("#prosScoreNumber")
							.transition()
							.text(this.prosOpinions.length);

						d3.select("#consScoreNumber")
							.transition()
							.text(this.consOpinions.length);

						d3.select("#prosScoreLabel")
							.transition()
							.text("찬성 수");

						d3.select("#consScoreLabel")
							.transition()
							.text("반대 수");

					})

				svg.append("text")
					.attr("id", stand + "Label")
					.attr("text-anchor", "middle")
					.attr("font-size", 20)
					.attr("x", Number(svg.style("width").replace("px", "")) / 2)
					.attr("y", Number(svg.style("height").replace("px", "")) / 2 - 40)
					.attr("fill", () => (stand == "prosScore") ? "green" : "red")
					.text((stand == "prosScore") ? "찬성 수" : "반대 수");

				svg.append("text")
					.attr("id", stand + "Number")
					.attr("text-anchor", "middle")
					.attr("font-size", () => (stand == "prosScore") ? prosSize : consSize)
					.attr("font-weight", "bolder")
					.attr("x", Number(svg.style("width").replace("px", "")) / 2)
					.attr("y", Number(svg.style("height").replace("px", "")) / 2 + 60)
					.attr("fill", () => (stand == "prosScore") ? "green" : "red")
					.text(((stand == "prosScore") ? this.prosOpinions.length : this.consOpinions.length));
			}
		},
	}
}