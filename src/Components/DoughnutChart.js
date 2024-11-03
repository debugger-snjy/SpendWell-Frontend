import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { color, toPadding } from 'chart.js/helpers';

function generateConsistentColors(numColors) {
    var colors = [];
    var darkColors = [];
    var lightColors = [];
    // Predefined palette
    var palette = [
        [255, 99, 132], // Red
        [54, 162, 235], // Blue
        [255, 206, 86], // Yellow
        [75, 192, 192], // Teal
        [153, 102, 255], // Purple
        [255, 159, 64]  // Orange
    ];

    for (var i = 0; i < numColors; i++) {
        var color = palette[i % palette.length];

        // Generate dark color for border
        var darkColor = 'rgba(' + (Math.floor(color[0] * 0.8)) + ', ' + (Math.floor(color[1] * 0.8)) + ', ' + (Math.floor(color[2] * 0.8)) + ', ' + 1 + ')';
        darkColors.push(darkColor);

        // Generate light color for background
        var lightColor = 'rgba(' + (Math.floor(color[0] * 1)) + ', ' + (Math.floor(color[1] * 1)) + ', ' + (Math.floor(color[2] * 1)) + ', ' + 1 + ')';
        lightColors.push(lightColor);
    }

    // Combine dark and light colors
    for (var j = 0; j < numColors; j++) {
        var borderColor = darkColors[j];
        var backgroundColor = lightColors[j];
        colors.push({ border: borderColor, background: backgroundColor });
    }

    return colors;
}

function CreateDoughnutChart(props) {

    Chart.register(ArcElement, Tooltip, Legend, Title);
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 0)';
    Chart.defaults.plugins.tooltip.caretPadding = 4;
    Chart.defaults.plugins.legend.position = 'right';
    Chart.defaults.plugins.legend.labels.color = 'rgb(255, 255, 255)';
    Chart.defaults.plugins.legend.title.display = true;
    Chart.defaults.plugins.legend.title.text = "Transactions";
    Chart.defaults.plugins.legend.title.color = "rgb(255,255,255)";
    Chart.defaults.plugins.legend.title.font = 'Helvetica Neue';

    console.log("Data Received :", props.data)


    let myColors = generateConsistentColors(props.datatype === "category" ? Object.values(props.data).length : props.data.length);
    console.log("COLORS : ", myColors);

    console.log([
        myColors.map((color) => { return color["background"] })
    ])

    console.log(Object.values(props.data));

    const dataForPie = props.datatype === "category" ? Object.values(props.data) : props.data.map(data => data.amount ? data.amount : data.accountAmount);

    const mydata = {
        labels: props.datatype === "category" ? Object.keys(props.data) : props.data.map(data => data.desc ? data.desc : data.accountName),
        datasets: [{
            label: 'Amount',
            data: dataForPie,
            color: 'rgb(225,225,225)',
            backgroundColor: myColors.map((color) => { return color["background"] }),
            borderColor: myColors.map((color) => { return color["border"] }),
            borderWidth: 2,
        }]
    };

    const options = {
        cutout: '50%',
        tooltips: {
            enabled: true,
            callbacks: {
                label: function (tooltipItem, data) {
                    const label = data.labels[tooltipItem.index] || '';
                    const value = data.datasets[0].data[tooltipItem.index] || '';
                    return ` ${label} : ${value}`;
                }
            }
        },
    };

    return (
        <>
            <Doughnut data={mydata} options={options} />
        </>
    )
}

export default CreateDoughnutChart;