import * as d3 from "d3";

export default {
	methods: {
		validate() {

			d3.selectAll(".textInputs").style("border-bottom", "1px solid black");
			for (let attr of Object.keys(this.inputs)) {
				this.inputs[attr].tooltipShow = false;
			}

			let flag = true;

			let marking = (attr) => {
				this.inputs[attr].tooltipShow = true;
				d3.select("#" + attr + "Input").style("border-bottom", "1px solid red");
				return false;
			}

			for (let attr of Object.keys(this.inputs)) {
				if (attr == "confirmPassword") {
					if (this.inputs[attr].value !== this.inputs["password"].value) {
						flag = marking(attr);
					}
				}
				else if (attr == "email") {
					let valid = /.+@.+/.exec(this.inputs[attr].value);
					if (valid == null) {
						flag = marking(attr);
					}
				}
				else {
					if (this.inputs[attr].value.length < this.inputs[attr].lowNum || this.inputs[attr].value.length > this.inputs[attr].highNum) {
						flag = marking(attr);
					}
				}
			}
			return flag;
		}
	}
}