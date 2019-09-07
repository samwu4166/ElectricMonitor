<script>
import Chart from 'chart.js'
import { Bar, mixins } from 'vue-chartjs'
import chartjsPluginDatalabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins

export default{
    components:{
        chartjsPluginDatalabels
    },
    props:['title'],
    mixins: [reactiveProp],
    extends: Bar,
    data() {
        return {
            options: {
                title: {
                    display: true,
                    text: this.title
                },
                legend: {
                    display: false
                },
                tooltips: {enabled: false},
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines:{
                                drawTicks: false,
                                zeroLineWidth: 0
                            },
                            ticks: {
                                stepSize: 5,
                                padding: 5
                            }
                        }
                    ]
                }
            }
        }
    },
    mounted(){
        Chart.defaults.global.plugins.datalabels.anchor = 'end';
        Chart.defaults.global.plugins.datalabels.align = 'end';
        this.renderChart(this.chartData, this.options)
    }
}

</script>