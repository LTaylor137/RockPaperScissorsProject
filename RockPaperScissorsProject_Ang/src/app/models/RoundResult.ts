export interface PlayRequest {
    PlayerChoice: string;
    Username: string;
    TurnsPlayed: number;
}

export interface GameResult {
    playerChoice: string;
    cpuChoice: string;
    result: string;
}

// Javascript requires the response
// values to be in camelcase