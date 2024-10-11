<template>
<Bar id="my-chart-id" :options="chartOptions" height="250px" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(ChartDataLabels);

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
          
        }
    },
    props: ["volume", "capaciade", "cor"],
    computed:{

        chartData(){

       return  {
            labels: [''],
            datasets: [
                // {
                //     label: "Receita",
                //     data: [10000],
                //     backgroundColor: "#00a651",
                //     borderColor: "#bbb",
                //     borderWidth: { left: 3, right: 3 },
                //     barPercentage: 0.5
                // },
                {
                    label: "Volume ",
                    data: [this.volume],
                    // backgroundColor: "#fffe02",
                    backgroundColor: this.cor,
                    borderColor: this.cor,
                    // borderColor: "#f00",
                    borderWidth: { left: 3, right: 3 },
                    // borderWidth: 2,
                    // borderSkipped: 'top',
                    // borderRadius: 30,
                    barPercentage: 0.5
                },
                {
                    label: "Capacidade ",
                    data: [200000],
                    backgroundColor: "#b7b7b7",
                    // borderColor: "#f00",
                    // borderWidth: 2,
                    // borderSkipped: 'top',
                    // borderRadius: 30,
                    barPercentage: 0.5
                },

            ],
        }
        },
        chartOptions(){
            return {
            plugins: {
                datalabels: {
                    color: "#ffffff",
                    anchor: 'end',
                    align: 'start',
                },
                title: {
                    display: true,
                    text: 'Dados da Estação'
                },
                legend: {
                    display: true
                },
                tooltip: {
                    displayColors: false
                },
            },
            // clamp :true,
            scales: {
                y: {
                    display: true,
                    stacked: false,
                    beginsAtZero: true,
                    // max: 30000,
                    ticks: {
                        display: true,
                        beginAtZero: true
                    }
                },
                x: {
                    display: false,
                    stacked: true
                }
            },
            responsive: true
        }
        }

    }
}
</script>