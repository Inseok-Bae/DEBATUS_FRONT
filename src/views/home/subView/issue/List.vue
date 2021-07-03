<template>
  <div id="issueListFrame">
    <div
      v-for="(items, index) of dataSource"
      :key="'issueList' + index"
      class="issueCardWrapper"
    >
      <issue-card v-for="item of items" :key="item.issueId" :item="item" />
    </div>
  </div>
</template>

<script>
import httpService from "../../../../service/httpService";
import issueCard from "./homeIssueCard.vue";

export default {
  components: {
    issueCard,
  },
  data() {
    return {
      issueDataSource: [],
      page: 0,
      totalPage: 0,
    };
  },
  async created() {
    await this.getDataSource();
  },
  computed: {
    dataSource() {
      let result = [];
      let count = 0;
      for (let issue of this.issueDataSource) {
        if (count % 3 === 0) {
          result.push([]);
        }
        result[result.length - 1].push(issue);
        count += 1;
      }
      return result;
    },
  },
  methods: {
    async getDataSource() {
      let result = await httpService.get(`/api/issue/byPagePreview`, {
        page: this.page,
        size: 12,
        sort: `issueId,ASC`,
      });

      this.totalPage = result.totalPages;
      this.issueDataSource = [...this.issueDataSource, ...result.content];
      this.page += 1;
    },
  },
};
</script>

<style scoped>
#issueListFrame {
  width: 100%;
  height: 280px;
  overflow: auto;
}
.issueCardWrapper {
  width: 100%;
  height: 140px;
}
</style>
