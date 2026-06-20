mod crypto {
    use sha2::{Sha256, Sha512, Digest};
    use hmac::{Hmac, Mac};
    pub fn sha256(input: String) -> String { format!("{:x}", Sha256::digest(input.as_bytes())) }
    pub fn sha512(input: String) -> String { format!("{:x}", Sha512::digest(input.as_bytes())) }
    pub fn md5(input: String) -> String { format!("{:x}", ::md5::Md5::digest(input.as_bytes())) }
    pub fn hmac_sha256(key: String, data: String) -> String {
        let mut mac = Hmac::<Sha256>::new_from_slice(key.as_bytes()).unwrap();
        mac.update(data.as_bytes());
        format!("{:x}", mac.finalize().into_bytes())
    }
    pub fn hmac_sha512(key: String, data: String) -> String {
        let mut mac = Hmac::<Sha512>::new_from_slice(key.as_bytes()).unwrap();
        mac.update(data.as_bytes());
        format!("{:x}", mac.finalize().into_bytes())
    }
    pub fn random_bytes(size: i64) -> String {
        use ::rand::RngCore;
        use ::rand::rngs::OsRng;
        let mut buffer = vec![0u8; size as usize];
        OsRng.fill_bytes(&mut buffer);
        buffer.iter().map(|byte| format!("{:02x}", byte)).collect()
    }
}
