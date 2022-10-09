public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    //This sets up middleware which is needed for homecontroller.cs and logout.cs

    app.UseAuthentication();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
