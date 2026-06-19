mod io {
    pub fn file_read(path: String) -> String {
        std::fs::read_to_string(&path).unwrap_or_default()
    }
    pub fn file_write(path: String, data: String) {
        let _ = std::fs::write(&path, data);
    }
    pub fn file_append(path: String, data: String) {
        use std::io::Write;
        if let Ok(mut f) = std::fs::OpenOptions::new().create(true).append(true).open(&path) {
            let _ = f.write_all(data.as_bytes());
        }
    }
    pub fn file_remove(path: String) {
        let _ = std::fs::remove_file(&path);
    }
    pub fn file_copy(from: String, to: String) {
        let _ = std::fs::copy(&from, &to);
    }
    pub fn file_move(from: String, to: String) {
        let _ = std::fs::rename(&from, &to);
    }
    pub fn file_exists(path: String) -> bool {
        std::path::Path::new(&path).exists()
    }
}
