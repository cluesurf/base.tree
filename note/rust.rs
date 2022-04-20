fn main() {
  // let a: u8 = 255;
  // let b: u8 = 255;
  // let c = a + b;
  // ^^^^^ attempt to compute `u8::MAX + u8::MAX`, which would overflow

  let a: u8 = 255;
  let b: u8 = 255;
  let c = a.checked_add(b);
  println!("x = {}", Some(&c));
}
