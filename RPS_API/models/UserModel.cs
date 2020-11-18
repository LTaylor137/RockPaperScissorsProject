
namespace RPS_API.Models
{
    public class User
    {
        public string Username { get; set; }
        public int TurnsPlayed { get; set; }
        public int Wins { get; set; }
        public int WinRatio { get; set; }

        public User(string _username, int _turnsPlayed, int _wins, int _winRatio)
        {
            this.Username = _username;
            this.Wins = _wins;
            this.TurnsPlayed = _turnsPlayed;
            this.WinRatio = _winRatio;
        }
    }
}