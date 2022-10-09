var secret = configuration.GetValue<string>("Secret");
var key = Encoding.ASCII.GetBytes(secret);
SecurityToken validatedToken;
TokenValidationParameters validationParameters = new TokenValidationParameters();

validationParameters.ValidateLifetime = true;
validationParameters.IssuerSigningKey = new SymmetricSecurityKey(key);

ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);

principal.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Name)?.UserName; 
