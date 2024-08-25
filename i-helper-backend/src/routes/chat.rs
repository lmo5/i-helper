use warp::Filter;
use crate::handlers::chat::handle_chat;

pub fn chat_route() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path("chat")
        .and(warp::post())
        .and(warp::body::json())
        .and_then(handle_chat)
}