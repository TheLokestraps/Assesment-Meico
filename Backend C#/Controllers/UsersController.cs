using Microsoft.AspNetCore.Mvc;
using Assesment.Models;
using System.Text.Json;
using System.Text.Json.Nodes;


namespace Assesment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        public static List<User> allUsers = new List<User>();

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }
        [HttpGet("")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(allUsers);
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser([FromBody] JsonNode Body)
        {
            try
            {
                if (Body == null)
                {
                    return BadRequest("Body is required");
                }
                if (Body["Name"] == null || Body["Email"] == null || Body["Phone"] == null)
                {
                    return BadRequest("Name, Email and Phone are required");
                }

                User newUser = new User(allUsers.Count + 1, Body["Name"].ToString(), Body["Email"].ToString(), Body["Phone"].ToString(), Body["Address"]?.ToString(), Body["Company"]?.ToString(), Body["Notes"]?.ToString());

                allUsers.Add(newUser);
                return Ok(newUser);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

        }

        [HttpPost("addUserToContact")]
        public async Task<IActionResult> addUserToContact([FromBody] JsonNode Body)
        {
            try
            {
                if (Body == null)
                {
                    return BadRequest("Body is required");
                }

                if (Body["UserId"] == null && Body["Contact"] == null)
                {
                    return BadRequest("UserId and Contact is required");
                }

                if (Body["Contact"]["Name"] == null || Body["Contact"]["Email"] == null || Body["Contact"]["Phone"] == null)
                {
                    return BadRequest("Name, Email and Phone are required for Contact");
                }

                int userId = Int32.Parse(Body["UserId"].ToString());
                User user = allUsers.Find(x => x.Id == userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }
                User contact = new User(user.Contacts.Count + 1, Body["Contact"]["Name"].ToString(), Body["Contact"]["Email"].ToString(), Body["Contact"]["Phone"].ToString(), Body["Contact"]["Address"]?.ToString(), Body["Contact"]["Company"]?.ToString(), Body["Contact"]["Notes"]?.ToString());

                user.Contacts.Add(contact);
                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("getMyUser/{id}")]
        public async Task<IActionResult> GetMyUser(int id)
        {
            try
            {
                User user = allUsers.Find(x => x.Id == id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpGet("getUserContacts/{id}")]
        public async Task<IActionResult> getUserContacts(int id)
        {
            try
            {
                User user = allUsers.Find(x => x.Id == id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(user.Contacts);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpDelete("deleteContact/{id}/{contactId}")]
        public async Task<IActionResult> deleteContact(int id, int contactId)
        {
            try
            {
                User user = allUsers.Find(x => x.Id == id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                User contact = user.Contacts.Find(x => x.Id == contactId);
                if (contact == null)
                {
                    return NotFound("Contact not found");
                }

                user.Contacts.Remove(contact);
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

    }
}