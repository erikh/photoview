use std::path::PathBuf;
use std::str::FromStr;

use include_dir::{include_dir, Dir};
use libvips::VipsApp;
use tide::{http::Mime, Request, Response};

const REACT_APP: Dir = include_dir!("react/build");

#[async_std::main]
async fn main() -> tide::Result<()> {
    let exe = std::env::current_exe().unwrap();

    let path = match std::env::args().nth(1) {
        Some(path) => path,
        None => panic!("Please supply a directory of images to index"),
    };

    let vips = VipsApp::new(exe.to_str().unwrap(), true).unwrap();
    vips.concurrency_set(8);

    env_logger::builder().build();
    let mut app = tide::with_state(State {
        path: PathBuf::from_str(&path).unwrap(),
    });
    tide::log::start();

    app.with(tide::log::LogMiddleware::new());
    app.at("/images/:image").get(image);
    app.at("/*").get(ui);
    app.at("/").get(ui);

    app.listen("0.0.0.0:3000").await?;
    Ok(())
}

#[derive(Debug, Clone)]
pub struct State {
    path: PathBuf,
}

async fn image(req: Request<State>) -> tide::Result {
    let image_fn = req.param("image")?;

    if image_fn.contains("..") {
        return Ok(Response::builder(500).build());
    }

    let mut imgpath = req.state().clone().path;
    imgpath.push(image_fn);

    let image = std::fs::read(imgpath)?;

    Ok(Response::builder(200)
        .content_type(
            Mime::from_extension(
                std::path::PathBuf::from_str(image_fn)?
                    .extension()
                    .unwrap_or_default()
                    .to_string_lossy(),
            )
            .unwrap_or(Mime::from_str("text/plain")?),
        )
        .body(image)
        .build())
}

async fn ui(req: Request<State>) -> tide::Result {
    let mut path = req.url().path().to_string();

    if path.contains("..") {
        return Ok(Response::builder(500).build());
    }

    // NOTE: all react routes must be reflected here!!!
    if path == "/" || path.starts_with("/imageview") {
        path = "/index.html".to_string()
    }

    if path.len() < 2 {
        return Ok(Response::builder(500).build());
    }

    path = path[1..].to_string();

    let file = match REACT_APP.get_file(path.clone()) {
        Some(file) => file,
        None => return Ok(Response::builder(500).build()),
    };

    Ok(Response::builder(200)
        .content_type(
            Mime::from_extension(
                std::path::PathBuf::from_str(path.as_str())?
                    .extension()
                    .unwrap_or_default()
                    .to_string_lossy(),
            )
            .unwrap_or(Mime::from_str("text/plain")?),
        )
        .body(file.contents())
        .build())
}
