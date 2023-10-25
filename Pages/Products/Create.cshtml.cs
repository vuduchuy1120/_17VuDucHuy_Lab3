using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using _17VuDucHuy_Lab3.Models;
using Microsoft.AspNetCore.SignalR;

namespace _17VuDucHuy_Lab3.Pages.Products
{
    public class CreateModel : PageModel
    {
        private readonly IHubContext<SignalrServer> _signalRHub;
        private readonly Lab3Context _context;

        public CreateModel(Lab3Context context, IHubContext<SignalrServer> signarlHub)
        {
            _context = context;
            _signalRHub = signarlHub;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Product Product { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.Product == null || Product == null)
            {
                return Page();
            }

            _context.Product.Add(Product);
            await _context.SaveChangesAsync();
            await _signalRHub.Clients.All.SendAsync("LoadProducts");
            return RedirectToPage("./Index");
        }
    }
}
