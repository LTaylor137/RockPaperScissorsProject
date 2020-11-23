using System;

namespace RPS_API.Models
{
    public class GameCodeRequest
    {
        public string Username { get; set; }
        public string GameCode { get; set; }
        public string DateTime { get; set; }

        public GameCodeRequest(string _dateTime, string _username)
        {
            DateTime = _dateTime;
            Username = _username;
            GameCode = CalculateGameCode();
        }

        public string CalculateGameCode()
        {

            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var stringChars = new char[6];
            Random random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            string GameCode = new String(stringChars);

            return GameCode;
        }

    }
}