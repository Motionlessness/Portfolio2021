using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio2021.Controllers
{
    public class MinigamesController : Controller
    {
        private readonly ILogger<MinigamesController> _logger;

        public MinigamesController(ILogger<MinigamesController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Minigame1()
        {
            return View();
        }
        public IActionResult Minigame2()
        {
            return View();
        }

    }
}
