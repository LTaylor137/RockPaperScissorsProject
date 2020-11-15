export interface UsernameRequest {
    Username: string;
    TurnsPlayed: number;
}

export interface LeaderboardResponse {
    username: string;
    turnsPlayed: number;
    wins: number;
    winRatio: number; 
}
