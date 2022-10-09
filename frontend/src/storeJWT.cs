var tokenHandler = new JwtSecurityTokenHandler();
var secret = configuration.GetValue<string>("Secret");
var key = Encoding.ASCII.GetBytes(secret);
//This stuff here might be redundant with the stuff andrew has done? Not 100% sure. Regardless shouldn't be too hard to line up.
var tokenDescriptor = new SecurityTokenDescriptor
{
    Subject = new ClaimsIdentity(new Claim[]
    {
         new Claim(ClaimTypes.Name, user.UserName),
         new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
    }),
         Expires = DateTime.UtcNow.AddDays(1),
         SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
 };

 var token = tokenHandler.CreateToken(tokenDescriptor);

 var cookieOptions = new CookieOptions
 {
      // Set the secure flag
      Secure = false,

      // Http only is more complex but safer, may do later.
      HttpOnly = false,
 };

 //// Add the cookie to the response cookie collection
 Response.Cookies.Append("auth-cookie", token.ToString(), cookieOptions);