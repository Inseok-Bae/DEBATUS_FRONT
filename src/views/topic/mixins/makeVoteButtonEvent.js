import * as d3 from "d3";
import httpService from "../../../service/httpService";

export default {
	data() {
		return {
			voteButtonShow: true
		};
	},
	methods: {
		makeVoteButtonEvent() {
			let button = d3
				.select("#voteButton")
				.on("mouseenter", () => {
					button
						.transition()
						.style("cursor", "pointer")
						.style("background-color", "#ff7100")
						.style("color", "white");
				})
				.on("mouseleave", () => {
					button
						.transition()
						.style("cursor", "default")
						.style("background-color", "white")
						.style("color", "black");
				})
				.on("click", async () => {
					if (!this.loginFlag) {
						this.$toast.add({
							severity: "warn",
							summary: `로그인이 필요해요.`,
							life: 1500,
							closable: false
						});
						return;
					}

					let showModal = msg => {
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

					try {
						let result = await httpService.patch(
							"/api/required/topic/voteCount",
							{
								topicId: this.dataSource.topicId,
								voteCount: 1
							}
						);
						if (result == "dup") {
							this.$toast.add({
								severity: "warn",
								summary: `한번만 투표할 수 있어요.`,
								life: 1500,
								closable: false
							});
							return;
						}
					} catch (err) {
						showModal(
							"알 수 없는 오류가 발생했어요. 나중에 다시 시도해주세요."
						);
						return;
					}

					this.dataSource.votingCount += 1;

					this.calcuateGauge();

					d3.select("#gaugeBar")
						.transition(500)
						.attr("width", this.gauge + "%")
						.attr("fill", "yellow");
					d3.select("#gaugeBar")
						.transition(300)
						.delay(500)
						.attr("fill", "#FF7100");
					d3.select("#progressMeet").attr("fill", () =>
						this.gauge == this.maxWidth ? "#FF7100" : "silver"
					);
					d3.select("#progressNum")
						.transition(500)
						.attr("x", this.gauge + "%")
						.attr("display", () =>
							this.gauge == this.maxWidth ? "none" : "block"
						)
						.text(this.dataSource.votingCount);
				});
		}
	}
};
