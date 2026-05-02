using Microsoft.AspNetCore.Mvc;
using ApartmentBrokerage.Api.Models;
using ApartmentBrokerage.Api.Services;

namespace ApartmentBrokerage.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExecController : ControllerBase
    {
        private readonly SqlExecService _sql;

        public ExecController(SqlExecService sql)
        {
            _sql = sql;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ExecRequest req)
        {
            try
            {
                var result = await _sql.ExecAsync(req);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}