using System;

namespace RPS_API.Models
{
    public class GameCodeRequest
    {
        public string Username { get; set; }
        public string GameCode { get; set; }
        public string DateTimeStr { get; set; }

        public GameCodeRequest(string _username)
        {
            this.DateTimeStr = CreateDateTimeString();
            Username = _username;
            GameCode = CalculateGameCode();
        }

        public string CreateDateTimeString()
        {
            string DTConvert = DateTime.Now.ToString("yyyyMMddHHmmssms");
            return DTConvert;
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