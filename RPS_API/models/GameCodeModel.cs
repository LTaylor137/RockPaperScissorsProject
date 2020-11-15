using System;

namespace RPS_API.Models
{
    public class GameCodeRequest
    {
        public string GameCode { get; set; }

        public GameCodeRequest()
        {
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