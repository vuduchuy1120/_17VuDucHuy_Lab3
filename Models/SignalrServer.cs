using Microsoft.AspNetCore.SignalR;

namespace _17VuDucHuy_Lab3.Models
{
    public class SignalrServer :Hub
    {
        Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
