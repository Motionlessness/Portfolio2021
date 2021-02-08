using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio2021.Controllers
{
    public class ContactController : Controller
    {
        private readonly ILogger<ContactController> _logger;

        public ContactController(ILogger<ContactController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Leads()
        {
            return View();
        }
        public IActionResult Sales()
        {
            return View();
        }
        public IActionResult JavaP()
        {
            return View();
        }
        public IActionResult JavaC()
        {
            return View();
        }
        public IActionResult Android()
        {
            return View();
        }
    }
}
