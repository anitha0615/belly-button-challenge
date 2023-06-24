let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

let bellydata;
let option = "";

function init() {
    d3.json(url).then(function(data) {
        bellydata = data;
        console.log(bellydata);

       displayDemoData(940,bellydata);
       horizontalBarChart(940,bellydata);
       bubbleChart(940,bellydata);
    
        let dropdownMenu = d3.select("#selDataset");
    
        bellydata.names.forEach(function(name){
            dropdownMenu.append("option").text(name);
        });
        
    })

};

function horizontalBarChart (option,datasample) {
    
    let samples = datasample.samples;
    barData = samples.filter(sample => sample.id == option);
    
    sampleValues = samples.map(sample => sample.sample_values.slice(0,10));
    otuID = samples.map(sample => sample.otu_ids.slice(0,10));
    otuLabel = samples.map(sample => sample.otu_labels.slice(0,10));
    console.log(sampleValues[0])
    console.log(otuID[0])
    console.log(otuLabel[0])
    Trace = {
        x: sampleValues[0],
        y: otuID[0].map(id =>`OTU ${id}`),
        text: otuLabel[0],
        type: 'bar',
        orientation: 'h',
    };

     traceData = [Trace];

    layout = {
        title: 'OTU',
        yaxis: {
            autorange: "reversed" 
        }
    };

    Plotly.newPlot("bar", traceData, layout);
};


function bubbleChart (option,datasample) {
    
    let samples = datasample.samples;

    bubbleData = samples.filter(sample => sample.id == option);
    console.log(bubbleData);
    
    let sampleValues = samples.map(sample => sample.sample_values.slice(0,10));
    let otuID = samples.map(sample => sample.otu_ids.slice(0,10));
    let otuLabel = samples.map(sample => sample.otu_labels.slice(0,10));

    var marker_size = barData.map(row =>row.sample_values);
    var marker_color = barData.map(row =>row.otu_ids);
    

    let bubbleTrace = {
        x: otuID[0],
        y: sampleValues[0],
        mode: 'markers',
        marker: {
            color: marker_color[0],
            size: marker_size[0],
            colorscale: "Earth"
        },
        text: otuLabel[0],
        type: 'bubble'
        }
    
    let layoutBubble = {
        title: 'Bubble OTU'
    };
    Plotly.newPlot("bubble", [bubbleTrace], layoutBubble);

};

function displayDemoData(option,datasample) {
    
    var mtdata = datasample.metadata.filter(row => row.id == option);
    console.log("display demo data")
    console.log(mtdata)
    d3.select("#sample-metadata").html(displaymetadata(mtdata[0]));
        
};

function displaymetadata(obj) {
    var str = "";
    Object.entries(obj).forEach(([key,value]) => {
        str += `<br>${key}:${value}</br>`;
        if(key=="wfreq"){
            gauge(value);
           console.log("gauge value is:" +value);
        }
        
    });
    return str;
};

function optionChanged(value) {
    console.log("INside Optionchanged")
    option = value;
    console.log(`option selected ${option}`)
    console.log(option)
    displayDemoData(option,bellydata);
    horizontalBarChart(option,bellydata);
    bubbleChart(option,bellydata);
};

init();


// select panel-body
// d3.select('.panel-body')