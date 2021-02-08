using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio2021.Controllers
{
    public class ArtController : Controller
    {
        private readonly ILogger<ArtController> _logger;

        public ArtController(ILogger<ArtController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
