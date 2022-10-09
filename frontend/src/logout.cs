public async Task Logout()
{
    await HttpContext.SignOutAsync(
    CookieAuthenticationDefaults.AuthenticationScheme);

    return RedirectToAction(nameof(HomeController.Index), "Home");
}
