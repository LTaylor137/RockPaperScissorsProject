
namespace RPS_API.Models
{
    public class PlayRequest
    {
        public string GameCode { get; set; }
        public string Username { get; set; }
        public string PlayerChoice { get; set; }
        public int TurnsPlayed { get; set; }
        public int TurnNumber { get; set; }
        public string GameResult { get; set; }
        public string DateTime { get; set; }
    }
}



