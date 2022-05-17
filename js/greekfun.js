function linspace(a, b, n) {
    if (n < 2) {
        return n === 1 ? [a] : []
    }
    var i, ret = Array(n)
    n--
    for (i = n; i >= 0; i--) {
      ret[i] = (i * b + (n - i) * a) / n
    }
    return ret
}

function range(start, step, end) {
    var x = [];
    while (step > 0 ? end >= start : end <= start) {
        x.push(start);
        start += step;
    }
    return x;
}

function toDecimal(x, y) {
    var z = [];
    for (var i = 0; i < x.length; i++){
        z.push(x[i]/Math.pow(10, y));
    }
    return z;
}

function factorial(k) {
    if (k < 2) {
        return 1;
    }
    else {
        return k * factorial(k - 1);
    }
}

function N(x, mean = 0, std = 1) {
    var x = (x - mean) / std;
    var t = 1 / (1 + .2315419 * Math.abs(x));
    var d =.3989423 * Math.exp( -x * x / 2);
    var prob = d * t * (.3193815 + t * ( -.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if ( x > 0 ) {prob = 1 - prob;}
    return prob;
}

function normalPDF(x, mu = 0, sigma = 1) {
    if (sigma == 0) {
        return 0;
    }
    else {
        return Math.exp(-1 * Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2))) / (sigma * Math.sqrt(2 * Math.PI));
    }
}

function callBS(S, X, r, q, sigma, t) {
    
    var sqt = Math.sqrt(t);
    var d1 = (Math.log(S / X) + (r - q + Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);
    var d2 = (Math.log(S / X) + (r - q - Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);
    var Nd1 = N(d1).toFixed(8);
    var Nd2 = N(d2).toFixed(8);
    if (t == 0) {
        return Math.max((S - X), 0);
    }
    else {
        return (S * Math.exp(-q * t) * Nd1 - X * Math.exp(-r * t) * Nd2);
    }
}

function payoff_call(S_T, X) {

    return Math.max(0, S_T - X)
}

function putBS(S, X, r, q, sigma, t) {

    var sqt = Math.sqrt(t);
    var d1 = (Math.log(S / X) + (r - q + Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);
    var d2 = (Math.log(S / X) + (r - q - Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);
    var nNd1 = N(-d1).toFixed(8);
    var nNd2 = N(-d2).toFixed(8);

    if (t == 0) {
        return Math.max((X - S), 0);
    }
    else {
        return (-S * Math.exp(-q * t) * nNd1 + X * Math.exp(-r * t) * nNd2);
    }
}

function payoff_put(S_T, X) {

    return Math.max(0, X - S_T)
}

function deltaBS(S, X, r, q, sigma, t, category = 'call') {

    var sqt = Math.sqrt(t);
    var d1 = (Math.log(S / X) + (r - q) * t) / (sigma * sqt) + 0.5 * (sigma * sqt);

    if (category == 'call'){
        return Math.exp(-q * t) * N(d1);
    }
    else if (category=='put'){
        return -Math.exp(-q * t) * N(-d1);
    }
    else{
        return null;
    }
}

function gammaBS(S, X, r, q, sigma, t) {

    var sqt = Math.sqrt(t);
    var d1 = (Math.log(S / X) + (r - q + Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);

    return (Math.exp(-q * t) * normalPDF(d1) / (S * sigma * sqt));
}

function vegaBS(S, X, r, q, sigma, t) {

    var sqt = Math.sqrt(t);
    var d1 = (Math.log(S / X) + (r - q + Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);
    
    return (S * Math.exp(-q * t) * sqt * normalPDF(d1));
}

function thetaBS(S, X, r, q, sigma, t, category = 'call'){

    var sqt = Math.sqrt(t);
    var d1 = (Math.log(S / X) + (r - q + Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);
    var d2 = (Math.log(S / X) + (r - q - Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);

    if (category == 'call'){
        return ((-S * sigma * Math.exp(-q * t) * normalPDF(d1)) / (2 * sqt) + q * S * Math.exp(-q*t) * N(d1) - r * X * Math.exp(-r * t) * N(d2));
    }
    else if (category == 'put'){
        return ((-S * sigma * Math.exp(-q * t) * normalPDF(d1)) / (2 * sqt) - q * S * Math.exp(-q*t) * N(-d1) + r * X * Math.exp(-r * t) * N(-d2));
    }
    else{
        return null;
    }
}

function rhoBS(S, X, r, q, sigma, t, category = 'call'){

    var sqt = Math.sqrt(t);
    var d2 = (Math.log(S / X) + (r - q - Math.pow(sigma, 2) / 2) * t) / (sigma * sqt);

    if (category == 'call'){
        return  X * t * Math.exp(-r * t) * N(d2);
    }
    else if (category == 'put'){
        return -X * t * Math.exp(-r * t) * N(-d2);
    }
    else{
        return null;
    }
}

function taylor_linear(S, X, r, q, sigma, t, category='call'){
    var delta = deltaBS(S, X, r, q, sigma, t, category = category);

    if (category == 'call'){
        var price = callBS(S, X, r, q, sigma, t);
    }
    else if (category == 'put'){
        var price = putBS(S, X, r, q, sigma, t);
    }
    else{
        return null;
    }

    var a = delta;
    var b = price - delta * S;

    return [a, b];
}

function taylor_parabola(S, X, r, q, sigma, t, category='call'){
    var delta = deltaBS(S, X, r, q, sigma, t, category = category);
    var gamma = gammaBS(S, X, r, q, sigma, t);

    if (category == 'call'){
        var price = callBS(S, X, r, q, sigma, t);
    }
    else if (category == 'put'){
        var price = putBS(S, X, r, q, sigma, t);
    }
    else{
        return null;
    }

    var a = 0.5 * gamma;
    var b = delta - S * gamma;
    var d = price - a * S * S - b * S;
    
    return [a, b, d];
}