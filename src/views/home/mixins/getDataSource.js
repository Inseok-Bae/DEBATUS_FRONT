import httpService from "../../../service/httpService";

export default {
	methods: {
		async getTopicDataSource() {
			return await httpService.get("/api/topic");
		}
	}
}