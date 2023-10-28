<script setup lang="ts">
import Detail from '@/components/composites/Detail.vue';
import services from '@/utils/services';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const data = ref()
services.get('shift-schedule/find-activity', {activity_id: route.query.activity_id, schedule_id: route.query.schedule_id}).then(res => {
  data.value = res.data
})

const formInformationDetail = {
  fields: [
    "report_number",
    "form_number",
    "date",
    "shift",
    "rel_section_id",
    "rel_activity_id"
  ],
  alias: {
    report_number: "Nomor Laporan",
    form_number: "Nomor Dokumen",
    date: "Tanggal",
    shift: "Shift",
    section_id: "Ruas",
    rel_activity_id: "Aktivitas",
  },
  fieldsType: {
    date: {type: "date"}
  }
}
</script>

<template>
  <Detail v-if="data" v-bind="formInformationDetail" :data="data"/>
</template>