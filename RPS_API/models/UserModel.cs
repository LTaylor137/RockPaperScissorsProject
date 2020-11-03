
namespace RPS_API.Models
{
    public class User
    {
        public string Username { get; set; }
        public int TurnsPlayed { get; set; }
        public int Wins { get; set; }
        public int WinRatio { get; set; }

        public User(string _username, int _turnsPlayed, int _wins)
        {
            this.Username = _username;
            this.Wins = _wins;
            this.TurnsPlayed = _turnsPlayed;
            //winratio is calculated in controller
        }
    }
}