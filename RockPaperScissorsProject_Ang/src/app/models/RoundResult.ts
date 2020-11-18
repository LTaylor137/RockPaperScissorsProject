export interface PlayRequest {
    GameCode: string;
    TurnNumber: number;
    PlayerChoice: string;
    Username: string;
    TurnsPlayed: number;
    GameResult: string;
}

export interface RoundResult {
    playerChoice: string;
    cpuChoice: string;
    roundResult: string;
}

// Javascript requires the response
// values to be in camelcase