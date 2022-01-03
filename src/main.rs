use libvips::VipsApp;

fn main() {
    let exe = std::env::current_exe().unwrap();
    let app = VipsApp::new(exe.to_str().unwrap(), true).unwrap();
    app.concurrency_set(8);
}
