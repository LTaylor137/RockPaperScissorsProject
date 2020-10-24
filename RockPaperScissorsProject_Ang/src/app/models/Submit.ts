export interface PlayRequest {
    PlayerChoice: string;
}

export interface GameResult {
    PlayerChoice: string;
    CpuChoice: string;
    Result: string;
}

//these are set exactly as in Api Requirements.

// Endpoint
// [Post] GetResult - Receives a PlayRequest.  
// Evaluates the winner and sends back a GameResult.

 