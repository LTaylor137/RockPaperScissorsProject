using System;

namespace RPS_API.Models
{
    public class PlayRequest
    {
        public string Username { get; set; }
        public string PlayerChoice { get; set; }
        public int TurnsPlayed { get; set; }
    }

}



