public class HomeController : Controller
{
    [Authorize]
    public IActionResult About()
    {
        ViewData["Message"] = "Your application description page.";

        return View();
    }
}
