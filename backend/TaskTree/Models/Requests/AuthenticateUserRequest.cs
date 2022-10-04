using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace TaskTree.Models.Requests
{
    public class AuthenticateUserRequest
    {
        [Required]
        [FromHeader]
        public string? Username { get; set; }
        [Required]
        [FromHeader]
        public string? Password { get; set; }
    }
}
