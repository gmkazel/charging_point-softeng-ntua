import 'bootstrap/dist/css/bootstrap.css';
import { Line } from 'react-chartjs-2';
// import { data1 } from './EnergyEmployeeAnalytics';

let labels1=['Jan', 'Feb', 'Mar', 'Apr', 'May'];
let label_kW='kWatts consumed';
let label_money='Money earned';
// let data1=[5, 2, 1, 3, 3];
let data2=[56, 13, 6, 19, 29];
let data3=[63, 10, 8, 31, 15];

function EnergyLineChart() {
    const data = {
        labels: labels1,
        datasets: [
            {
                label: label_kW,
                data: data2,
                backgroundColor: 'rgba(255, 69, 0, 0.6)',
                borderColor: 'rgba(0, 0, 139)',
                pointBackgroundColor: 'rgba(0, 0, 139)'
            },
            {
                label: label_money,
                data: data3,
                backgroundColor: 'rgba(255, 69, 0, 0.6)',
                borderColor: 'rgba(0, 0, 139)',
                pointBackgroundColor: 'rgba(0, 0, 139)'
            }
        ]
    }

    return (
        <Line data={data}/>
    );
}

export default EnergyLineChart;
