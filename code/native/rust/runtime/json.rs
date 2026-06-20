mod json {
    use serde_json::Value;
    pub fn parse(text: String) -> Value { serde_json::from_str(&text).unwrap_or(Value::Null) }
    pub fn stringify(value: Value) -> String { serde_json::to_string(&value).unwrap_or_default() }
    pub fn get_field(value: Value, key: String) -> Value { value.get(&key).cloned().unwrap_or(Value::Null) }
    pub fn get_item(value: Value, index: i64) -> Value { value.get(index as usize).cloned().unwrap_or(Value::Null) }
    pub fn as_number(value: Value) -> f64 { value.as_f64().unwrap_or(0.0) }
    pub fn as_text(value: Value) -> String { value.as_str().map(|s| s.to_string()).unwrap_or_default() }
    pub fn as_boolean(value: Value) -> bool { value.as_bool().unwrap_or(false) }
    pub fn is_null(value: Value) -> bool { value.is_null() }
}
