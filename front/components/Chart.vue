<template>
  <div class="p-2 border border-gray-500 mt-4">
    <label class="block mb-2 font-bold"> Coba Chart </label>

    <client-only>
      <BarChart :data="chartData" />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    penilaian: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: '',
            data: [2, 1, 16, 3, 2, 22],
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgba(100, 255, 0, 1)',
            borderWidth: 2,
          },
        ],
      }
    },
  },
}
</script>
