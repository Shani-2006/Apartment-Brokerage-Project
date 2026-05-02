namespace ApartmentBrokerage.Api.Models
{
    public class ExecRequest
    {
        public string ProcedureName { get; set; } = "";
        public Dictionary<string, object>? Parameters { get; set; }
    }
}