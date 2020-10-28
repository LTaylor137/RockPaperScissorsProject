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


export interface UsernameRequest {
    Username: string;
}

export interface ShowLeaderBoard {
    username: string;
    winRatio: string;
    turnsPlayed: string;
}
 
// Question. Why did this only work  
// when i made variables lowercase?