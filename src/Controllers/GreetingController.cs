using Microsoft.AspNetCore.Mvc;

namespace HogwartsHouses.Controllers
{
    [ApiController, Route("/")]
    public class GreetingController : ControllerBase
    {
        [HttpGet("{name?}")]
        public string Greeting(string name = "Witches and Wizards")
        {
            return $"Welcome to Hogwarts, {name}";
        }
    }
}
