var r_slider = document.getElementById("r_slider");
var r_output = document.getElementById("r_value");
r_output.innerHTML = (r_slider.value * 100).toFixed(1); // Display the default slider value

var q_slider = document.getElementById("q_slider");
var q_output = document.getElementById("q_value");
q_output.innerHTML = (q_slider.value * 100).toFixed(1); // Display the default slider value

var sigma_slider = document.getElementById("sigma_slider");
var sigma_output = document.getElementById("sigma_value");
sigma_output.innerHTML = sigma_slider.value; // Display the default slider value

var t_slider = document.getElementById("t_slider");
var t_output = document.getElementById("t_value");
t_output.innerHTML = t_slider.value; // Display the default slider value

var K_slider = document.getElementById("K_slider");
var K_output = document.getElementById("K_value");
K_output.innerHTML = K_slider.value; // Display the default slider value

var S0_slider = document.getElementById("S0_slider");
var S0_output = document.getElementById("S0_value");
S0_output.innerHTML = S0_slider.value; // Display the default slider value

function openNav() {
  document.getElementById("menu").style.width = "25%";
}

function closeNav() {
  document.getElementById("menu").style.width = "0";
}

function update_callPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);

  var S_T = range(40, 1, 160);
  var SS = range(S0-20, 1, S0+20);
  var SS2 = range(S0-40, 1, S0+40);

  var payoff_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      payoff_c[i] = payoff_call(S_T[i], K);
  }

  var price_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      price_c[i] = callBS(S_T[i], K, r, q, sigma, t);
  }

  var linear_c = new Array(SS.length);
  var a = taylor_linear(S0, K, r, q, sigma, t, category='call');
  for (var i = 0; i < SS.length; i++) {
    linear_c[i] = a[0] * SS[i] + a[1];
  }
  
  var quadratic_c = new Array(SS.length);
  var b = taylor_parabola(S0, K, r, q, sigma, t, category='call');
  for (var i = 0; i < SS2.length; i++) {
    quadratic_c[i] = b[0] * SS2[i] * SS2[i] + b[1] * SS2[i] + b[2];
  }

  var pay_c = {
      type: 'scatter',
      x: S_T,
      y: payoff_c,
      mode: 'lines',
      name: 'Payoff',
      line: {
          dash: 'dashdot',
          color: 'blue',
          width: 2.5
      }
  };

  var pri_c = {
      type: 'scatter',
      x: S_T,
      y: price_c,
      mode: 'lines',
      name: 'Price',
      line: {
          dash: 'Solid',
          color: '#FF0088',
          width: 2.5
      }
  };

  var lin_c = {
    type: 'scatter',
    x: SS,
    y: linear_c,
    mode: 'lines',
    name: '1st order',
    line: {
        dash: 'Solid',
        color: '#CD853F',
        width: 3.5
    }
  };

  var qua_c = {
    type: 'scatter',
    x: SS2,
    y: quadratic_c,
    mode: 'lines',
    name: '2nd order',
    line: {
        dash: 'Solid',
        color: 'green',
        width: 3.5
    }
  };

  if (L_check.checked && Q_check.checked) {
    var data = [pay_c, pri_c, lin_c, qua_c];
  }
  else if (L_check.checked) {
    var data = [pay_c, pri_c, lin_c];
  }
  else if (Q_check.checked) {
    var data = [pay_c, pri_c, qua_c]; 
  }
  else{
    var data = [pay_c, pri_c];
  }
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 0,
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 0,
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra011').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter1').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra011').modal('hide'); 
         $('#extra012').modal('show');
         $('#extra012').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra012').modal('hide');
        $('#extra011').modal('show');
        $('#extra011').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_putPlot() {
  var bb = document.querySelector ('#b1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);
  var SS = range(S0-20, 1, S0+20);
  var SS2 = range(S0-40, 1, S0+40);

  var payoff_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      payoff_p[i] = payoff_put(S_T[i], K);
  }

  var price_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      price_p[i] = putBS(S_T[i], K, r, q, sigma, t);
  }

  var linear_p = new Array(SS.length);
  var a = taylor_linear(S0, K, r, q, sigma, t, category='put');
  for (var i = 0; i < SS.length; i++) {
    linear_p[i] = a[0] * SS[i] + a[1];
  }
  
  var quadratic_p = new Array(SS2.length);
  var b = taylor_parabola(S0, K, r, q, sigma, t, category='put');
  for (var i = 0; i < SS2.length; i++) {
    quadratic_p[i] = b[0] * SS2[i] * SS2[i] + b[1] * SS2[i] + b[2];
  }

  var pay_p = {
      type: 'scatter',
      x: S_T,
      y: payoff_p,
      mode: 'lines',
      name: 'Payoff',
      line: {
          dash: 'dashdot',
          color: 'blue',
          width: 2.5
      }
  };

  var pri_p = {
      type: 'scatter',
      x: S_T,
      y: price_p,
      mode: 'lines',
      name: 'Price',
      line: {
          dash: 'Solid',
          color: '#FF0088',
          width: 2.5
      }
  };

  var lin_p = {
    type: 'scatter',
    x: SS,
    y: linear_p,
    mode: 'lines',
    name: '1st order',
    line: {
        dash: 'Solid',
        color: '#CD853F',
        width: 3.5
    }
  };

  var qua_p = {
    type: 'scatter',
    x: SS2,
    y: quadratic_p,
    mode: 'lines',
    name: '2nd order',
    line: {
        dash: 'Solid',
        color: 'green',
        width: 3.5
    }
  };

  if (L_check.checked && Q_check.checked) {
    var data = [pay_p, pri_p, lin_p, qua_p];
  }
  else if (L_check.checked) {
    var data = [pay_p, pri_p, lin_p];
  }
  else if (Q_check.checked) {
    var data = [pay_p, pri_p, qua_p]; 
  }
  else{
    var data = [pay_p, pri_p];
  }
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra021').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter2').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra021').modal('hide'); 
         $('#extra022').modal('show');
         $('#extra022').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra022').modal('hide');
        $('#extra021').modal('show');
        $('#extra021').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_calltPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var price_ct = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      price_ct[i] = callBS(S0, K, r, q, sigma, T[i]);
  }
  
  var pri_ct = {
      type: 'scatter',
      x: T,
      y: price_ct,
      mode: 'lines',
      name: 'Price',
      line: {
          dash: 'Solid',
          color: '#C10066',
          width: 2
      }
  };
  console.log(T);
  var data = [pri_ct];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 0,
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 0,
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra131').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter13').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra131').modal('hide'); 
         $('#extra132').modal('show');
         $('#extra132').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra132').modal('hide');
        $('#extra131').modal('show');
        $('#extra131').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_puttPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var price_pt = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      price_pt[i] = putBS(S0, K, r, q, sigma, T[i]);
  }
  
  var pri_pt = {
      type: 'scatter',
      x: T,
      y: price_pt,
      mode: 'lines',
      name: 'Price',
      line: {
          dash: 'Solid',
          color: '#C10066',
          width: 2
      }
  };
  
  var data = [pri_pt];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 0.7,
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Price</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Price</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    legend: {
      x: 0.7,
      y: 1,
      font: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra141').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter14').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra141').modal('hide'); 
         $('#extra142').modal('show');
         $('#extra142').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra142').modal('hide');
        $('#extra141').modal('show');
        $('#extra141').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_deltacPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var delta_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      delta_c[i] = deltaBS(S_T[i], K, r, q, sigma, t, category = 'call');
  }
  
  var del_c = {
      type: 'scatter',
      x: S_T,
      y: delta_c,
      mode: 'lines',
      name: 'Delta',
      line: {
          dash: 'Solid',
          color: 'green',
          width: 2
      }
  };

  var data = [del_c];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra031').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter3').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra031').modal('hide'); 
         $('#extra032').modal('show');
         $('#extra032').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra032').modal('hide');
        $('#extra031').modal('show');
        $('#extra031').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_deltactPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var delta_ct = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      delta_ct[i] = deltaBS(S0, K, r, q, sigma, T[i], category = 'call');
  }
  
  var del_ct = {
      type: 'scatter',
      x: T,
      y: delta_ct,
      mode: 'lines',
      name: 'Delta',
      line: {
          dash: 'Solid',
          color: '#FFBB00',
          width: 2
      }
  };
  
  var data = [del_ct];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra151').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter15').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra151').modal('hide'); 
         $('#extra152').modal('show');
         $('#extra152').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra152').modal('hide');
        $('#extra151').modal('show');
        $('#extra151').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_deltapPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);

  var S_T = range(40, 1, 160);

  var delta_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      delta_p[i] = deltaBS(S_T[i], K, r, q, sigma, t, category = 'put');
  }
  
  var del_p = {
      type: 'scatter',
      x: S_T,
      y: delta_p,
      mode: 'lines',
      name: 'Delta',
      line: {
          dash: 'Solid',
          color: 'green',
          width: 2
      }
  };

  var data = [del_p];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra041').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter4').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra041').modal('hide'); 
         $('#extra042').modal('show');
         $('#extra042').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra042').modal('hide');
        $('#extra041').modal('show');
        $('#extra041').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_deltaptPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var delta_pt = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      delta_pt[i] = deltaBS(S0, K, r, q, sigma, T[i], category = 'put');
  }
  
  var del_pt = {
      type: 'scatter',
      x: T,
      y: delta_pt,
      mode: 'lines',
      name: 'Delta',
      line: {
          dash: 'Solid',
          color: '#FFBB00',
          width: 2
      }
  };
  
  var data = [del_pt];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Delta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Delta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra161').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter16').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra161').modal('hide'); 
         $('#extra162').modal('show');
         $('#extra162').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra162').modal('hide');
        $('#extra161').modal('show');
        $('#extra161').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_gammacPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var gamma_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      gamma_c[i] = gammaBS(S_T[i], K, r, q, sigma, t);
  }
  
  var gam_c = {
      type: 'scatter',
      x: S_T,
      y: gamma_c,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#008888',
          width: 2
      }
  };

  var data = [gam_c];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra051').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter5').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra051').modal('hide'); 
         $('#extra052').modal('show');
         $('#extra052').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra052').modal('hide');
        $('#extra051').modal('show');
        $('#extra051').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_gammactPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = range(1, -0.05, 0.05);
  
  var gamma_ct = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      gamma_ct[i] = gammaBS(S0, K, r, q, sigma, T[i]);
  }
  
  var gam_ct = {
      type: 'scatter',
      x: T,
      y: gamma_ct,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#FF8800',
          width: 2
      }
  };
  
  var data = [gam_ct];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra171').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter17').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra171').modal('hide'); 
         $('#extra172').modal('show');
         $('#extra172').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra172').modal('hide');
        $('#extra171').modal('show');
        $('#extra171').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_gammapPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var gamma_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      gamma_p[i] = gammaBS(S_T[i], K, r, q, sigma, t);
  }
  
  var gam_p = {
      type: 'scatter',
      x: S_T,
      y: gamma_p,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#008888',
          width: 2
      }
  };

  var data = [gam_p];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra061').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter6').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra061').modal('hide'); 
         $('#extra062').modal('show');
         $('#extra062').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra062').modal('hide');
        $('#extra061').modal('show');
        $('#extra061').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_gammaptPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = range(1, -0.05, 0.05);
  
  var gamma_pt = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      gamma_pt[i] = gammaBS(S0, K, r, q, sigma, T[i]);
  }
  
  var gam_pt = {
      type: 'scatter',
      x: T,
      y: gamma_pt,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#FF8800',
          width: 2
      }
  };
  
  var data = [gam_pt];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Gamma</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Gamma</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra181').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter18').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra181').modal('hide'); 
         $('#extra182').modal('show');
         $('#extra182').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra182').modal('hide');
        $('#extra181').modal('show');
        $('#extra181').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_vegacPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var vega_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      vega_c[i] = vegaBS(S_T[i], K, r, q, sigma, t);
  }
  
  var veg_c = {
      type: 'scatter',
      x: S_T,
      y: vega_c,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#00DDAA',
          width: 2
      }
  };

  var data = [veg_c];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra071').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter7').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra071').modal('hide'); 
         $('#extra072').modal('show');
         $('#extra072').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra072').modal('hide');
        $('#extra071').modal('show');
        $('#extra071').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_vegactPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var vega_ct = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      vega_ct[i] = vegaBS(S0, K, r, q, sigma, T[i]);
  }
  
  var veg_ct = {
      type: 'scatter',
      x: T,
      y: vega_ct,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#FFAA33',
          width: 2
      }
  };
  
  var data = [veg_ct];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra191').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter19').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra191').modal('hide'); 
         $('#extra192').modal('show');
         $('#extra192').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra192').modal('hide');
        $('#extra191').modal('show');
        $('#extra191').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_vegapPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var vega_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      vega_p[i] = vegaBS(S_T[i], K, r, q, sigma, t);
  }
  
  var veg_p = {
      type: 'scatter',
      x: S_T,
      y: vega_p,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#00DDAA',
          width: 2
      }
  };

  var data = [veg_p];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra081').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter8').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra081').modal('hide'); 
         $('#extra082').modal('show');
         $('#extra082').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra082').modal('hide');
        $('#extra081').modal('show');
        $('#extra081').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_vegaptPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var vega_pt = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      vega_pt[i] = vegaBS(S0, K, r, q, sigma, T[i]);
  }
  
  var veg_pt = {
      type: 'scatter',
      x: T,
      y: vega_pt,
      mode: 'lines',
      name: 'Gamma',
      line: {
          dash: 'Solid',
          color: '#FFAA33',
          width: 2
      }
  };
  
  var data = [veg_pt];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Vega</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Vega</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra201').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter20').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra201').modal('hide'); 
         $('#extra202').modal('show');
         $('#extra202').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra202').modal('hide');
        $('#extra201').modal('show');
        $('#extra201').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_thetacPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var theta_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      theta_c[i] = thetaBS(S_T[i], K, r, q, sigma, t, category = 'call');
  }
  
  var the_c = {
      type: 'scatter',
      x: S_T,
      y: theta_c,
      mode: 'lines',
      name: 'Theta',
      line: {
          dash: 'Solid',
          color: '#888800',
          width: 2
      }
  };

  var data = [the_c];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra091').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter9').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra091').modal('hide'); 
         $('#extra092').modal('show');
         $('#extra092').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra092').modal('hide');
        $('#extra091').modal('show');
        $('#extra091').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_thetactPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = range(1, -0.05, 0.05);
  
  var theta_ct = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      theta_ct[i] = thetaBS(S0, K, r, q, sigma, T[i], category = 'call');
  }
  
  var the_ct = {
      type: 'scatter',
      x: T,
      y: theta_ct,
      mode: 'lines',
      name: 'Theta',
      line: {
          dash: 'Solid',
          color: '#FF7744',
          width: 2
      }
  };
  
  var data = [the_ct];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra211').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter21').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra211').modal('hide'); 
         $('#extra212').modal('show');
         $('#extra212').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra212').modal('hide');
        $('#extra211').modal('show');
        $('#extra211').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_thetapPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var theta_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      theta_p[i] = thetaBS(S_T[i], K, r, q, sigma, t, category = 'put');
  }
  
  var the_p = {
      type: 'scatter',
      x: S_T,
      y: theta_p,
      mode: 'lines',
      name: 'Theta',
      line: {
          dash: 'Solid',
          color: '#888800',
          width: 2
      }
  };

  var data = [the_p];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra101').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter10').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra101').modal('hide'); 
         $('#extra102').modal('show');
         $('#extra102').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra102').modal('hide');
        $('#extra101').modal('show');
        $('#extra101').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_thetaptPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = range(1, -0.05, 0.000000001);
  
  var theta_pt = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      theta_pt[i] = thetaBS(S0, K, r, q, sigma, T[i], category = 'put');
  }
  
  var the_pt = {
      type: 'scatter',
      x: T,
      y: theta_pt,
      mode: 'lines',
      name: 'Theta',
      line: {
          dash: 'Solid',
          color: '#FF7744',
          width: 2
      }
  };
  
  var data = [the_pt];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Theta</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Theta</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra221').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter22').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra221').modal('hide'); 
         $('#extra222').modal('show');
         $('#extra222').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra222').modal('hide');
        $('#extra221').modal('show');
        $('#extra221').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_rhocPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var rho_c = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      rho_c[i] = rhoBS(S_T[i], K, r, q, sigma, t, category = 'call');
  }
  
  var rh_c = {
      type: 'scatter',
      x: S_T,
      y: rho_c,
      mode: 'lines',
      name: 'Rho',
      line: {
          dash: 'Solid',
          color: '#CC6600',
          width: 2
      }
  };

  var data = [rh_c];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra111').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter11').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra111').modal('hide'); 
         $('#extra112').modal('show');
         $('#extra112').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra112').modal('hide');
        $('#extra111').modal('show');
        $('#extra111').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_rhoctPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var rho_ct = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      rho_ct[i] = rhoBS(S0, K, r, q, sigma, T[i], category = 'call');
  }
  
  var rh_ct = {
      type: 'scatter',
      x: T,
      y: rho_ct,
      mode: 'lines',
      name: 'Rho',
      line: {
          dash: 'Solid',
          color: '#FF3333',
          width: 2
      }
  };
  
  var data = [rh_ct];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Call Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Call Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra231').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter23').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra231').modal('hide'); 
         $('#extra232').modal('show');
         $('#extra232').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra232').modal('hide');
        $('#extra231').modal('show');
        $('#extra231').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_rhopPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;

  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);


  var S_T = range(40, 1, 160);

  var rho_p = new Array(S_T.length);
  for (var i = 0; i < S_T.length; i++) {
      rho_p[i] = rhoBS(S_T[i], K, r, q, sigma, t, category = 'put');
  }
  
  var rh_p = {
      type: 'scatter',
      x: S_T,
      y: rho_p,
      mode: 'lines',
      name: 'Rho',
      line: {
          dash: 'Solid',
          color: '#CC6600',
          width: 2
      }
  };

  var data = [rh_p];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>S<sub>0</sub></b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: S0,
      y0: 0, 
      x1: S0, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 30,
      t: 25,
    }
  };

  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra121').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter12').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra121').modal('hide'); 
         $('#extra122').modal('show');
         $('#extra122').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra122').modal('hide');
        $('#extra121').modal('show');
        $('#extra121').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_rhoptPlot() {
  var bb = document.querySelector ('#a1Plot').getBoundingClientRect();
  var width = (bb.right - bb.left) - 20;
  
  var r = parseFloat(document.getElementById('r_slider').value);
  var q = parseFloat(document.getElementById('q_slider').value);
  var sigma = parseFloat(document.getElementById('sigma_slider').value);
  var t = parseFloat(document.getElementById('t_slider').value);
  var K = parseFloat(document.getElementById('K_slider').value);
  var S0 = parseFloat(document.getElementById('S0_slider').value);
  var T = toDecimal(range(100, -5, 0), 2);
  
  var rho_pt = new Array(T.length);
  for (var i = 0; i < T.length; i++) {
      rho_pt[i] = rhoBS(S0, K, r, q, sigma, T[i], category = 'put');
  }
  
  var rh_pt = {
      type: 'scatter',
      x: T,
      y: rho_pt,
      mode: 'lines',
      name: 'Rho',
      line: {
          dash: 'Solid',
          color: '#FF3333',
          width: 2
      }
  };
  
  var data = [rh_pt];
    
  var layout = {
    title: {
      font: {size: 12},
      text: '<b>Put Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    width: width,
    height: width * 0.8,
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    },
    paper_bgcolor: "#ffffff",
    plot_bgcolor:"#ffffff"
  };

  var layout1 = {
    title: {
      font: {size: 12},
      text: '<b>Put Rho</b>'
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0,
      xanchor: 'center',
      y: 1,
      yanchor: 'bottom',
      text: '<b>Rho</b>',
      font: {size: 10},
      showarrow: false
    }],
    xaxis: {
      title: {
        text: '<b>T</b>',
        font: {size: 10}
      },
      tickfont: {size: 10}
    },
    yaxis: {
      tickfont: {size: 10}
    },
    shapes: [{ 
      type: 'line', 
      yref: 'paper',
      x0: t,
      y0: 0, 
      x1: t, 
      y1: 1, 
      line: { 
       color: 'grey', 
       width: 1.5, 
       dash: 'dot' 
      }
    }],
    margin: {
      l: 30,
      r: 10,
      b: 20,
      t: 25,
    }
  };
  
  var config = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{
        $('#extra241').modal('show');      
      }},
      {
        name: 'info',
        icon: Plotly.Icons.question,
        click: ()=>{
          $('#exampleModalCenter24').modal('show');
        }}]
  };

  var config1 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom in',
      icon: Plotly.Icons.zoom_plus,
      click: ()=>{        
         $('#extra241').modal('hide'); 
         $('#extra242').modal('show');
         $('#extra242').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      });              
      }}]
  };

  var config2 = {
    modeBarButtonsToRemove: ['zoom2d','pan2d','select2d','lasso2d','resetScale2d','zoomOut2d','zoomIn2d','toggleSpikelines','hoverClosestCartesian'],
    modeBarButtonsToAdd: [{
      name: 'zoom out',
      icon: Plotly.Icons.zoom_minus,
      click: ()=>{
        $('#extra242').modal('hide');
        $('#extra241').modal('show');
        $('#extra241').on("shown.bs.modal",function(){
          $(document.body).addClass("modal-open");
      }); 
      }
    }]
  };

  return [data, layout, config, layout1, config1, config2];
}

function update_Toff() {
  var c = update_callPlot();
  var p = update_putPlot();
  var dc = update_deltacPlot();
  var dp = update_deltapPlot();
  var gc = update_gammacPlot();
  var gp = update_gammapPlot();
  var vc = update_vegacPlot();
  var vp = update_vegapPlot();
  var tc = update_thetacPlot();
  var tp = update_thetapPlot();
  var rc = update_rhocPlot();
  var rp = update_rhopPlot();

  Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
  Plotly.newPlot('b1Plot', p[0], p[1], p[2]);
  Plotly.newPlot('a2Plot', dc[0], dc[1], dc[2]);
  Plotly.newPlot('b2Plot', dp[0], dp[1], dp[2]);
  Plotly.newPlot('a3Plot', gc[0], gc[1], gc[2]);
  Plotly.newPlot('b3Plot', gp[0], gp[1], gp[2]);
  Plotly.newPlot('a4Plot', vc[0], vc[1], vc[2]);
  Plotly.newPlot('b4Plot', vp[0], vp[1], vp[2]);
  Plotly.newPlot('a5Plot', tc[0], tc[1], tc[2]);
  Plotly.newPlot('b5Plot', tp[0], tp[1], tp[2]);
  Plotly.newPlot('a6Plot', rc[0], rc[1], rc[2]);
  Plotly.newPlot('b6Plot', rp[0], rp[1], rp[2]);
}

function update_Soff() {
  var ct = update_calltPlot();
  var pt = update_puttPlot();
  var dct = update_deltactPlot();
  var dpt = update_deltaptPlot();
  var gct = update_gammactPlot();
  var gpt = update_gammaptPlot();
  var vct = update_vegactPlot();
  var vpt = update_vegaptPlot();
  var tct = update_thetactPlot();
  var tpt = update_thetaptPlot();
  var rct = update_rhoctPlot();
  var rpt = update_rhoptPlot();

  Plotly.newPlot('a1Plot', ct[0], ct[1], ct[2]);
  Plotly.newPlot('b1Plot', pt[0], pt[1], pt[2]);
  Plotly.newPlot('a2Plot', dct[0], dct[1], dct[2]);
  Plotly.newPlot('b2Plot', dpt[0], dpt[1], dpt[2]);
  Plotly.newPlot('a3Plot', gct[0], gct[1], gct[2]);
  Plotly.newPlot('b3Plot', gpt[0], gpt[1], gpt[2]);
  Plotly.newPlot('a4Plot', vct[0], vct[1], vct[2]);
  Plotly.newPlot('b4Plot', vpt[0], vpt[1], vpt[2]);
  Plotly.newPlot('a5Plot', tct[0], tct[1], tct[2]);
  Plotly.newPlot('b5Plot', tpt[0], tpt[1], tpt[2]);
  Plotly.newPlot('a6Plot', rct[0], rct[1], rct[2]);
  Plotly.newPlot('b6Plot', rpt[0], rpt[1], rpt[2]);
}

function update_Poff() {
  var c = update_callPlot();
  var ct = update_calltPlot();
  var dc = update_deltacPlot();
  var dct = update_deltactPlot();
  var gc = update_gammacPlot();
  var gct = update_gammactPlot();
  var vc = update_vegacPlot();
  var vct = update_vegactPlot();
  var tc = update_thetacPlot();
  var tct = update_thetactPlot();
  var rc = update_rhocPlot();
  var rct = update_rhoctPlot();

  Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
  Plotly.newPlot('b1Plot', ct[0], ct[1], ct[2]);
  Plotly.newPlot('a2Plot', dc[0], dc[1], dc[2]);
  Plotly.newPlot('b2Plot', dct[0], dct[1], dct[2]);
  Plotly.newPlot('a3Plot', gc[0], gc[1], gc[2]);
  Plotly.newPlot('b3Plot', gct[0], gct[1], gct[2]);
  Plotly.newPlot('a4Plot', vc[0], vc[1], vc[2]);
  Plotly.newPlot('b4Plot', vct[0], vct[1], vct[2]);
  Plotly.newPlot('a5Plot', tc[0], tc[1], tc[2]);
  Plotly.newPlot('b5Plot', tct[0], tct[1], tct[2]);
  Plotly.newPlot('a6Plot', rc[0], rc[1], rc[2]);
  Plotly.newPlot('b6Plot', rct[0], rct[1], rct[2]);
}

function update_Coff() {
  var p = update_putPlot();
  var pt = update_puttPlot();
  var dp = update_deltapPlot();
  var dpt = update_deltaptPlot();
  var gp = update_gammapPlot();
  var gpt = update_gammaptPlot();
  var vp = update_vegapPlot();
  var vpt = update_vegaptPlot();
  var tp = update_thetapPlot();
  var tpt = update_thetaptPlot();
  var rp = update_rhopPlot();
  var rpt = update_rhoptPlot();

  Plotly.newPlot('a1Plot', p[0], p[1], p[2]);
  Plotly.newPlot('b1Plot', pt[0], pt[1], pt[2]);
  Plotly.newPlot('a2Plot', dp[0], dp[1], dp[2]);
  Plotly.newPlot('b2Plot', dpt[0], dpt[1], dpt[2]);
  Plotly.newPlot('a3Plot', gp[0], gp[1], gp[2]);
  Plotly.newPlot('b3Plot', gpt[0], gpt[1], gpt[2]);
  Plotly.newPlot('a4Plot', vp[0], vp[1], vp[2]);
  Plotly.newPlot('b4Plot', vpt[0], vpt[1], vpt[2]);
  Plotly.newPlot('a5Plot', tp[0], tp[1], tp[2]);
  Plotly.newPlot('b5Plot', tpt[0], tpt[1], tpt[2]);
  Plotly.newPlot('a6Plot', rp[0], rp[1], rp[2]);
  Plotly.newPlot('b6Plot', rpt[0], rpt[1], rpt[2]);
}

function update_ALL() {
  var c = update_callPlot();
  var p = update_putPlot();
  var dc = update_deltacPlot();
  var dp = update_deltapPlot();
  var gc = update_gammacPlot();
  var gp = update_gammapPlot();
  var vc = update_vegacPlot();
  var vp = update_vegapPlot();
  var tc = update_thetacPlot();
  var tp = update_thetapPlot();
  var rc = update_rhocPlot();
  var rp = update_rhopPlot();
  var ct = update_calltPlot();
  var pt = update_puttPlot();
  var dct = update_deltactPlot();
  var dpt = update_deltaptPlot();
  var gct = update_gammactPlot();
  var gpt = update_gammaptPlot();
  var vct = update_vegactPlot();
  var vpt = update_vegaptPlot();
  var tct = update_thetactPlot();
  var tpt = update_thetaptPlot();
  var rct = update_rhoctPlot();
  var rpt = update_rhoptPlot();

  Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
  Plotly.newPlot('b1Plot', p[0], p[1]), p[2];
  Plotly.newPlot('a2Plot', dc[0], dc[1], dc[2]);
  Plotly.newPlot('b2Plot', dp[0], dp[1], dp[2]);
  Plotly.newPlot('a3Plot', gc[0], gc[1], gc[2]);
  Plotly.newPlot('b3Plot', gp[0], gp[1], gp[2]);
  Plotly.newPlot('a4Plot', vc[0], vc[1], vc[2]);
  Plotly.newPlot('b4Plot', vp[0], vp[1], vp[2]);
  Plotly.newPlot('a5Plot', tc[0], tc[1], tc[2]);
  Plotly.newPlot('b5Plot', tp[0], tp[1], tp[2]);
  Plotly.newPlot('a6Plot', rc[0], rc[1], rc[2]);
  Plotly.newPlot('b6Plot', rp[0], rp[1], rp[2]);
  Plotly.newPlot('a7Plot', ct[0], ct[1], ct[2]);
  Plotly.newPlot('b7Plot', pt[0], pt[1], pt[2]);
  Plotly.newPlot('a8Plot', dct[0], dct[1], dct[2]);
  Plotly.newPlot('b8Plot', dpt[0], dpt[1], dpt[2]);
  Plotly.newPlot('a9Plot', gct[0], gct[1], gct[2]);
  Plotly.newPlot('b9Plot', gpt[0], gpt[1], gpt[2]);
  Plotly.newPlot('a10Plot', vct[0], vct[1], vct[2]);
  Plotly.newPlot('b10Plot', vpt[0], vpt[1], vpt[2]);
  Plotly.newPlot('a11Plot', tct[0], tct[1], tct[2]);
  Plotly.newPlot('b11Plot', tpt[0], tpt[1], tpt[2]);
  Plotly.newPlot('a12Plot', rct[0], rct[1], rct[2]);
  Plotly.newPlot('b12Plot', rpt[0], rpt[1], rpt[2]);
}

// Update the current slider value (each time you drag the slider handle)
r_slider.oninput = function() {
  r_output.innerHTML = (this.value * 100).toFixed(1);
  switch(cases) {
    case 0:
      update_ALL();
      break;
    case 1:
      update_Toff();
      break;
    case 2:
      update_Soff();
      break;
    case 3:
      update_Poff();
      break;
    case 4:
      update_Coff();
  }
}

// Update the current slider value (each time you drag the slider handle)
q_slider.oninput = function() {
  q_output.innerHTML = (this.value * 100).toFixed(1);
  switch(cases) {
    case 0:
      update_ALL();
      break;
    case 1:
      update_Toff();
      break;
    case 2:
      update_Soff();
      break;
    case 3:
      update_Poff();
      break;
    case 4:
      update_Coff();
  }
}

// Update the current slider value (each time you drag the slider handle)
sigma_slider.oninput = function() {
  sigma_output.innerHTML = this.value;
  switch(cases) {
    case 0:
      update_ALL();
      break;
    case 1:
      update_Toff();
      break;
    case 2:
      update_Soff();
      break;
    case 3:
      update_Poff();
      break;
    case 4:
      update_Coff();
  }
}

// Update the current slider value (each time you drag the slider handle)
t_slider.oninput = function() {
  t_output.innerHTML = this.value;
  switch(cases) {
    case 0:
      update_ALL();
      break;
    case 1:
      update_Toff();
      break;
    case 2:
      update_Soff();
      break;
    case 3:
      update_Poff();
      break;
    case 4:
      update_Coff();
  }
}

// Update the current slider value (each time you drag the slider handle)
K_slider.oninput = function() {
  K_output.innerHTML = this.value;
  switch(cases) {
    case 0:
      update_ALL();
      break;
    case 1:
      update_Toff();
      break;
    case 2:
      update_Soff();
      break;
    case 3:
      update_Poff();
      break;
    case 4:
      update_Coff();
  }
}

// Update the current slider value (each time you drag the slider handle)
S0_slider.oninput = function() {
  S0_output.innerHTML = this.value;
  switch(cases) {
    case 0:
      update_ALL();
      break;
    case 1:
      update_Toff();
      break;
    case 2:
      update_Soff();
      break;
    case 3:
      update_Poff();
      break;
    case 4:
      update_Coff();
  }
}

function showhide(obj,item){
  for (var i = 0; i < item.length; i++){
    document.getElementById(item[i]).style.display = obj.checked?"block":"none";
  }
}

function hide(item) {
  for (var i = 0; i < item.length; i++){
    document.getElementById(item[i]).style.display = "none";
  }
}

function show(item) {
  for (var i = 0; i < item.length; i++){
    document.getElementById(item[i]).style.display = "block";
  }
}

var plots = ['a7Plot', 'b7Plot', 'a8Plot', 'b8Plot', 'a9Plot', 'b9Plot', 'a10Plot', 'b10Plot', 'a11Plot', 'b11Plot', 'a12Plot', 'b12Plot'];

var D_check = document.getElementById("D_checkbox");
var G_check = document.getElementById("G_checkbox");
var V_check = document.getElementById("V_checkbox");
var T_check = document.getElementById("T_checkbox");
var R_check = document.getElementById("R_checkbox");
var L_check = document.getElementById("L_checkbox");
var Q_check = document.getElementById("Q_checkbox");

D_check.onchange = function() {
  switch(cases) {
    case 0:
      var p = ['a2Plot', 'b2Plot', 'a8Plot', 'b8Plot'];
      showhide(this, p);
      break;
    case 1:
      var p = ['a2Plot', 'b2Plot'];
      showhide(this, p);
      break;
    case 2:
      var p = ['a2Plot', 'b2Plot'];
      showhide(this, p);
      break;
    case 3:
      var p = ['a2Plot', 'b2Plot'];
      showhide(this, p);
      break;
    case 4:
      var p = ['a2Plot', 'b2Plot'];
      showhide(this, p);
  }
}

G_check.onchange = function() {
  switch(cases) {
    case 0:
      var p = ['a3Plot', 'b3Plot', 'a9Plot', 'b9Plot'];
      showhide(this, p);
      break;
    case 1:
      var p = ['a3Plot', 'b3Plot'];
      showhide(this, p);
      break;
    case 2:
      var p = ['a3Plot', 'b3Plot'];
      showhide(this, p);
      break;
    case 3:
      var p = ['a3Plot', 'b3Plot'];
      showhide(this, p);
      break;
    case 4:
      var p = ['a3Plot', 'b3Plot'];
      showhide(this, p);
  }
}

V_check.onchange = function() {
  switch(cases) {
    case 0:
      var p = ['a4Plot', 'b4Plot', 'a10Plot', 'b10Plot'];
      showhide(this, p);
      break;
    case 1:
      var p = ['a4Plot', 'b4Plot'];
      showhide(this, p);
      break;
    case 2:
      var p = ['a4Plot', 'b4Plot'];
      showhide(this, p);
      break;
    case 3:
      var p = ['a4Plot', 'b4Plot'];
      showhide(this, p);
      break;
    case 4:
      var p = ['a4Plot', 'b4Plot'];
      showhide(this, p);
  }
}

T_check.onchange = function() {
  switch(cases) {
    case 0:
      var p = ['a5Plot', 'b5Plot', 'a11Plot', 'b11Plot'];
      showhide(this, p);
      break;
    case 1:
      var p = ['a5Plot', 'b5Plot'];
      showhide(this, p);
      break;
    case 2:
      var p = ['a5Plot', 'b5Plot'];
      showhide(this, p);
      break;
    case 3:
      var p = ['a5Plot', 'b5Plot'];
      showhide(this, p);
      break;
    case 4:
      var p = ['a5Plot', 'b5Plot'];
      showhide(this, p);
  }
}

R_check.onchange = function() {
  switch(cases) {
    case 0:
      var p = ['a6Plot', 'b6Plot', 'a12Plot', 'b12Plot'];
      showhide(this, p);
      break;
    case 1:
      var p = ['a6Plot', 'b6Plot'];
      showhide(this, p);
      break;
    case 2:
      var p = ['a6Plot', 'b6Plot'];
      showhide(this, p);
      break;
    case 3:
      var p = ['a6Plot', 'b6Plot'];
      showhide(this, p);
      break;
    case 4:
      var p = ['a6Plot', 'b6Plot'];
      showhide(this, p);
  }
}

var option0 = document.getElementById("option0");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");

option0.onchange = function() {
  cases = 0;
  update_ALL();
  show(['a7Plot', 'b7Plot']);
  showhide(D_check, ['a8Plot', 'b8Plot']);
  showhide(G_check, ['a9Plot', 'b9Plot']);
  showhide(V_check, ['a10Plot', 'b10Plot']);
  showhide(T_check, ['a11Plot', 'b11Plot']);
  showhide(R_check, ['a12Plot', 'b12Plot']);
  document.getElementById('C_option').innerHTML = 'C'.italics();
  document.getElementById('P_option').innerHTML = 'P'.italics();
  document.getElementById('S_option').innerHTML = 'S'.italics()+'0'.sub();
  document.getElementById('T_option').innerHTML = 'T'.italics();
  document.getElementById('All_option').innerHTML = 'All on';
}

option1.onchange = function() {
  cases = 1;
  update_Toff();
  hide(plots);
  document.getElementById('C_option').innerHTML = 'C'.italics();
  document.getElementById('P_option').innerHTML = 'P'.italics();
  document.getElementById('S_option').innerHTML = 'S'.italics()+'0'.sub();
  document.getElementById('T_option').innerHTML = 'T'.italics()+' off';
  document.getElementById('All_option').innerHTML = 'All on';
}

option2.onchange = function() {
  cases = 2;
  update_Soff();
  hide(plots);
  document.getElementById('C_option').innerHTML = 'C'.italics();
  document.getElementById('P_option').innerHTML = 'P'.italics();
  document.getElementById('S_option').innerHTML = 'S'.italics()+'0'.sub()+' off';
  document.getElementById('T_option').innerHTML = 'T'.italics();
  document.getElementById('All_option').innerHTML = 'All on';
}

option3.onchange = function() {
  cases = 3;
  update_Poff();
  hide(plots);
  document.getElementById('C_option').innerHTML = 'C'.italics();
  document.getElementById('P_option').innerHTML = 'P'.italics()+' off';
  document.getElementById('S_option').innerHTML = 'S'.italics()+'0'.sub();
  document.getElementById('T_option').innerHTML = 'T'.italics();
  document.getElementById('All_option').innerHTML = 'All on';
}

option4.onchange = function() {
  cases = 4;
  update_Coff();
  hide(plots);
  document.getElementById('C_option').innerHTML = 'C'.italics()+' off';
  document.getElementById('P_option').innerHTML = 'P'.italics();
  document.getElementById('S_option').innerHTML = 'S'.italics()+'0'.sub();
  document.getElementById('T_option').innerHTML = 'T'.italics();
  document.getElementById('All_option').innerHTML = 'All on';
}

L_check.onchange = function() {
  switch(cases) {
    case 0:
      var c = update_callPlot();
      var p = update_putPlot();      
      Plotly.newPlot('a1Plot', c[0], c[1], c[2]);      
      Plotly.newPlot('b1Plot', p[0], p[1], p[2]);
      break;
    case 1:
      var c = update_callPlot();
      var p = update_putPlot();      
      Plotly.newPlot('a1Plot', c[0], c[1], c[2]);    
      Plotly.newPlot('b1Plot', p[0], p[1], p[2]);
      break;
    case 3:
      var c = update_callPlot();
      Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
      break;
    case 4:
      var p = update_putPlot();
      Plotly.newPlot('a1Plot', p[0], p[1], p[2]);      
  }
}

Q_check.onchange = function() {
  switch(cases) {
    case 0:
      var c = update_callPlot();
      var p = update_putPlot();
      Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
      Plotly.newPlot('b1Plot', p[0], p[1], p[2]);
      break;
    case 1:
      var c = update_callPlot();
      var p = update_putPlot();
      Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
      Plotly.newPlot('b1Plot', p[0], p[1], p[2]);
      break;
    case 3:
      var c = update_callPlot();
      Plotly.newPlot('a1Plot', c[0], c[1], c[2]);
      break;
    case 4:
      var p = update_putPlot();
      Plotly.newPlot('a1Plot', p[0], p[1], p[2]);      
  }
}

var cases = 1;
update_Toff();
hide(plots);
hide(['a4Plot', 'b4Plot', 'a5Plot', 'b5Plot', 'a6Plot', 'b6Plot']);
document.getElementById('C_option').innerHTML = 'C'.italics();
document.getElementById('P_option').innerHTML = 'P'.italics();
document.getElementById('S_option').innerHTML = 'S'.italics()+'0'.sub();
document.getElementById('T_option').innerHTML = 'T'.italics()+' off';
document.getElementById('All_option').innerHTML = 'All on';

$('#extra011').on('shown.bs.modal', function () {
  var w = update_callPlot();
  Plotly.newPlot('z011Plot', w[0], w[3], w[4]);
})

$('#extra012').on('shown.bs.modal', function () {
  var w = update_callPlot();
  Plotly.newPlot('z012Plot', w[0], w[3], w[5]);
})

$('#extra021').on('shown.bs.modal', function () {
  var w = update_putPlot();
  Plotly.newPlot('z021Plot', w[0], w[3], w[4]);
})

$('#extra022').on('shown.bs.modal', function () {
  var w = update_putPlot();
  Plotly.newPlot('z022Plot', w[0], w[3], w[5]);
})

$('#extra031').on('shown.bs.modal', function () {
  var w = update_deltacPlot();
  Plotly.newPlot('z031Plot', w[0], w[3], w[4]);
})

$('#extra032').on('shown.bs.modal', function () {
  var w = update_deltacPlot();
  Plotly.newPlot('z032Plot', w[0], w[3], w[5]);
})

$('#extra041').on('shown.bs.modal', function () {
  var w = update_deltapPlot();
  Plotly.newPlot('z041Plot', w[0], w[3], w[4]);
})

$('#extra042').on('shown.bs.modal', function () {
  var w = update_deltapPlot();
  Plotly.newPlot('z042Plot', w[0], w[3], w[5]);
})

$('#extra051').on('shown.bs.modal', function () {
  var w = update_gammacPlot();
  Plotly.newPlot('z051Plot', w[0], w[3], w[4]);
})

$('#extra052').on('shown.bs.modal', function () {
  var w = update_gammacPlot();
  Plotly.newPlot('z052Plot', w[0], w[3], w[5]);
})

$('#extra061').on('shown.bs.modal', function () {
  var w = update_gammapPlot();
  Plotly.newPlot('z061Plot', w[0], w[3], w[4]);
})

$('#extra062').on('shown.bs.modal', function () {
  var w = update_gammapPlot();
  Plotly.newPlot('z062Plot', w[0], w[3], w[5]);
})

$('#extra071').on('shown.bs.modal', function () {
  var w = update_vegacPlot();
  Plotly.newPlot('z071Plot', w[0], w[3], w[4]);
})

$('#extra072').on('shown.bs.modal', function () {
  var w = update_vegacPlot();
  Plotly.newPlot('z072Plot', w[0], w[3], w[5]);
})

$('#extra081').on('shown.bs.modal', function () {
  var w = update_vegapPlot();
  Plotly.newPlot('z081Plot', w[0], w[3], w[4]);
})

$('#extra082').on('shown.bs.modal', function () {
  var w = update_vegapPlot();
  Plotly.newPlot('z082Plot', w[0], w[3], w[5]);
})

$('#extra091').on('shown.bs.modal', function () {
  var w = update_thetacPlot();
  Plotly.newPlot('z091Plot', w[0], w[3], w[4]);
})

$('#extra092').on('shown.bs.modal', function () {
  var w = update_thetacPlot();
  Plotly.newPlot('z092Plot', w[0], w[3], w[5]);
})

$('#extra101').on('shown.bs.modal', function () {
  var w = update_thetapPlot();
  Plotly.newPlot('z101Plot', w[0], w[3], w[4]);
})

$('#extra102').on('shown.bs.modal', function () {
  var w = update_thetapPlot();
  Plotly.newPlot('z102Plot', w[0], w[3], w[5]);
})

$('#extra111').on('shown.bs.modal', function () {
  var w = update_rhocPlot();
  Plotly.newPlot('z111Plot', w[0], w[3], w[4]);
})

$('#extra112').on('shown.bs.modal', function () {
  var w = update_rhocPlot();
  Plotly.newPlot('z112Plot', w[0], w[3], w[5]);
})

$('#extra121').on('shown.bs.modal', function () {
  var w = update_rhopPlot();
  Plotly.newPlot('z121Plot', w[0], w[3], w[4]);
})

$('#extra122').on('shown.bs.modal', function () {
  var w = update_rhopPlot();
  Plotly.newPlot('z122Plot', w[0], w[3], w[5]);
})

$('#extra131').on('shown.bs.modal', function () {
  var w = update_calltPlot();
  Plotly.newPlot('z131Plot', w[0], w[3], w[4]);
})

$('#extra132').on('shown.bs.modal', function () {
  var w = update_calltPlot();
  Plotly.newPlot('z132Plot', w[0], w[3], w[5]);
})

$('#extra141').on('shown.bs.modal', function () {
  var w = update_puttPlot();
  Plotly.newPlot('z141Plot', w[0], w[3], w[4]);
})

$('#extra142').on('shown.bs.modal', function () {
  var w = update_puttPlot();
  Plotly.newPlot('z142Plot', w[0], w[3], w[5]);
})

$('#extra151').on('shown.bs.modal', function () {
  var w = update_deltactPlot();
  Plotly.newPlot('z151Plot', w[0], w[3], w[4]);
})

$('#extra152').on('shown.bs.modal', function () {
  var w = update_deltactPlot();
  Plotly.newPlot('z152Plot', w[0], w[3], w[5]);
})

$('#extra161').on('shown.bs.modal', function () {
  var w = update_deltaptPlot();
  Plotly.newPlot('z161Plot', w[0], w[3], w[4]);
})

$('#extra162').on('shown.bs.modal', function () {
  var w = update_deltaptPlot();
  Plotly.newPlot('z162Plot', w[0], w[3], w[5]);
})

$('#extra171').on('shown.bs.modal', function () {
  var w = update_gammactPlot();
  Plotly.newPlot('z171Plot', w[0], w[3], w[4]);
})

$('#extra172').on('shown.bs.modal', function () {
  var w = update_gammactPlot();
  Plotly.newPlot('z172Plot', w[0], w[3], w[5]);
})

$('#extra181').on('shown.bs.modal', function () {
  var w = update_gammaptPlot();
  Plotly.newPlot('z181Plot', w[0], w[3], w[4]);
})

$('#extra182').on('shown.bs.modal', function () {
  var w = update_gammaptPlot();
  Plotly.newPlot('z182Plot', w[0], w[3], w[5]);
})

$('#extra191').on('shown.bs.modal', function () {
  var w = update_vegactPlot();
  Plotly.newPlot('z191Plot', w[0], w[3], w[4]);
})

$('#extra192').on('shown.bs.modal', function () {
  var w = update_vegactPlot();
  Plotly.newPlot('z192Plot', w[0], w[3], w[5]);
})

$('#extra201').on('shown.bs.modal', function () {
  var w = update_vegaptPlot();
  Plotly.newPlot('z201Plot', w[0], w[3], w[4]);
})

$('#extra202').on('shown.bs.modal', function () {
  var w = update_vegaptPlot();
  Plotly.newPlot('z202Plot', w[0], w[3], w[5]);
})

$('#extra211').on('shown.bs.modal', function () {
  var w = update_thetactPlot();
  Plotly.newPlot('z211Plot', w[0], w[3], w[4]);
})

$('#extra212').on('shown.bs.modal', function () {
  var w = update_thetactPlot();
  Plotly.newPlot('z212Plot', w[0], w[3], w[5]);
})

$('#extra221').on('shown.bs.modal', function () {
  var w = update_thetaptPlot();
  Plotly.newPlot('z221Plot', w[0], w[3], w[4]);
})

$('#extra222').on('shown.bs.modal', function () {
  var w = update_thetaptPlot();
  Plotly.newPlot('z222Plot', w[0], w[3], w[5]);
})

$('#extra231').on('shown.bs.modal', function () {
  var w = update_rhoctPlot();
  Plotly.newPlot('z231Plot', w[0], w[3], w[4]);
})

$('#extra232').on('shown.bs.modal', function () {
  var w = update_rhoctPlot();
  Plotly.newPlot('z232Plot', w[0], w[3], w[5]);
})

$('#extra241').on('shown.bs.modal', function () {
  var w = update_rhoptPlot();
  Plotly.newPlot('z241Plot', w[0], w[3], w[4]);
})

$('#extra242').on('shown.bs.modal', function () {
  var w = update_rhoptPlot();
  Plotly.newPlot('z242Plot', w[0], w[3], w[5]);
})





