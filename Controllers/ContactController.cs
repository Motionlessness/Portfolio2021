using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Portfolio2021.Models;
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

        [HttpGet]
        public IActionResult Leads()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Leads(Email email)
        {
            email.Submit().Wait();
            return View();
        }

        [HttpGet]
        public IActionResult Sales()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Sales(Email email)
        {
            email.Submit().Wait();
            return View();
        }

        [HttpGet]
        public IActionResult JavaP()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Javap(Email email)
        {
            email.Submit().Wait();
            return View();
        }

        [HttpGet]
        public IActionResult JavaC()
        {
            return View();
        }
        [HttpPost]
        public IActionResult JavaC(Email email)
        {
            email.Submit().Wait();
            return View();
        }

        [HttpGet]
        public IActionResult Android()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Android(Email email)
        {
            email.Submit().Wait();
            return View();
        }
    }
}
