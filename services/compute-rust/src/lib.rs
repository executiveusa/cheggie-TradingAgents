pub fn rsi(values: &[f64], period: usize) -> Vec<f64> {
    if values.len() < period + 1 { return vec![]; }
    let mut out = vec![50.0; values.len()];
    for i in period..values.len() {
        let mut gains = 0.0;
        let mut losses = 0.0;
        for j in (i - period + 1)..=i {
            let delta = values[j] - values[j - 1];
            if delta >= 0.0 { gains += delta; } else { losses -= delta; }
        }
        let rs = if losses == 0.0 { 100.0 } else { gains / losses };
        out[i] = 100.0 - (100.0 / (1.0 + rs));
    }
    out
}
