mod math {
    pub fn abs(v: i64) -> i64 { v.abs() }
    pub fn min(a: i64, b: i64) -> i64 { a.min(b) }
    pub fn max(a: i64, b: i64) -> i64 { a.max(b) }
    pub fn pow(base: i64, exponent: i64) -> i64 { base.pow(exponent as u32) }
    pub fn sign(v: i64) -> i64 { v.signum() }
    pub fn sqrt(v: i64) -> i64 { (v as f64).sqrt() as i64 }
    pub fn floor(v: i64) -> i64 { v }
    pub fn ceil(v: i64) -> i64 { v }
    pub fn round(v: i64) -> i64 { v }
}
