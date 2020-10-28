using System;

namespace RPS_API.Models
{
    public class ShowLeaderBoard
    {
        public string Username { get; set; }
        public string WinRatio { get; set; }
        public string TurnsPlayed { get; set; }

        public ShowLeaderBoard(string _username)
        {
            Username = _username;
            WinRatio = CalculateWinRatio();
            TurnsPlayed = CalculateTurnsPlayed();
        }

        // string _username = "Frank";

        public string CalculateWinRatio()
        {
            string _winRatio = "50";
            return _winRatio;
        }

        public string CalculateTurnsPlayed()
        {
            string _turnsPlayed = "8";
            return _turnsPlayed;
        }


    }
}