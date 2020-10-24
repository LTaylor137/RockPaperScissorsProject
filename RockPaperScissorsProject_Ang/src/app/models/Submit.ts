export interface PlayRequest {
    PlayerChoice: string;
}

export interface GameResult {
    playerChoice: string;
    cpuChoice: string;
    result: string;
}

//these are set exactly as in Api Requirements.

// Endpoint
// [Post] GetResult - Receives a PlayRequest.  
// Evaluates the winner and sends back a GameResult.

 