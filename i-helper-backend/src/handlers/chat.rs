use serde::{Deserialize, Serialize};
use warp::Reply;

#[derive(Deserialize)]
pub struct ChatMessage {
    message: String,
}

#[derive(Serialize)]
pub struct ChatResponse {
    response: String,
}

pub async fn handle_chat(message: ChatMessage) -> Result<impl Reply, warp::Rejection> {
    // TODO: Implement more sophisticated chat logic
    let response = format!("You said: {}", message.message);
    Ok(warp::reply::json(&ChatResponse { response }))
}