
document.getElementById('loanAmountSlider').value = 200000;
document.getElementById('interestRateSlider').value = 12;
document.getElementById('emiTimeSlider').value = 24;
updateInputBoxes();
updateResult();


let inputFields = ['#loanAmountSlider', '#loanAmount', '#interestRate', '#interestRateSlider', '#emiTime', '#emiTimeSlider']
inputFields.forEach(function(selector) {
    document.querySelector(selector).addEventListener('input', updateResult);
});

let inputSliders = ['#loanAmountSlider', '#interestRateSlider', '#emiTimeSlider']
inputSliders.forEach(function(selector) {
    document.querySelector(selector).addEventListener('input', updateInputBoxes);
});

let inputBoxes = ['#loanAmount', '#interestRate', '#emiTime']
inputBoxes.forEach(function(selector) {
    document.querySelector(selector).addEventListener('input', updateSliders);
});

function updateInputBoxes() {
    document.querySelector('#loanAmount').value = document.querySelector('#loanAmountSlider').value
    document.querySelector('#interestRate').value = document.querySelector('#interestRateSlider').value
    document.querySelector('#emiTime').value = document.querySelector('#emiTimeSlider').value
}

function updateSliders() {
    document.querySelector('#loanAmountSlider').value = document.querySelector('#loanAmount').value
    document.querySelector('#interestRateSlider').value = document.querySelector('#interestRate').value
    document.querySelector('#emiTimeSlider').value = document.querySelector('#emiTime').value
}
function updateResult(){
    let p = document.querySelector('#loanAmount').value;
    let i = document.querySelector('#interestRate').value;
    let t = document.querySelector('#emiTime').value;
    if(p=='' || i=='' || t=='' ) {
        return
    }
    i = i/12/100

    let emi = p * i * ((1 + i)**t) / (((1 + i)**t) - 1);
    let payable = emi*t;
    let interest = payable - p
    console.log(emi);

    document.querySelector('#emiResult').innerHTML = '₹ '+parseInt(emi);
    document.querySelector('#interestResult').innerHTML = '₹ '+parseInt(interest);
    document.querySelector('#payableResult').innerHTML = '₹ '+parseInt(payable);
    updatePiechart();

}


function updatePiechart() {
    let pieInterest = document.getElementById('interestResult').innerHTML.split(' ')[1];
    let pieLoan = document.getElementById('loanAmount').value;

    var options = {
        series: [parseInt(pieInterest),parseInt(pieLoan)],
        labels: ['Interest','Loan Amout'],
        chart: {
        width: 380,
        type: 'pie',
        },
        plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 270
        }
        },
        colors: ['#f7822f', '#28fc6f'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
        breakpoint: 480,
        options: {
            chart: {
            width: 200
            },
            legend: {
            position: 'bottom'
            }
        }
        }]
    };
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
}