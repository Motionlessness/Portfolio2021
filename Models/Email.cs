using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Portfolio2021.Models
{
    public class Email
    {
        public async Task Submit()
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("13wilc13@gmail.com", Name + " " + FromAddress);
            var subject = RequestType;
            var to = new EmailAddress("13wilc13@gmail.com", "William Crouch");
            var plainTextContent = PhoneNumber + " " + Description;
            var htmlContent = PhoneNumber + " " + Description;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg).ConfigureAwait(false);
        }
        public string Name { get; set; }
        public string RequestType { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string FromAddress { get; set; }
    }
}
